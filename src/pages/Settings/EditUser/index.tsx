import Icon from '@/components/Base/Icon';
import { UserContext } from '@/contexts/UserContext';
import { Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

const EditUser = () => {
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
        General
      </Text>
      <Text fontWeight={400} mt={'4px'} color={'Gray.$700'}>
        Update your photo and your information.
      </Text>

      <Center w={'100%'} my={'40px'}>
        <Center w={'80px'} h={'80px'} borderRadius={'50%'} background={'Blue.$200'}>
          <Icon name={'user'} size={32} />
        </Center>
      </Center>

      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" defaultValue={user?.name} {...register('name', { required: true })} />
          <FormErrorMessage>{errors.name && errors.name.type === 'required' && 'Name is required'}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} style={{ marginTop: '16px' }}>
          <FormLabel htmlFor="name">Email</FormLabel>
          <Input id="name" defaultValue={user?.email} {...register('email', { required: true })} />
          <FormErrorMessage>{errors.email && errors.email.type === 'required' && 'Email is required'}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="blue" type="submit" w={'100%'} mt={'40px'}>
          Save updates
        </Button>
      </form>
    </VStack>
  );
};

export default EditUser;
