import Icon from '@/components/Base/Icon';
import Loader from '@/components/Base/Loader';
import Menu from '@/components/Menu';
import UserService from '@/services/user';
import { IUser } from '@/types';
import { Center, HStack, Text, VStack, useTheme } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import UserForm from './Form';
import { SubmitHandler } from 'react-hook-form';
import { UserContext } from '@/contexts/UserContext';
import AuthService from '@/services/auth';
import { toast } from 'react-toastify';

const Users = () => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
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
      setUsers({ isLoading: true, data: [] });
      await UserService.removeUser(userId);
      refreshUsers();
    } catch (err) {
      toast.error('An error as ocurred on delete of user');
    }
  };

  const handleSubmitUser: SubmitHandler<IUser> = async (user) => {
    try {
      setUsers({ isLoading: true, data: [] });
      if ('id' in user) {
        await UserService.updateUser(user.id, user);
      } else {
        await AuthService.signup(user);
      }
    } catch (err) {
      toast.error('An error as ocurred on management of user');
    }

    setCurrentUser(undefined);
    refreshUsers();
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
        <Center minW={'400px'} h={'400px'}>
          <Loader />
        </Center>
      ) : (
        <VStack w={'100%'} flex={1} alignItems={'flex-start'}>
          {users.data.map((currentUser) => (
            <HStack
              justifyContent={'space-between'}
              borderBottom={'1px solid'}
              borderColor={'Gray.$400'}
              key={currentUser.id}
              py={'12px'}
              px={'16px'}
              w={'100%'}
            >
              <HStack>
                <Center w={'40px'} h={'40px'} borderRadius={'50%'} background={'Blue.$200'}>
                  <Icon name={'user'} />
                </Center>

                <Text>{currentUser.name}</Text>
              </HStack>

              {currentUser.id !== user?.id && <Menu items={menuOptions} currentItem={currentUser} />}
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
