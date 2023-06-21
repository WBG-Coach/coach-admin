import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ITeacher } from "@/types";

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
    <Flex
      flexDirection="column"
      alignItems="center"
      w="full"
      maxH={"calc(100vh - 110px)"}
      overflow={"scroll"}
    >
      {teachers.map((teacher, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          p="4"
          my="2"
          w="full"
        >
          <Flex justifyContent="space-between">
            <Text fontSize="xl">{teacher?.name}</Text>
            <Box>
              <IconButton
                icon={<EditIcon />}
                aria-label="Editar"
                size="sm"
                mr="2"
                onClick={() => handleEdit(teacher)}
              />
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Deletar"
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(teacher)}
              />
            </Box>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default TeacherList;
