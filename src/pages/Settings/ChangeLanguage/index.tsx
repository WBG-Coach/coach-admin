import { useUserContext } from '@/contexts/UserContext';
import { HStack, Radio, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

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
