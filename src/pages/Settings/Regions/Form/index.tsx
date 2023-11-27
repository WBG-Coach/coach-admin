import React, { useEffect } from 'react';
import { Props } from './types';
import { Controller, useForm } from 'react-hook-form';
import {
  Input,
  Button,
  Drawer,
  FormLabel,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const RegionForm: React.FC<Props> = ({ defaultValues, handleSubmitForm, handleClose }) => {
  const { t } = useTranslation();
  const {
    reset,
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <Drawer isOpen={!!defaultValues} placement="right" onClose={handleClose} size="md">
      <DrawerOverlay />
      <DrawerContent roundedLeft={14}>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <DrawerCloseButton mt={2} color="Primary.$200" />

          <DrawerHeader>
            {defaultValues && 'id' in defaultValues ? t('settings.tabs.region.edit') : t('settings.tabs.region.new')}
          </DrawerHeader>

          <DrawerBody>
            <FormLabel htmlFor="name">{t('settings.tabs.region.form.name')}</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Input id="name" {...field} value={field.value} isInvalid={!!fieldState.error} />
              )}
            />
          </DrawerBody>

          <DrawerFooter mt="auto">
            <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
              {t('common.save')}
            </Button>
            <Button variant="outline" mr={'auto'} onClick={handleClose} isLoading={isLoading}>
              {t('common.cancel')}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default RegionForm;
