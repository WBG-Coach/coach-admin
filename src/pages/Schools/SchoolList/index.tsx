import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ISchool } from "@/types";
import Table from "@/components/Table";

type Props = {
  schools: ISchool[];
  handleEdit: (school: ISchool) => void;
  handleDelete: (school: ISchool) => void;
};

const SchoolList: React.FC<Props> = ({ schools, handleDelete, handleEdit }) => {
  return (
    <Table
      data={schools}
      columns={[
        {
          renderColumn: (item: ISchool) => item.name,
          title: "Name",
        },
      ]}
    />
  );
};

export default SchoolList;
