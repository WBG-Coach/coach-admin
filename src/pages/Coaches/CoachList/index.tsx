import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ICoach } from "@/types";

type Props = {
  coachs: ICoach[];
  handleEdit: (coach: ICoach) => void;
  handleDelete: (coach: ICoach) => void;
};

const CoachList: React.FC<Props> = ({ coachs, handleDelete, handleEdit }) => {
  return (
    <Flex flexDirection="column" alignItems="center" w="full">
      {coachs.map((coach, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          p="4"
          my="2"
          w="full"
        >
          <Flex justifyContent="space-between">
            <Text fontSize="xl">{coach?.name}</Text>
            <Box>
              <IconButton
                icon={<EditIcon />}
                aria-label="Editar"
                size="sm"
                mr="2"
                onClick={() => handleEdit(coach)}
              />
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Deletar"
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(coach)}
              />
            </Box>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default CoachList;
