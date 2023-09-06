import { Text, VStack } from '@chakra-ui/react';

type Props = {
  value: number | string;
  label: string;
};

export const CardValue: React.FC<Props> = ({ label, value }) => {
  return (
    <VStack flex={1} alignItems="center" p="16px" bg="#F2F4F7" borderRadius="16px" gap="0px">
      <Text mb="4px" fontSize="40px" fontWeight={600}>
        {value}
      </Text>
      <Text mt={0} textAlign="center" color="#111417" fontSize="14px">
        {label}
      </Text>
    </VStack>
  );
};
