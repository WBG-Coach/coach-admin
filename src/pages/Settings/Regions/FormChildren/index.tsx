import Icon from '@/components/Base/Icon';
import { IRegion } from '@/types';
import { Button, Divider, HStack, IconButton, Input, Text, VStack, useTheme } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

type Props = {
  level: number;
  children: IRegion[];

  handleUpdate: (children: IRegion[]) => void;
};

const RegionFormChildren: React.FC<Props> = ({ level, children, handleUpdate }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const addChild = () => {
    handleUpdate([...children, { name: '', level }]);
  };

  const handleUpdateChildren = (childrenToUpdate: IRegion[], indexToUpdate: number) => {
    handleUpdate(
      children.map((region, regionIndex) =>
        regionIndex === indexToUpdate ? { ...region, children: childrenToUpdate } : region,
      ),
    );
  };

  const handleDeleteChild = (indexToDelete: number) => {
    handleUpdate(children.filter((_, index) => index !== indexToDelete));
  };

  const handleUpdateName = (name: string, indexToUpdate: number) => {
    handleUpdate(children.map((item, index) => (index === indexToUpdate ? { ...item, name, level } : item)));
  };

  return (
    <VStack mt="-2px" w="full" borderBottomRadius={12} border="2px solid #ddd" alignItems="flex-start" mb="24px">
      <Text mt="12px" fontWeight={600} ml="24px">
        {t(`settings.tabs.region.${level}.title`)}
      </Text>

      {children.map((region, index) => (
        <VStack gap={0} mx={`24px`} w={`calc(100% - 48px)`} mt="12px" position="relative">
          <Input
            bg="#f5f5f5"
            onChange={(e) => handleUpdateName(e.target.value, index)}
            value={region?.name}
            borderBottomRadius={level < parseInt(import.meta.env.VITE_MAX_REGION_LEVEL, 10) ? 0 : 8}
            border="2px solid #ddd"
            placeholder={t(`settings.tabs.region.${level}.placeholder`) || ''}
          />

          <IconButton
            position="absolute"
            right="4px"
            top="4px"
            size="sm"
            aria-label="delete"
            icon={<Icon name="trash-alt" color="#fff" />}
            bg="#e53935"
            transition="all 300ms"
            onClick={() => handleDeleteChild(index)}
            _hover={{ bg: '#ef9a9a' }}
          />

          {level < parseInt(import.meta.env.VITE_MAX_REGION_LEVEL, 10) && (
            <RegionFormChildren
              level={level + 1}
              children={region.children || []}
              handleUpdate={(items) => handleUpdateChildren(items, index)}
            />
          )}
        </VStack>
      ))}

      <HStack px={'16px'} mb="12px" cursor={'pointer'} onClick={() => addChild()}>
        <Icon name={'plus'} color={theme.colors.Primary['$200']} />
        <Text color={'Primary.$200'}>{t(`settings.tabs.region.${level}.new`)}</Text>
      </HStack>
    </VStack>
  );
};

export default RegionFormChildren;
