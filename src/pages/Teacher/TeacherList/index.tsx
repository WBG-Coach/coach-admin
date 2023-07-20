import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ITeacher } from "@/types";
import Table from "@/components/Table";

type Props = {
  teachers: ITeacher[];
  handleEdit: (teacher: ITeacher) => void;
  handleDelete: (teacher: ITeacher) => void;
};

const TeacherList: React.FC<Props> = ({
  teachers,
  handleDelete,
  handleEdit,
}) => {
  return (
    <Table
      data={teachers}
      columns={[
        {
          renderColumn: (item: ITeacher) => item.name,
          title: "Name",
        },
      ]}
    />
  );
};

export default TeacherList;
