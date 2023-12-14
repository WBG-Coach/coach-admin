import RegionService from '@/services/region';
import { IRegion } from '@/types';
import { Flex, Select, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  direction: 'row' | 'column';
  parentId?: string;
  level: number;
  onSelect: (regionId?: string) => void;
};

const RegionSelect: React.FC<Props> = ({ level, direction, parentId, onSelect }) => {
  const { t } = useTranslation();
  const [hasChildren, setHasChildren] = useState(false);
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [selectedId, setSelectedId] = useState<IRegion['id']>();

  useEffect(() => {
    setRegions([]);
    setHasChildren(false);
    setSelectedId(undefined);
    onSelect(undefined);
    RegionService.getRegionsByParentId(parentId).then(setRegions);
  }, [parentId]);

  useEffect(() => {
    if (selectedId) {
      const region = regions.find((item) => item.id === selectedId);
      const canSubmitValue = !region?.children || region.children.length === 0;

      if (canSubmitValue) {
        onSelect(selectedId);
      } else {
        setHasChildren(true);
      }
    }
  }, [selectedId]);

  return (
    <Flex
      display="flex"
      flexDir={direction}
      mt={direction === 'column' ? '12px' : 0}
      ml={direction === 'row' ? '12px' : 0}
      w="full"
    >
      <VStack w="full" alignItems="flex-start">
        <Text fontWeight={600}>{t(`settings.tabs.region.${level}.select`)}</Text>
        <Select placeholder="..." onChange={(e) => setSelectedId(e.target.value)} value={selectedId}>
          {regions?.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </Select>
      </VStack>
      {hasChildren && (
        <RegionSelect level={level + 1} parentId={selectedId} onSelect={onSelect} direction={direction} />
      )}
    </Flex>
  );
};

export default RegionSelect;
