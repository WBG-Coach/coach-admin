import Icon from '@/components/Base/Icon';
import Loader from '@/components/Base/Loader';
import { UserContext } from '@/contexts/UserContext';
import { IUser } from '@/types';
import { Button, Center, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const ChangePassword = () => {
  const { handleUpdateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup
    .object({
      currentPassword: yup.string().required('This field is required'),
      password: yup.string().required('This field is required'),
      confirmPassword: yup
        .string()
        .required('This field is required')
        .oneOf([yup.ref('password')], 'Password not equals'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSubmitForm = async (user: Partial<IUser & { repassword: string; currentPassword: string }>) => {
    setIsLoading(true);
    await handleUpdateUser({ password: user.password, currentPassword: user.currentPassword } as any);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Center minW={'350px'} h={'200px'}>
          <Loader />
        </Center>
      ) : (
        <VStack alignItems={'flex-start'} width={'454px'} pl={'24px'}>
          <Text fontWeight={600} fontSize={'20px'}>
            Change password
          </Text>
          <Text fontWeight={400} mt={'4px'} color={'Gray.$700'}>
            Update your access password.
          </Text>

          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '40px' }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Current password</FormLabel>
              <Input
                isInvalid={!!errors.currentPassword}
                type="password"
                {...register('currentPassword', { required: true })}
              />
              <Text mt={'8px'} color={'red'}>
                {errors.currentPassword?.message}
              </Text>
            </FormControl>

            <FormControl style={{ marginTop: '16px' }}>
              <FormLabel htmlFor="name">New password</FormLabel>
              <Input
                isInvalid={!!errors.password}
                id="password"
                type="password"
                {...register('password', { required: true })}
              />
              <Text mt={'8px'} color={'red'}>
                {errors.password?.message}
              </Text>
            </FormControl>

            <FormControl style={{ marginTop: '16px' }}>
              <FormLabel htmlFor="repassword">Confirm password</FormLabel>
              <Input
                isInvalid={!!errors.confirmPassword}
                id="password"
                type="password"
                {...register('confirmPassword', { required: true })}
              />
              <Text mt={'8px'} color={'red'}>
                {errors.confirmPassword?.message}
              </Text>
            </FormControl>

            <Button colorScheme="blue" type="submit" w={'100%'} mt={'40px'}>
              Change password
            </Button>
          </form>
        </VStack>
      )}
    </>
  );
};

export default ChangePassword;
