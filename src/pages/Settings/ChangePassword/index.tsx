import Icon from '@/components/Base/Icon';
import Loader from '@/components/Base/Loader';
import { UserContext } from '@/contexts/UserContext';
import { IUser } from '@/types';
import { Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

const ChangePassword = () => {
  const { user, handleUpdateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = (user: Partial<IUser>) => {
    setIsLoading(true);
    handleUpdateUser(user);
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
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Current password</FormLabel>
              <Input {...register('name', { required: true })} />
              <FormErrorMessage>
                {errors.name && errors.name.type === 'required' && 'Name is required'}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email} style={{ marginTop: '16px' }}>
              <FormLabel htmlFor="name">New password</FormLabel>
              <Input id="password" {...register('password', { required: true })} />
              <FormErrorMessage>
                {errors.email && errors.email.type === 'required' && 'Email is required'}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email} style={{ marginTop: '16px' }}>
              <FormLabel htmlFor="name">Confirm password</FormLabel>
              <Input id="password" {...register('re-password', { required: true })} />
              <FormErrorMessage>
                {errors.email && errors.email.type === 'required' && 'Email is required'}
              </FormErrorMessage>
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
