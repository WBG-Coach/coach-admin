import { Box, Flex, Text } from "@chakra-ui/react";
import { ISync } from "@/types";

type Props = {
  syncs: ISync[];
  handleEdit: (sync: ISync) => void;
  handleDelete: (sync: ISync) => void;
};

const SyncList: React.FC<Props> = ({ syncs, handleDelete, handleEdit }) => {
  return (
    <Flex flexDirection="column" alignItems="center" w="full">
      {syncs.map((sync, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          p="4"
          my="2"
          w="full"
        >
          <Flex justifyContent="space-between">
            <Text fontSize="xl">{sync?.apiLevel}</Text>
            <Text fontSize="xl">{sync?.deviceId}</Text>
            <Text fontSize="xl">{sync?.lastPulledAt.getDay()}</Text>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default SyncList;
