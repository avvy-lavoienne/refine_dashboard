import React, { memo, useMemo } from 'react';
import { User } from '@/graphql/schema.types';
import { Button, Card, ConfigProvider, Dropdown, MenuProps, Space, Tag, Tooltip } from 'antd';
import { Text } from '@/components/text';
import { ClockCircleOutlined, DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons';
import { TextIcon } from '@/components/text-icon';
import dayjs from 'dayjs';
import { getDateColor } from '@/utilities';
import CustomAvatar from '@/components/custom-avatar';
import { useDelete, useNavigation } from '@refinedev/core';

type ProjectCardProps = {
  id: string;
  title: string;
  updatedAt: string;
  dueDate?: string;
  users?: {
    id: string;
    name: string;
    avatarUrl?: User['avatarUrl'];
  }[];
};

const ProjectCard = ({ id, title, dueDate, users }: ProjectCardProps) => {
  const { edit } = useNavigation();
  const { mutate } = useDelete();

  const dropdownItems = useMemo(() => {
    const items: MenuProps['items'] = [
      {
        label: 'View card',
        key: '1',
        icon: <EyeOutlined />,
        onClick: () => edit('tasks', id, 'replace'),
      },
      {
        danger: true,
        label: 'Delete card',
        key: '2',
        icon: <DeleteOutlined />,
        onClick: () => {
          mutate({ resource: 'tasks', id });
        },
      },
    ];
    return items;
  }, [id, edit, mutate]);

  const dueDateOptions = useMemo(() => {
    if (!dueDate) return null;
    const date = dayjs(dueDate);
    const color = getDateColor({ date: dueDate });
    console.log('dueDate:', dueDate, 'color:', color); // Debugging
    return {
      color: color as string,
      text: date.format('MMM DD'),
    };
  }, [dueDate]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: '#595959', // Ganti dengan nilai konkret untuk debugging
          },
          Card: {
            headerBg: 'transparent',
          },
        },
      }}
    >
      <Card
        size="small"
        title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
        onClick={() => edit('tasks', id, 'replace')}
        extra={
          <Dropdown
            trigger={['click']}
            menu={{ items: dropdownItems,
              onPointerDown: (e) => e.stopPropagation(),
              onClick: (e) => {
                e.domEvent.stopPropagation();
              }
             }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type="text"
              shape="circle"
              icon={<MoreOutlined style={{ transform: 'rotate(90deg)' }} />}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Dropdown clicked'); // Debugging
              }}
            />
          </Dropdown>
        }
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <TextIcon style={{ marginRight: '4px' }} />
          {dueDateOptions && (
            <Tag
              icon={<ClockCircleOutlined style={{ fontSize: '12px' }} />}
              style={{
                padding: '0 4px',
                marginInlineEnd: '0',
                backgroundColor: dueDateOptions.color === 'default' ? 'transparent' : 'unset',
              }}
              color={dueDateOptions.color}
              bordered={dueDateOptions.color !== 'default'}
            >
              {dueDateOptions.text}
            </Tag>
          )}
          {!!users?.length && (
            <Space
              size={4}
              wrap
              direction="horizontal"
              align="center"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginLeft: 'auto',
                marginRight: 0,
              }}
            >
              {users.map((user) => (
                <Tooltip key={user.id} title={user.name}>
                  <CustomAvatar name={user.name} src={user.avatarUrl ?? undefined} />
                </Tooltip>
              ))}
            </Space>
          )}
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default ProjectCard;

export const ProjectCardMemo = memo(ProjectCard, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.title === next.title &&
    prev.dueDate === next.dueDate &&
    prev.users?.length === next.users?.length // Perbaikan
  );
});