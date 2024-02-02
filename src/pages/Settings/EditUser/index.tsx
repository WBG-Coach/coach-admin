import Icon from '@/components/Base/Icon';
import Loader from '@/components/Base/Loader';
import { UserContext } from '@/contexts/UserContext';
import { IUser } from '@/types';
import { Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const EditUser = () => {
  const { t } = useTranslation();
  const { user, handleUpdateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = async (user: Partial<IUser>) => {
    setIsLoading(true);
    await handleUpdateUser(user);
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
            {t('settings.tabs.user.title')}
          </Text>
          <Text fontWeight={400} mt={'4px'} color={'Gray.$700'}>
            {t('settings.tabs.user.description')}
          </Text>

          <Center w={'100%'} my={'40px'}>
            <Center w={'80px'} h={'80px'} borderRadius={'50%'} background={'Blue.$200'}>
              <Icon name={'user'} size={32} />
            </Center>
          </Center>

          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">{t('settings.tabs.user.name')}</FormLabel>
              <Input id="name" defaultValue={user?.name} {...register('name', { required: true })} />
              <FormErrorMessage>
                {errors.name && errors.name.type === 'required' && 'Name is required'}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email} style={{ marginTop: '16px' }}>
              <FormLabel htmlFor="name">{t('settings.tabs.user.email')}</FormLabel>
              <Input id="name" defaultValue={user?.email} {...register('email', { required: true })} />
              <FormErrorMessage>
                {errors.email && errors.email.type === 'required' && 'Email is required'}
              </FormErrorMessage>
            </FormControl>

            <Button colorScheme="blue" type="submit" w={'100%'} mt={'40px'}>
              {t('settings.tabs.user.save')}
            </Button>
          </form>
        </VStack>
      )}
    </>
  );
};

export default EditUser;
