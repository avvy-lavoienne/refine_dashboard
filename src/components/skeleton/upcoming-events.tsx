import { Badge, List, Skeleton } from "antd";

const UpcomingEventsSkeleton = () => {
  return (
    <List.Item>
      <List.Item.Meta
        // Use a small circular skeleton avatar to mimic the badge.
        avatar={
          <Skeleton.Avatar
            active
            shape="circle"
            size="small"
            style={{ backgroundColor: "transparent" }}
          />
        }
        // Mimic the date text placeholder (small text).
        title={
          <Skeleton.Input
            active
            style={{
              width: "80px", // Adjust width to roughly match the date text
              height: "14px", // Similar to the font-size of Text size="xs"
              borderRadius: "2px",
            }}
          />
        }
        // Mimic the event title placeholder.
        description={
          <Skeleton.Input
            active
            style={{
              width: "200px", // Adjust width according to expected event title length
              height: "16px", // A bit larger than the title
              borderRadius: "2px",
              marginTop: "4px", // A little spacing to simulate the layout
            }}
          />
        }
      />
    </List.Item>
  );
};

export default UpcomingEventsSkeleton;
