import { CreateButton, DeleteButton, EditButton, FilterDropdown, getDefaultFilter, List, useTable } from '@refinedev/antd';
import { HttpError, useGo } from '@refinedev/core';
import { Input, Space, Table } from 'antd';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { SearchOutlined } from '@ant-design/icons';
import CustomAvatar from '@/components/custom-avatar';
import { Text } from '@/components/text';
import { Company } from '@/graphql/schema.types';
import { currencyNumber } from '@/utilities';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { CompaniesListQuery } from '@/graphql/types';


export const CompanyList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters, setFilters  } = useTable<
  GetFieldsFromList<CompaniesListQuery>,
  HttpError,
  GetFieldsFromList<CompaniesListQuery>
  >({
    resource: 'companies',
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: 'createdAt',
          order: 'desc',
        },
      ],
    },
    filters: {
      initial: [
        {
          field: 'name',
          operator: 'contains',
          value: '',
        },
      ],
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });

  let defaultFilteredValue = getDefaultFilter('name', filters);
  if (defaultFilteredValue === null || defaultFilteredValue === undefined) {
    defaultFilteredValue = '';
  }

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() =>
              go({
                to: {
                  resource: 'companies',
                  action: 'create',
                },
                options: {
                  keepQuery: true,
                },
                type: 'replace',
              })
            }
          />
        )}
      >
        <Table {...tableProps} pagination={{ ...tableProps.pagination }} rowKey="id">
          <Table.Column<Company>
            dataIndex="name"
            title="Company Title"
            defaultFilteredValue={defaultFilteredValue}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input
                  placeholder="Search Company"
                  value={filters?.[0]?.value || ''}
                  onChange={(e) => {
                    const newFilters = [...filters];
                    newFilters[0].value = e.target?.value !== null ? e.target?.value : undefined;
                    setFilters(newFilters);
                  }}
                />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
                <Text style={{ whiteSpace: 'nowrap' }}>{record.name}</Text>
              </Space>
            )}
          />
          <Table.Column<Company>
            dataIndex="totalRevenue"
            title="Open deals amount"
            render={(value, company) => (
              <Text>{currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}</Text>
            )}
          />
          <Table.Column<Company>
            dataIndex="id"
            title="Action"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
