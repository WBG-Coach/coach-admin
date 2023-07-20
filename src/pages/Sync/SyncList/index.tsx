import { Box, Flex, Text } from "@chakra-ui/react";
import { ISync } from "@/types";
import Table from "@/components/Table";

type Props = {
  syncs: ISync[];
  handleEdit: (sync: ISync) => void;
  handleDelete: (sync: ISync) => void;
};

const SyncList: React.FC<Props> = ({ syncs, handleDelete, handleEdit }) => {
  return (
    <Table
      data={syncs}
      columns={[
        {
          renderColumn: (item: ISync) => item.apiLevel,
          title: "Android Version",
        },
        {
          renderColumn: (item: ISync) => item.model,
          title: "Model",
        },
        {
          renderColumn: (item: ISync) => item.deviceId,
          title: "DeviceID",
        },
        {
          renderColumn: (item: ISync) =>
            new Date(item.lastPulledAt).toDateString() +
            " " +
            new Date(item.lastPulledAt).toLocaleTimeString(),
          title: "Last update",
          width: "280px",
        },
      ]}
    />
  );
};

export default SyncList;
