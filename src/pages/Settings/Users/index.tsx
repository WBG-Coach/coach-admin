import { useCallback, useContext, useEffect, useState } from 'react';
import { Center, HStack, Text, VStack, useTheme } from '@chakra-ui/react';
import { UserContext } from '@/contexts/UserContext';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Loader from '@/components/Base/Loader';
import UserService from '@/services/user';
import AuthService from '@/services/auth';
import Icon from '@/components/Base/Icon';
import { toast } from 'react-toastify';
import Menu from '@/components/Menu';
import { IUser } from '@/types';
import UserForm from './Form';

const Users = () => {
  const theme = useTheme();
  const { t } = useTranslation();
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
        await AuthService.sighup(user);
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

      <VStack alignItems={'flex-start'} width={'454px'} pl={'24px'}>
        <Text fontWeight={600} fontSize={'20px'}>
          {t('settings.tabs.users.title')}
        </Text>
        {users.isLoading ? (
          <Center minW={'400px'} h={'400px'}>
            <Loader />
          </Center>
        ) : (
          <>
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

            <HStack
              px={'16px'}
              py={'12px'}
              cursor={'pointer'}
              onClick={() => setCurrentUser({ name: '', email: '', password: '', role: '' } as any)}
            >
              <Icon name={'plus'} color={theme.colors.Primary['$200']} />
              <Text color={'Primary.$200'}>{t('settings.tabs.users.new')}</Text>
            </HStack>
          </>
        )}
      </VStack>
    </>
  );
};

export default Users;
