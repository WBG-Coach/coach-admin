import RegionService from '@/services/region';
import { IRegion } from '@/types';
import { Flex, Select, Text, VStack } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  direction: 'row' | 'column';
  region?: IRegion;
  level: number;
  onSelect?: (regionId?: string) => void;
  onChangeEvent?: (e: ChangeEvent<HTMLSelectElement>) => void;
  isInvalid?: boolean;
  fixedItems?: IRegion[];
};

const RegionSelect: React.FC<Props> = ({
  level,
  region,
  direction,
  fixedItems,
  onSelect,
  onChangeEvent,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const [regions, setRegions] = useState<IRegion[]>(region?.children || []);
  const [selectedRegion, setSelectedRegion] = useState<IRegion>();

  const loadRegions = useCallback(async () => {
    if (regions.length === 0) {
      const data = await RegionService.getRegionsTree();
      setRegions(data);
    }
  }, [fixedItems]);

  useEffect(() => {
    if (!!region) {
      setRegions(region.children || []);
      setSelectedRegion(undefined);
    } else {
      loadRegions();
    }
  }, [fixedItems, loadRegions]);

  useEffect(() => {
    if (fixedItems && fixedItems[0]) {
      const newRegions = regions.filter((item) => item.id === fixedItems[0].id);
      if (selectedRegion !== newRegions[0]) {
        setRegions(newRegions);
        setSelectedRegion(newRegions[0]);
      }

      if (!fixedItems[1]) {
        setSelectedRegion(newRegions[0]);
        if (onSelect) onSelect(newRegions[0].id);
      }
    }
  }, [regions, fixedItems]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const region = regions.find((region) => region.id === e.target.value);

    if (region) {
      if (!!region.children?.length) {
        setSelectedRegion(region);
        if (onSelect) onSelect(region.id);
      } else if (onSelect) {
        onSelect(region.id);
      }
    } else {
      setSelectedRegion(undefined);
      if (onSelect) onSelect(undefined);
    }
    if (onChangeEvent) onChangeEvent(e);
  };

  return (
    <Flex
      display="flex"
      flexDir={direction}
      mt={direction === 'column' ? '12px' : 0}
      ml={direction === 'row' ? (level === 0 ? 0 : '12px') : 0}
      w="full"
    >
      <VStack w="full" alignItems="flex-start">
        <Text fontWeight={600}>{t(`settings.tabs.region.${level}.select`)}</Text>
        <Select
          placeholder="..."
          {...(!selectedRegion?.children?.length ? otherProps : {})}
          value={selectedRegion?.id}
          onChange={(e) => handleSelect(e)}
        >
          {regions?.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </Select>
      </VStack>
      {!!selectedRegion?.children?.length && (
        <RegionSelect
          {...otherProps}
          level={level + 1}
          fixedItems={fixedItems?.slice(1)}
          onChangeEvent={onChangeEvent}
          region={selectedRegion}
          onSelect={onSelect}
          direction={direction}
        />
      )}
    </Flex>
  );
};

export default RegionSelect;
