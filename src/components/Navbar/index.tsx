import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MenuItems } from './common';
import { MenuItem as CustomMenuItem } from './MenuItem';
import { CoachLogo } from '@/assets/images/logos';
import { UserContext, useUserContext } from '@/contexts/UserContext';
import UserCard from '../UserCard';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const LANG_OPTIONS = [
  { label: '🇺🇸 English (US)', value: 'en' },
  { label: '🇳🇵 Nepali', value: 'np' },
];

const Navbar: React.FC = () => {
  const { logout, user, updateLocalUser } = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const navbarWidth = useBreakpointValue({ base: 'full', md: '240px' });

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    if (user) updateLocalUser({ ...user, language });
  };

  const menu = (
    <>
      <Box mx={2}>
        <UserCard logout={logout} name={user?.name || ''} email={user?.email || ''} />
      </Box>
      <VStack w={'100%'} alignItems={'flex-start'} mt="16px !important">
        {MenuItems.map((item, index) =>
          item.subItems ? (
            <Stack key={index} w={'100%'}>
              <Text m="16px" mb="8px" fontSize="12px" color="#9AA2AC" fontWeight={700}>
                {t(`Navbar.${item.label}`)}
              </Text>
              {item.subItems.map(
                (subItem, sIndex) =>
                  (!subItem.role || user?.role === subItem.role) && (
                    <CustomMenuItem
                      key={index + sIndex}
                      icon={subItem.icon}
                      label={t(`Navbar.${subItem.label}`)}
                      route={subItem.route}
                      onClick={() => {
                        setOpen(false);
                        navigate(subItem.route);
                      }}
                    />
                  ),
              )}
            </Stack>
          ) : (
            <CustomMenuItem
              key={index}
              icon={item.icon}
              label={t(`Navbar.${item.label}`)}
              route={item.route}
              onClick={() => {
                setOpen(false);
                navigate(item.route);
              }}
            />
          ),
        )}
      </VStack>

      <Menu>
        <MenuButton
          w="calc(100% - 32px)"
          mx="16px"
          mt="auto"
          mb="16px"
          bg="white"
          shadow="md"
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {LANG_OPTIONS.filter((item) => item.value === i18n.language)[0].label}
        </MenuButton>
        <MenuList>
          {LANG_OPTIONS.map((item) => (
            <MenuItem
              minH="48px"
              key={item.value}
              value={item.value}
              onClick={() => changeLanguage(item.value)}
              isDisabled={i18n.language === item.value}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );

  return (
    <VStack
      minH={isMobile ? 'none' : '100vh'}
      w={navbarWidth}
      alignItems="center"
      borderRight={{ md: '1px solid #DCE0E5' }}
    >
      {isMobile ? (
        <VStack
          h={open ? '100vh' : '80px'}
          overflow="hidden"
          position="fixed"
          bg="#fff"
          top={0}
          right={0}
          left={0}
          zIndex={9999}
        >
          <HStack w="full" justifyContent="space-between">
            <HamburgerIcon w={8} h={8} mx="24px" onClick={() => setOpen(!open)} cursor="pointer" maxW="180px" />
            <Image mx="auto" src={CoachLogo} alt={'Logo do coach'} m="24px" mb="16px" h="40px" />
            <Box w="72px" />
          </HStack>
          {menu}
        </VStack>
      ) : (
        <>
          <Image src={CoachLogo} alt={'Logo do coach'} m="24px" mb="16px" maxW="180px" />
          {menu}
        </>
      )}
    </VStack>
  );
};

export default Navbar;
