import React, { useContext, useState } from 'react';
import Loader from '@/components/Base/Loader';
import { UserContext, useUserContext } from '@/contexts/UserContext';
import { IUser } from '@/types';
import { Button, Center, FormControl, FormLabel, HStack, Input, Radio, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import Icon from '@/components/Base/Icon';

const ChangeLanguage = () => {
  const { user, updateLocalUser } = useUserContext();
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    if (user) updateLocalUser({ ...user, language });
  };

  return (
    <VStack alignItems={'flex-start'} width={'454px'} pl={'24px'}>
      <Text fontWeight={600} fontSize={'20px'}>
        {t('settings.tabs.language.title')}
      </Text>

      <VStack w={'100%'} flex={1} alignItems={'flex-start'}>
        <HStack
          justifyContent={'space-between'}
          borderBottom={'1px solid'}
          borderColor={'Gray.$400'}
          py={'12px'}
          px={'16px'}
          w={'100%'}
          cursor="pointer"
          onClick={() => changeLanguage('en')}
        >
          <Text>{'🇺🇸 English (US)'}</Text>
          <Radio isChecked={i18n.language === 'en'} />
        </HStack>

        <HStack
          justifyContent={'space-between'}
          borderBottom={'1px solid'}
          borderColor={'Gray.$400'}
          py={'12px'}
          px={'16px'}
          w={'100%'}
          cursor="pointer"
          onClick={() => changeLanguage('np')}
        >
          <Text>{'🇳🇵 Nepali'}</Text>
          <Radio isChecked={i18n.language === 'np'} />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default ChangeLanguage;
