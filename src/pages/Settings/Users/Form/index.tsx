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
  Input,
  Select,
  Spinner,
} from '@chakra-ui/react';
import { ROLES, userRoles } from '@/common/user';
import { REGIONS } from '@/common/constants';
import SchoolService from '@/services/school';
import Loader from '@/components/Base/Loader';
import SelectDistrict from '@/components/SelectDistrict';

const UserForm: React.FC<Props> = ({ defaultValues, handleSubmitForm, handleClose }) => {
  const [role, setRole] = useState<string>();
  const [region, setRegion] = useState<string>();
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

          <DrawerHeader>{defaultValues && 'id' in defaultValues ? 'Update user' : 'New user'}</DrawerHeader>

          <DrawerBody>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Input id="name" {...field} value={field.value} isInvalid={!!fieldState.error} />
              )}
            />

            <FormLabel htmlFor="name" style={{ marginTop: '8px' }}>
              Email
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
                  Password
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
              Role
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

            {role && role !== ROLES.admin && (
              <>
                <FormLabel htmlFor="region" style={{ marginTop: '8px' }}>
                  Region
                </FormLabel>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="region_id"
                  render={({ field, fieldState, formState }) => (
                    <Select
                      id={'region'}
                      {...field}
                      isInvalid={!!fieldState.error}
                      onChange={(e) => {
                        field.onChange(e);
                        setRegion(e.target.value);
                      }}
                    >
                      <option value={undefined}>{''}</option>
                      {REGIONS.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              </>
            )}

            {role && role === ROLES['district-analyst'] && (
              <>
                <FormLabel htmlFor="region" style={{ marginTop: '8px' }}>
                  District
                </FormLabel>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="district"
                  render={({ field, fieldState }) => (
                    <SelectDistrict role={role} region={region} {...field} isInvalid={!!fieldState.error} />
                  )}
                />
              </>
            )}
          </DrawerBody>

          <DrawerFooter mt="auto">
            <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
              Save
            </Button>
            <Button variant="outline" mr={'auto'} onClick={handleClose} isLoading={isLoading}>
              Cancel
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default UserForm;
