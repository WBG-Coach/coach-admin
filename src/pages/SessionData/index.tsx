import Loader from '@/components/Base/Loader';
import SessionService from '@/services/session';
import { IRegion, ISession } from '@/types';
import { Box, Center, FormLabel, HStack, Select, Switch, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SessionView from './SessionView';
import SessionList, { ISessionData } from './SessionList';
import HeaderPage from '@/components/HeaderPage';
import { useTranslation } from 'react-i18next';
import handleDownloadJSON from '@/common/download';
import { useUserContext } from '@/contexts/UserContext';
import RegionService from '@/services/region';

const SessionDataPage: React.FC = () => {
  const { t } = useTranslation();
  const { userRegionsPath } = useUserContext();
  const [sessionData, setSessionData] = useState<ISessionData[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [sessionToView, setSessionToView] = useState<ISession>();
  const [period, setPeriod] = useState<string>();
  const [region, setRegion] = useState<string | undefined>(
    userRegionsPath.length > 0 ? userRegionsPath[0].id : undefined,
  );
  const [schoolId, setSchoolId] = useState<string>();
  const [showOnlyWithValues, setShowOnlyWithValues] = useState(true);
  const [regions, setRegions] = useState<IRegion[]>([]);

  useEffect(() => {
    if (userRegionsPath.length > 0) {
      setRegions([userRegionsPath[0]]);
    } else {
      RegionService.getRegionsTree().then(setRegions);
    }
  }, [userRegionsPath]);

  useEffect(() => {
    loadSessions(period, region, schoolId, showOnlyWithValues);
  }, [region, schoolId, showOnlyWithValues]);

  const loadSessions = async (period?: string, region?: string, schoolId?: string, showOnlyWithValues?: boolean) => {
    if (!isLoadingList) {
      setIsLoadingList(true);
      const data = await SessionService.getSessionData(period, region, schoolId, showOnlyWithValues);
      setSessionData(data);
      setIsLoadingList(false);
    }
  };

  return (
    <Box p={4} minH="100vh" flex={1}>
      <HeaderPage
        subtitle={t('Navbar.data')}
        title={t('Navbar.session-data')}
        onClickDownload={() => handleDownloadJSON(sessionData, t('Navbar.sessions').toLowerCase().replace(' ', '-'))}
      />

      <SessionView session={sessionToView} onClose={() => setSessionToView(undefined)} />
      {isLoadingList ? (
        <Center minW={'350px'} h={'200px'}>
          <Loader />
        </Center>
      ) : (
        <SessionList
          sessions={sessionData}
          filters={
            <HStack w="100%" minH={'40px'} mb="0" bg="#F2F4F7" p="16px">
              <VStack alignItems="start">
                <FormLabel htmlFor="period">{t('session-data.filters.period')}</FormLabel>
                <Select id="period" value={period} onChange={(e) => setPeriod(e.target.value)} bg="#fff">
                  <option value={''}>{t('common.all-time')}</option>
                  <option value={'7 days'}>{t('common.last-7-days')}</option>
                  <option value={'30 days'}>{t('common.last-30-days')}</option>
                  <option value={'60 days'}>{t('common.last-60-days')}</option>
                  <option value={'90 days'}>{t('common.last-90-days')}</option>
                </Select>
              </VStack>
              <VStack alignItems="start">
                <FormLabel htmlFor="region">{t('session-data.filters.region')}</FormLabel>
                <Select id="region" value={region} onChange={(e) => setRegion(e.target.value)} bg="#fff">
                  <option value={''}>{t('common.all-regions')}</option>
                  {regions.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Select>
              </VStack>
              <VStack alignItems="start">
                <FormLabel htmlFor="schoolId">{t('session-data.filters.school')}</FormLabel>
                <Select id="schoolId" value={schoolId} onChange={(e) => setSchoolId(e.target.value)} bg="#fff">
                  <option value={''}>{t('common.all-schools')}</option>
                  {sessionData.map((item) => (
                    <option value={item.id}>{item['School Name']}</option>
                  ))}
                </Select>
              </VStack>

              <VStack alignItems="start" ml="12px">
                <FormLabel htmlFor="onlyWithValues" mb="0" cursor="pointer">
                  {t('session-data.filters.with-no-data')}
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

export default SessionDataPage;
