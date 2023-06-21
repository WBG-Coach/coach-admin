import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ISchool } from "@/types";

type Props = {
  schools: ISchool[];
  handleEdit: (school: ISchool) => void;
  handleDelete: (school: ISchool) => void;
};

const SchoolList: React.FC<Props> = ({ schools, handleDelete, handleEdit }) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      w="full"
      maxH={"calc(100vh - 110px)"}
      overflow={"scroll"}
    >
      {schools.map((school, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          p="4"
          my="2"
          w="full"
        >
          <Flex justifyContent="space-between">
            <Text fontSize="xl">{school?.name}</Text>
            {/* <Box>
              <IconButton
                icon={<EditIcon />}
                aria-label="Editar"
                size="sm"
                mr="2"
                onClick={() => handleEdit(school)}
              />
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Deletar"
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(school)}
              />
            </Box> */}
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default SchoolList;
