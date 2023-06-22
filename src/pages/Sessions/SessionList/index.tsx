import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ISession } from "@/types";

type Props = {
  sessions: ISession[];
  handleEdit: (session: ISession) => void;
  handleDelete: (session: ISession) => void;
};

const SessionList: React.FC<Props> = ({
  sessions,
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
      <Box borderBottomWidth="1px" p="4" my="2" w="full">
        <Flex justifyContent="space-between">
          <Text flex={2} fontWeight="bold">
            School
          </Text>
          <Text flex={2} fontWeight="bold">
            Coach
          </Text>
          <Text flex={2} fontWeight="bold">
            Teacher
          </Text>
          <Text flex={1} fontWeight="bold">
            Subject
          </Text>
          <Text flex={1} textAlign="right" fontWeight="bold">
            Actions
          </Text>
        </Flex>
      </Box>
      {sessions.map((session, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          p="4"
          my="2"
          w="full"
        >
          <Flex justifyContent="space-between">
            <Text flex={2}>{session?.school.name}</Text>
            <Text flex={2}>{session?.coach.name}</Text>
            <Text flex={2}>{session?.teacher.name}</Text>
            <Text flex={1}>{session?.subject}</Text>
            <Box flex={1} display="flex" justifyContent="flex-end">
              {/* <IconButton
                ml="auto"
                icon={<EditIcon />}
                aria-label="Editar"
                size="sm"
                mr="2"
                onClick={() => {}}
              />
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Deletar"
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(session)}
              /> */}
            </Box>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default SessionList;
