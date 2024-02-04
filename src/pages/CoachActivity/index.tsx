import Loader from '@/components/Base/Loader';
import SessionService from '@/services/session';
import { IRegion, ISession } from '@/types';
import { Box, Center, FormLabel, HStack, Select, Switch, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SessionList, { ISessionOverTime } from './SessionList';
import HeaderPage from '@/components/HeaderPage';
import { useTranslation } from 'react-i18next';
import handleDownloadJSON from '@/common/download';
import { useUserContext } from '@/contexts/UserContext';
import RegionService from '@/services/region';

const CoachActivity: React.FC = () => {
  const { t } = useTranslation();
  const { userRegionsPath } = useUserContext();
  const [sessionOverTime, setSessionOverTime] = useState<ISessionOverTime[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [showOnlyWithValues, setShowOnlyWithValues] = useState(true);
  const [schoolId, setSchoolId] = useState<string>();
  const [region, setRegion] = useState<string | undefined>(
    userRegionsPath.length > 0 ? userRegionsPath[0].id : undefined,
  );
  const [regions, setRegions] = useState<IRegion[]>([]);

  useEffect(() => {
    if (userRegionsPath.length > 0) {
      setRegions([userRegionsPath[0]]);
    } else {
      RegionService.getRegionsTree().then(setRegions);
    }
  }, [userRegionsPath]);

  useEffect(() => {
    loadSessions(region, schoolId, showOnlyWithValues);
  }, [region, schoolId, showOnlyWithValues]);

  const loadSessions = async (region?: string, schoolId?: string, showOnlyWithValues?: boolean) => {
    if (!isLoadingList) {
      setIsLoadingList(true);
      const data = await SessionService.getSessionOverTime(region, schoolId, showOnlyWithValues);
      setSessionOverTime(data);
      setIsLoadingList(false);
    }
  };

  return (
    <Box p={4} minH="100vh" flex={1}>
      <HeaderPage
        subtitle={t('Navbar.data')}
        title={t('Navbar.coaches-over-time')}
        onClickDownload={() =>
          handleDownloadJSON(sessionOverTime, t('Navbar.sessions').toLowerCase().replace(' ', '-'))
        }
      />

      {isLoadingList ? (
        <Center minW={'350px'} h={'200px'}>
          <Loader />
        </Center>
      ) : (
        <SessionList
          sessions={sessionOverTime}
          filters={
            <HStack w="100%" minH={'40px'} mb="0" bg="#F2F4F7" p="16px">
              <VStack alignItems="start">
                <FormLabel htmlFor="region">{t('coach-over-time.filters.region')}</FormLabel>
                <Select id="region" value={region} onChange={(e) => setRegion(e.target.value)} bg="#fff">
                  <option value={''}>{t('common.all-regions')}</option>
                  {regions.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </VStack>

              <VStack alignItems="start" ml="12px">
                <FormLabel htmlFor="schoolId">{t('coach-over-time.filters.school')}</FormLabel>
                <Select id="schoolId" value={schoolId} onChange={(e) => setSchoolId(e.target.value)} bg="#fff">
                  <option value={''}>{t('common.all-schools')}</option>
                  {sessionOverTime.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item['School Name']}
                    </option>
                  ))}
                </Select>
              </VStack>

              <VStack alignItems="start" ml="12px">
                <FormLabel htmlFor="onlyWithValues" mb="0" cursor="pointer">
                  {t('coach-over-time.filters.with-no-data')}
                </FormLabel>
                <Switch
                  id="onlyWithValues"
                  isChecked={!showOnlyWithValues}
                  onChange={(e) => setShowOnlyWithValues(!Boolean(e.target.checked))}
                />
              </VStack>
            </HStack>
          }
        />
      )}
    </Box>
  );
};

export default CoachActivity;
