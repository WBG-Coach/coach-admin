import Icon from '@/components/Base/Icon';
import Loader from '@/components/Base/Loader';
import Menu from '@/components/Menu';
import UserService from '@/services/user';
import { IUser } from '@/types';
import { Center, HStack, Text, VStack, useTheme } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import UserForm from './Form';
import { SubmitHandler } from 'react-hook-form';

const Users = () => {
  const theme = useTheme();
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [users, setUsers] = useState({
    isLoading: true,
    data: [] as IUser[],
  });

  const refreshUsers = useCallback(() => {
    UserService.getUsers().then((users) => setUsers({ isLoading: false, data: users }));
  }, []);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  const handleRemoveUser = async (userId: IUser['id']) => {
    try {
      //do logic to remove user
    } catch (err) {
      //do logic to show toast
    }
  };

  const handleSubmitUser: SubmitHandler<IUser> = async (user) => {
    try {
      if ('id' in user) {
        // do logic to update in API
        return;
      }

      //do logic to create in API
    } catch (err) {
      //do logic to show toast
    }
  };

  const menuOptions = [
    {
      label: 'Edit user',
      handleClick: (user: IUser) => setCurrentUser(user),
    },
    {
      label: 'Remove user',
      color: 'Red.$400',
      handleClick: (user: IUser) => handleRemoveUser(user.id),
    },
  ];

  return (
    <>
      <UserForm
        handleClose={() => setCurrentUser(undefined)}
        defaultValues={currentUser as IUser}
        handleSubmitForm={handleSubmitUser}
      />

      {users.isLoading ? (
        <Center minW={'350px'} h={'200px'}>
          <Loader />
        </Center>
      ) : (
        <VStack w={'100%'} flex={1} alignItems={'flex-start'}>
          {users.data.map((user) => (
            <HStack
              justifyContent={'space-between'}
              borderBottom={'1px solid'}
              borderColor={'Gray.$400'}
              key={user.id}
              py={'12px'}
              px={'16px'}
              w={'100%'}
            >
              <HStack>
                <Center w={'40px'} h={'40px'} borderRadius={'50%'} background={'Blue.$200'}>
                  <Icon name={'user'} />
                </Center>

                <Text>{user.name}</Text>
              </HStack>

              <Menu items={menuOptions} currentItem={user} />
            </HStack>
          ))}

          <HStack px={'16px'} py={'12px'} cursor={'pointer'} onClick={() => setCurrentUser({} as any)}>
            <Icon name={'plus'} color={theme.colors.Primary['$200']} />
            <Text color={'Primary.$200'}>Criar usuário</Text>
          </HStack>
        </VStack>
      )}
    </>
  );
};

export default Users;
