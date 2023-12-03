import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Text,
  Input,
  VStack,
  HStack,
  Button,
  Drawer,
  Spinner,
  useTheme,
  FormLabel,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import RegionService from '@/services/region';
import Icon from '@/components/Base/Icon';
import { IRegion } from '@/types';
import { Props } from './types';
import RegionFormChildren from '../FormChildren';

const RegionForm: React.FC<Props> = ({ isOpen, regionId, handleSubmitForm, handleClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState<IRegion>();

  useEffect(() => {
    if (isOpen && regionId) {
      RegionService.getRegion(regionId).then((data) => {
        setRegion(data);
        setLoading(false);
      });
    } else {
      setRegion({ name: '', children: [] });
      setLoading(false);
    }
  }, [isOpen, regionId]);

  const handleUpdateChildren = (children: IRegion[]) => {
    if (region) {
      setRegion({ ...region, children });
    }
  };

  const handleUpdateRegionName = (name: string) => {
    setRegion({ ...region, name });
  };

  const onSubmit = () => {
    if (region) {
      handleSubmitForm({ ...region, level: 0 });
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleClose} size="md">
      <DrawerOverlay />
      <DrawerContent roundedLeft={14}>
        <DrawerCloseButton mt={2} color="Primary.$200" />

        <DrawerHeader>{regionId ? t('settings.tabs.region.edit') : t('settings.tabs.region.new')}</DrawerHeader>

        {loading ? (
          <DrawerBody>
            <Spinner />
          </DrawerBody>
        ) : (
          <DrawerBody gap={0}>
            <Input
              placeholder={t('settings.tabs.region.placeholder') || ''}
              borderBottomRadius={0}
              bg="#f5f5f5"
              value={region?.name}
              onChange={(e) => handleUpdateRegionName(e.target.value)}
              border="2px solid #ddd"
            />

            <RegionFormChildren level={1} children={region?.children || []} handleUpdate={handleUpdateChildren} />
          </DrawerBody>
        )}

        <DrawerFooter mt="auto">
          <Button colorScheme="blue" mr={3} onClick={onSubmit}>
            {t('common.save')}
          </Button>
          <Button variant="outline" mr={'auto'} onClick={handleClose}>
            {t('common.cancel')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RegionForm;
