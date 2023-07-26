import React from "react";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import Icon from "../Base/Icon";

type Props = {
  title: string;
  subtitle: string;
  newButtonValue?: string | null;
  onClickNew?: () => void;
};

const HeaderPage: React.FC<Props> = ({
  title,
  subtitle,
  newButtonValue,
  onClickNew,
}) => {
  return (
    <HStack flex={1}>
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
      {newButtonValue && onClickNew && (
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={onClickNew}
          gap="8px"
        >
          <Icon name="plus" color="#fff" size={24} /> {newButtonValue}
        </Button>
      )}
    </HStack>
  );
};

export default HeaderPage;
