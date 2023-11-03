import Loader from '@/components/Base/Loader';
import SessionService from '@/services/session';
import { ISession } from '@/types';
import { Box, Center, FormLabel, HStack, Select, Switch, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SessionView from './SessionView';
import SessionList, { ISessionData } from './SessionList';
import HeaderPage from '@/components/HeaderPage';
import { useTranslation } from 'react-i18next';
import handleDownloadJSON from '@/common/download';
import { REGIONS } from '@/common/constants';

const SessionDataPage: React.FC = () => {
  const { t } = useTranslation();
  const [sessionData, setSessionData] = useState<ISessionData[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [sessionToView, setSessionToView] = useState<ISession>();
  const [period, setPeriod] = useState<string>();
  const [region, setRegion] = useState<string>();
  const [schoolId, setSchoolId] = useState<string>();
  const [showOnlyWithValues, setShowOnlyWithValues] = useState(true);

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
                <FormLabel htmlFor="period">Period</FormLabel>
                <Select id="period" value={period} onChange={(e) => setPeriod(e.target.value)} bg="#fff">
                  <option value={''}>All time</option>
                  <option value={'7 days'}>Last 7 days</option>
                  <option value={'30 days'}>Last 30 days</option>
                  <option value={'60 days'}>Last 60 days</option>
                  <option value={'90 days'}>Last 90 days</option>
                </Select>
              </VStack>
              <VStack alignItems="start">
                <FormLabel htmlFor="region">Region</FormLabel>
                <Select id="region" value={region} onChange={(e) => setRegion(e.target.value)} bg="#fff">
                  <option value={''}>All regions</option>
                  {REGIONS.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Select>
              </VStack>
              <VStack alignItems="start">
                <FormLabel htmlFor="schoolId">School</FormLabel>
                <Select id="schoolId" value={schoolId} onChange={(e) => setSchoolId(e.target.value)} bg="#fff">
                  <option value={''}>All schools</option>
                  {sessionData.map((item) => (
                    <option value={item.id}>{item['School Name']}</option>
                  ))}
                </Select>
              </VStack>

              <VStack alignItems="start" ml="12px">
                <FormLabel htmlFor="onlyWithValues" mb="0" cursor="pointer">
                  Include schools with no data
                </FormLabel>
                <Switch
                  id="onlyWithValues"
                  isChecked={!showOnlyWithValues}
                  onChange={(e) => setShowOnlyWithValues(Boolean(e.target.checked))}
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
