import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditUser from './EditUser';
import ChangePassword from './ChangePassword';
import Users from './Users';
import Icon from '@/components/Base/Icon';
import HeaderPage from '@/components/HeaderPage';
import Logs from './Logs';
import { UserContext } from '@/contexts/UserContext';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  console.log(user);
  const [currentOption, setCurrentOption] = useState(0);
  const options = [
    {
      label: t('settings.tabs.user.title'),
      icon: 'user-circle',
      component: <EditUser />,
    },
    {
      label: t('settings.tabs.change-password.title'),
      icon: 'lock',
      component: <ChangePassword />,
    },
    ...(user?.role === 'admin'
      ? [
          {
            label: t('settings.tabs.users.title'),
            icon: 'user',
            component: <Users />,
          },
          {
            label: t('settings.tabs.logs.title'),
            icon: 'receipt-alt',
            component: <Logs />,
          },
        ]
      : []),
  ];

  return (
    <Box p={4} minH="100vh" flex={1}>
      <HeaderPage title={'Settings'} subtitle={''} />

      <HStack width={'100%'} alignItems={'flex-start'}>
        <VStack flexDirection={'column'} minWidth={'266px'} pr={'8px'} borderRight={'1px solid #E3E6E9'}>
          {options.map((opt, index) => {
            const isActive = index === currentOption;

            return (
              <HStack
                cursor={'pointer'}
                py={'14px'}
                px={'10px'}
                width={'100%'}
                key={index}
                borderRadius={'4px'}
                background={isActive ? '#EBF1FF' : 'transparent'}
                onClick={() => setCurrentOption(index)}
              >
                <Icon name={opt.icon} size={20} color={isActive ? '#3373CC' : '#576375'} />
                <Text ml={'14px'} fontWeight={500} fontSize={'16px'} color={isActive ? '#3373CC' : '#576375'}>
                  {opt.label}
                </Text>
              </HStack>
            );
          })}
        </VStack>
        <HStack width={'100%'}>{options[currentOption].component}</HStack>
      </HStack>
    </Box>
  );
};

export default SettingsPage;
