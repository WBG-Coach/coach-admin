import Icon from '@/components/Base/Icon';
import { UserContext } from '@/contexts/UserContext';
import { Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

const ChangePassword = () => {
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateUser = () => {};

  return (
    <VStack alignItems={'flex-start'} width={'454px'} pl={'24px'}>
      <Text fontWeight={600} fontSize={'20px'}>
        Change password
      </Text>
      <Text fontWeight={400} mt={'4px'} color={'Gray.$700'}>
        Update your access password.
      </Text>

      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '40px' }}
      >
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Current password</FormLabel>
          <Input id="name" defaultValue={user?.name} {...register('name', { required: true })} />
          <FormErrorMessage>{errors.name && errors.name.type === 'required' && 'Name is required'}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} style={{ marginTop: '16px' }}>
          <FormLabel htmlFor="name">New password</FormLabel>
          <Input id="name" defaultValue={user?.email} {...register('email', { required: true })} />
          <FormErrorMessage>{errors.email && errors.email.type === 'required' && 'Email is required'}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} style={{ marginTop: '16px' }}>
          <FormLabel htmlFor="name">Confirm password</FormLabel>
          <Input id="name" defaultValue={user?.email} {...register('email', { required: true })} />
          <FormErrorMessage>{errors.email && errors.email.type === 'required' && 'Email is required'}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="blue" type="submit" w={'100%'} mt={'40px'}>
          Change password
        </Button>
      </form>
    </VStack>
  );
};

export default ChangePassword;
