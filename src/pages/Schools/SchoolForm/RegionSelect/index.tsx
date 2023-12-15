import RegionService from '@/services/region';
import { IRegion } from '@/types';
import { Flex, Select, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  direction: 'row' | 'column';
  region?: IRegion;
  level: number;
  onSelect: (regionId?: string) => void;
};

const RegionSelect: React.FC<Props> = ({ level, direction, region, onSelect }) => {
  const { t } = useTranslation();
  const [regions, setRegions] = useState<IRegion[]>(region?.children || []);
  const [selectedRegion, setSelectedRegion] = useState<IRegion>();

  useEffect(() => {
    if (!region) {
      RegionService.getRegionsTree().then(setRegions);
    }
  }, [region]);

  const handleSelect = (regionId?: string) => {
    const region = regions.find((region) => region.id === regionId);

    if (region) {
      if (!!region.children?.length) {
        setSelectedRegion(region);
      } else {
        onSelect(region.id);
      }
    } else {
      setSelectedRegion(undefined);
    }
  };

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
        <Select placeholder="..." onChange={(e) => handleSelect(e.target.value)} value={selectedRegion?.id}>
          {regions?.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </Select>
      </VStack>
      {!!selectedRegion?.children?.length && (
        <RegionSelect level={level + 1} region={selectedRegion} onSelect={onSelect} direction={direction} />
      )}
    </Flex>
  );
};

export default RegionSelect;
