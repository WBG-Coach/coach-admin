import React, { useEffect } from 'react';
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
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { userRoles } from '@/common/user';

const UserForm: React.FC<Props> = ({ defaultValues, handleSubmitForm, handleClose }) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isLoading },
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

            <FormErrorMessage>{errors.name && errors.name.type === 'required' && 'Name is required'}</FormErrorMessage>

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

            <FormErrorMessage>
              {errors.email && errors.email.type === 'required' && 'Email is required'}
            </FormErrorMessage>

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
                    <Input id="password" {...field} value={field.value} isInvalid={!!fieldState.error} />
                  )}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.type === 'required' && 'Password is required'}
                </FormErrorMessage>
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
                <Select id={'role'} {...field} isInvalid={!!fieldState.error}>
                  {userRoles.map((user, index) => (
                    <option key={index} value={user.value}>
                      {user.label}
                    </option>
                  ))}
                </Select>
              )}
            />

            <FormErrorMessage>{errors.role && errors.role.type === 'required' && 'Role is required'}</FormErrorMessage>
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
