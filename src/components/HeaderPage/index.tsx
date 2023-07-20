import React from "react";
import { Text, VStack } from "@chakra-ui/react";

type Props = {
  title: string;
  subtitle: string;
};

const HeaderPage: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <VStack flex={1} alignItems="start" mt="60px" mb="24px">
      <Text
        fontFamily="Inter"
        color="#576375"
        fontSize="14px"
        fontWeight={400}
        lineHeight={1}
      >
        {subtitle}
      </Text>
      <Text
        fontFamily="Inter"
        color="#111417"
        fontSize="32px"
        fontWeight={600}
        lineHeight={1}
      >
        {title}
      </Text>
    </VStack>
  );
};

export default HeaderPage;
