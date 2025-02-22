import { Space, Tag } from "antd";
import { User } from "@/graphql/schema.types";
import CustomAvatar from "../custom-avatar";

// Asumsikan tipe ini dihasilkan dari GraphQL
type Maybe<T> = T | null | undefined;

type Props = {
  user: User;
};

// display a user's avatar and name in a tag
export const UserTag = ({ user }: Props) => {
  return (
    <Tag
      key={user.id}
      style={{
        padding: 2,
        paddingRight: 8,
        borderRadius: 24,
        lineHeight: "unset",
        marginRight: "unset",
      }}
    >
      <Space size={4}>
        <CustomAvatar
          src={user.avatarUrl ?? undefined} // Mengubah null menjadi undefined
          name={user.name}
          style={{ display: "inline-flex" }}
        />
        {user.name}
      </Space>
    </Tag>
  );
};