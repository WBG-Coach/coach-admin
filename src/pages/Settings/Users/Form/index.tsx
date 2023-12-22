import React, { useEffect, useState } from 'react';
import { Props } from './types';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ROLES, userRoles } from '@/common/user';
import RegionSelect from '@/pages/Schools/SchoolForm/RegionSelect';
import { useTranslation } from 'react-i18next';
import { formatRegionPath } from '@/common/helper';
import Icon from '@/components/Base/Icon';

const UserForm: React.FC<Props> = ({ defaultValues, handleSubmitForm, handleClose }) => {
  const { t } = useTranslation();
  const [showSelectRegion, setShowSelectRegion] = useState(!defaultValues);
  const [role, setRole] = useState<string>();
  const {
    reset,
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
    setShowSelectRegion(!defaultValues);
    setRole(defaultValues?.role);
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

          <DrawerHeader>{defaultValues && 'id' in defaultValues ? 'Update user' : 'New user'}</DrawerHeader>

          <DrawerBody>
            <FormLabel htmlFor="name">{t('settings.tabs.users.form.name')}</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Input id="name" {...field} value={field.value} isInvalid={!!fieldState.error} />
              )}
            />

            <FormLabel htmlFor="name" style={{ marginTop: '8px' }}>
              {t('settings.tabs.users.form.email')}
            </FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Input id="email" {...field} value={field.value} isInvalid={!!fieldState.error} />
              )}
            />

            {defaultValues && !('id' in defaultValues) && (
              <>
                <FormLabel htmlFor="name" style={{ marginTop: '8px' }}>
                  {t('settings.tabs.users.form.password')}
                </FormLabel>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Input
                      id="password"
                      type="password"
                      {...field}
                      value={field.value}
                      isInvalid={!!fieldState.error}
                    />
                  )}
                />
              </>
            )}

            <FormLabel htmlFor="name" style={{ marginTop: '8px' }}>
              {t('settings.tabs.users.form.role')}
            </FormLabel>

            <Controller
              rules={{ required: true }}
              control={control}
              name="role"
              render={({ field, fieldState }) => (
                <Select
                  id={'role'}
                  {...field}
                  isInvalid={!!fieldState.error}
                  onChange={(e) => {
                    field.onChange(e);
                    setRole(e.target.value);
                  }}
                >
                  <option value={undefined}>{''}</option>
                  {userRoles.map((user, index) => (
                    <option key={index} value={user.value}>
                      {user.label}
                    </option>
                  ))}
                </Select>
              )}
            />

            <Controller
              rules={{ required: role && role === ROLES.analyst }}
              control={control}
              name="region_id"
              render={({ field, fieldState }) =>
                role && role === ROLES.analyst ? (
                  showSelectRegion ? (
                    <RegionSelect
                      {...field}
                      level={0}
                      direction="column"
                      isInvalid={fieldState.invalid}
                      onChangeEvent={(e) => {
                        field.onChange(e);
                      }}
                    />
                  ) : (
                    <HStack mt="20px" justifyContent="center" alignItems="center">
                      <VStack w="full" alignItems="flex-start">
                        <Text fontWeight={600}>{t('school.form.region')}</Text>
                        <Text>{formatRegionPath(defaultValues.region)}</Text>
                      </VStack>
                      <IconButton
                        my="auto"
                        icon={<Icon name="pen" />}
                        aria-label="Edit"
                        onClick={() => setShowSelectRegion(true)}
                      />
                    </HStack>
                  )
                ) : (
                  <></>
                )
              }
            />
          </DrawerBody>

          <DrawerFooter mt="auto">
            <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
              {t('settings.tabs.users.form.save')}
            </Button>
            <Button variant="outline" mr={'auto'} onClick={handleClose} isLoading={isLoading}>
              {t('settings.tabs.users.form.cancel')}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default UserForm;
