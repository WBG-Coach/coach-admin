import React from 'react';
import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import Icon from '../Base/Icon';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  subtitle: string;
  newButtonValue?: string | null;
  onClickNew?: () => void;
  onClickDownload?: () => void;
  onClickImport?: () => void;
};

const HeaderPage: React.FC<Props> = ({
  title,
  subtitle,
  newButtonValue,
  onClickImport,
  onClickNew,
  onClickDownload,
}) => {
  const { t } = useTranslation();

  return (
    <HStack flex={1}>
      <VStack flex={1} alignItems="start" mt="60px" mb="24px">
        <Text fontFamily="Noto Sans" color="#576375" fontSize="14px" fontWeight={400} lineHeight={1}>
          {subtitle}
        </Text>
        <Text fontFamily="Noto Sans" color="#111417" fontSize="32px" fontWeight={600} lineHeight={1}>
          {title}
        </Text>
      </VStack>
      <HStack>
        {onClickImport && (
          <Button variant="solid" colorScheme="blue" onClick={onClickImport} gap="8px">
            {t('common.import')}
          </Button>
        )}

        {onClickDownload && (
          <Button variant="solid" colorScheme="blue" onClick={onClickDownload} gap="8px">
            {t('common.download')}
          </Button>
        )}

        {newButtonValue && onClickNew && (
          <Button variant="solid" colorScheme="blue" onClick={onClickNew} gap="8px">
            <Icon name="plus" color="#fff" size={24} /> {newButtonValue}
          </Button>
        )}
      </HStack>
    </HStack>
  );
};

export default HeaderPage;
