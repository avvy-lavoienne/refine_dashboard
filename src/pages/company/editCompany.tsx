import CustomAvatar from '@/components/custom-avatar';
import SelectOptionWithAvatar from '@/components/select-option-with-avatar';
import { businessTypeOptions, companySizeOptions, industryOptions } from '@/constants';
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutations';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import { UsersSelectQuery } from '@/graphql/types';
import { getNameInitials } from '@/utilities';
import { Edit, useForm, useSelect } from '@refinedev/antd';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { CompanyContactsTable } from './contacts-table';

const EditCompany = () => {
  const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  const {avatarUrl, name} = queryResult?.data?.data || {}

    const { selectProps, queryResult: queryResultUsers} = 
    useSelect<GetFieldsFromList<UsersSelectQuery>>({
      resource: 'users',
      optionLabel: 'name',
      pagination: {
        mode: 'off'
      },
      meta: {
        gqlQuery : USERS_SELECT_QUERY
      }
    })
    

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps} layout="vertical">
                <CustomAvatar 
                shape="square" 
                src={avatarUrl} 
                name={getNameInitials(name || '')} 
                style={{
                    width: 96,
                    height: 96,
                    marginBottom: '24px'
                }}
                />
                
                <Form.Item
                    name="name"
                    label="Company Name"
                    rules={[{ required: true, message: 'Company name is required' }]}
                >
                <Input placeholder="Enter Company Name" />
              </Form.Item>

              <Form.Item
                label="Sales Owner"
                name="salesOwnerId"
                initialValue={formProps?.initialValues?.salesOwner?.id}
                >
                <Select 
              placeholder="Please Select Sales Owner"
              {...selectProps}
              options={
                queryResultUsers.data?.data.map((user) => ({
                  value: user.id,
                  label: (
                    <SelectOptionWithAvatar
                    name={user.name}
                    avatarUrl={user.avatarUrl ?? undefined}
                    />
                  )
                })) ?? []
              }
            />
              </Form.Item>
              <Form.Item
                label="Company Size"
              >
                <Select options={companySizeOptions} />
              </Form.Item>
              <Form.Item
                label="Annual Revenue"
              >
                <InputNumber 
                  autoFocus
                  addonBefore="$"
                  min={0}
                  placeholder='0,00'
                />
              </Form.Item>
              <Form.Item label="Industry">
                <Select options={industryOptions} />
              </Form.Item>
              <Form.Item label="Business Type">
                <Select options={businessTypeOptions} />
              </Form.Item>
              <Form.Item label="Country">
                <Input placeholder='Enter Country' name="country" />
              </Form.Item>
              <Form.Item label="Website">
                <Input placeholder='Enter Website' name="website" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
        <Col xs={24} sm={24} xl={12}>
        <CompanyContactsTable />
        </Col>
      </Row>
    </div>
  );
};

export default EditCompany;
//3:37.04
