import { Box, HStack, Text, VStack } from '@chakra-ui/react';

type Props = {
  values: number[];
  labels: string[];
};
const MAX_VALUE = 5;

const BAD_VALUE = 3;
const GOOD_VALUE = 4;

export const HorizontalBar: React.FC<Props> = ({ labels, values }) => {
  const getColor = (value: number) => {
    if (value <= BAD_VALUE) return '#D96684';
    if (value <= GOOD_VALUE) return '#4C9AF7';
    return '#A2CF57';
  };

  const getTag = (value: number) => {
    if (value === 0) return <></>;
    if (value <= BAD_VALUE)
      return (
        <Text px="8px" py="4px" borderRadius="4px" bg="#FEEDEC" color="#9B1208" fontSize="14px">
          {'Needs improvement'}
        </Text>
      );
    if (value <= GOOD_VALUE)
      return (
        <Text px="8px" py="4px" borderRadius="4px" bg="#EBF1FF" color="#264673" fontSize="14px">
          {'Good'}
        </Text>
      );
    return (
      <Text px="8px" py="4px" borderRadius="4px" bg="#EFFBEF" color="#218225" fontSize="14px">
        {'Excelent'}
      </Text>
    );
  };

  return (
    <VStack flex={1} gap="2px">
      {labels.map((label, index) => {
        return (
          <HStack key={index} w="100%" my="0px" justifyContent="flex-start">
            <Text fontSize="14px" w="120px" textAlign="right">
              {label}
            </Text>
            <HStack ml="8px">
              <Box w={`${(values[index] * 100) / MAX_VALUE}px`} h="48px" bg={getColor(values[index])}></Box>
            </HStack>
            <Text fontWeight={600} fontSize="20px">
              {Number(values[index]).toFixed(1)}
            </Text>
            {getTag(values[index])}
          </HStack>
        );
      })}
    </VStack>
  );
};
