import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ICoach } from "@/types";
import Table from "@/components/Table";

type Props = {
  coachs: ICoach[];
  handleEdit: (coach: ICoach) => void;
  handleDelete: (coach: ICoach) => void;
};

const CoachList: React.FC<Props> = ({ coachs, handleDelete, handleEdit }) => {
  return (
    <Table
      data={coachs}
      columns={[
        {
          renderColumn: (item: ICoach) => item.name,
          title: "Name",
        },
      ]}
    />
  );
};

export default CoachList;
