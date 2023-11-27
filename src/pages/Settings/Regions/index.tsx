import { useCallback, useContext, useEffect, useState } from 'react';
import Icon from '@/components/Base/Icon';
import Loader from '@/components/Base/Loader';
import Menu from '@/components/Menu';
import { IRegion, IUser } from '@/types';
import { Center, HStack, Text, VStack, useTheme } from '@chakra-ui/react';
import RegionForm from './Form';
import { SubmitHandler } from 'react-hook-form';
import { UserContext } from '@/contexts/UserContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import RegionService from '@/services/region';

const Regions = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [currentRegion, setCurrentRegion] = useState<IRegion>();
  const [regions, setRegions] = useState({
    isLoading: true,
    data: [] as IRegion[],
  });

  const refreshRegions = useCallback(() => {
    RegionService.getRegions().then((regions) => setRegions({ isLoading: false, data: regions }));
  }, []);

  useEffect(() => {
    refreshRegions();
  }, [refreshRegions]);

  const handleSubmitRegion: SubmitHandler<IRegion> = async (region) => {
    try {
      setRegions({ isLoading: true, data: [] });
      if ('id' in region) {
        await RegionService.updateRegion(region.id, region);
      } else {
        await RegionService.saveRegion(region);
      }
    } catch (err) {
      toast.error('An error as ocurred on management of user');
    }

    setCurrentRegion(undefined);
    refreshRegions();
  };

  const menuOptions = [
    {
      label: t('settings.tabs.region.edit'),
      handleClick: (user: IUser) => setCurrentRegion(user),
    },
  ];

  return (
    <>
      {currentRegion && (
        <RegionForm
          handleClose={() => setCurrentRegion(undefined)}
          defaultValues={currentRegion as IUser}
          handleSubmitForm={handleSubmitRegion}
        />
      )}

      <VStack alignItems={'flex-start'} width={'454px'} pl={'24px'}>
        <Text fontWeight={600} fontSize={'20px'}>
          {t('settings.tabs.region.title')}
        </Text>

        {regions.isLoading ? (
          <Center minW={'400px'} h={'400px'}>
            <Loader />
          </Center>
        ) : (
          <>
            {regions.data.map((currentUser) => (
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
                  <VStack justifyContent="center" gap={0} alignItems="flex-start">
                    <Text>{currentUser.name}</Text>
                    <Text fontSize={'12px'}>
                      {t('settings.tabs.region.total_schools', { value: currentUser.schoolsCount })}
                    </Text>
                  </VStack>
                </HStack>

                {currentUser.id !== user?.id && <Menu items={menuOptions} currentItem={currentUser} />}
              </HStack>
            ))}

            <HStack px={'16px'} py={'12px'} cursor={'pointer'} onClick={() => setCurrentRegion({} as any)}>
              <Icon name={'plus'} color={theme.colors.Primary['$200']} />
              <Text color={'Primary.$200'}>{t('settings.tabs.region.new')}</Text>
            </HStack>
          </>
        )}
      </VStack>
    </>
  );
};

export default Regions;
