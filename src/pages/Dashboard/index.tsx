import { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, HStack, Select, Spinner, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { IDashboard, IRegion, ISchool, ITeachingPractices } from '@/types';
import DashboardService from '@/services/dashboard';
import Loader from '@/components/Base/Loader';
import { CardValue } from './components/CardValue';
import { SpeedometerGraph } from './components/SpeedometerGraph';
import { DoughnutGraph } from './components/DoughnutGraph';
import { BarGraph } from './components/BarGraph';
import { HorizontalBar } from './components/HorizontalBar';
import { useUserContext } from '@/contexts/UserContext';
import { ROLES } from '@/common/user';
import SelectDistrict from '@/components/SelectDistrict';
import { useTranslation } from 'react-i18next';
import RegionService from '@/services/region';

const DashboardPage: React.FC = () => {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState<IDashboard>();
  const [regions, setRegions] = useState<IRegion[]>();
  const [regionId, setRegionId] = useState(user?.region_id);
  const [district, setDistrict] = useState(user?.district);
  const [schoolName, setSchoolName] = useState<string>();
  const [schoolList, setSchoolList] = useState<ISchool[]>([]);
  const [selected, setSelected] = useState<ITeachingPractices>();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (!loading) {
      setLoading(true);

      if (!regions) {
        RegionService.getRegions().then(setRegions);
      }

      let schoolId: string | undefined;

      if (schoolName) {
        schoolId = schoolList.find((school) => school.name === schoolName)?.id;
      }

      DashboardService.getData(regionId, district, schoolId).then((data) => {
        const { schools, ...dash } = data;
        if (schools) {
          setSchoolList(schools);
        }
        setDashboard(dash);
        setSelected(dash?.teachingPractices[0]);
        setLoading(false);
      });
    }
  }, [regionId, district, schoolName]);

  const handleRegion = (regionId: string) => {
    setRegionId(regionId);
    setSchoolList([]);
    setSchoolName(undefined);
    setDistrict(undefined);
  };

  const handleDistrict = (newDistrict: string) => {
    setDistrict(newDistrict);
    setSchoolList([]);
    setSchoolName(undefined);
  };

  return (
    <VStack mx="auto" minH="100vh" maxW="1200px" position="relative" overflow="scroll" alignItems="flex-start" p="56px">
      <Flex flexDir={isMobile ? 'column' : 'row'} w="full">
        <VStack alignItems="start" mb="12px" mr="12px" minW={250}>
          {regions && (
            <>
              <Text fontWeight="600">{t('dashboard.filters.region')}</Text>
              {user?.role === ROLES.admin ? (
                <Select placeholder="..." onChange={(e) => handleRegion(e.target.value)} value={regionId}>
                  {regions?.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </Select>
              ) : (
                <Text>{regions?.find((region) => region.id === regionId)?.name}</Text>
              )}
            </>
          )}
        </VStack>

        <VStack alignItems="start" mb="12px" mr="12px" minW={250}>
          <Text fontWeight="600">{t('dashboard.filters.district')}</Text>
          {user?.role === ROLES.admin || user?.role === ROLES['region-analyst'] ? (
            <SelectDistrict
              role={user.role}
              region={regionId}
              onChange={(e) => handleDistrict(e.target.value)}
              value={district}
            />
          ) : (
            <Text>{district}</Text>
          )}
        </VStack>

        <VStack alignItems="start" mb="12px" mr="12px" minW={250}>
          <Text fontWeight="600">{t('dashboard.filters.school')}</Text>
          {loading ? (
            <Spinner />
          ) : (
            <Select onChange={(e) => setSchoolName(e.target.value)} value={schoolName}>
              <option value={undefined}></option>
              {schoolList.map((school) => (
                <option key={school.name} value={school.name}>
                  {school.name}
                </option>
              ))}
            </Select>
          )}
        </VStack>
      </Flex>

      {loading || !dashboard || !selected ? (
        <Center w={'100%'} mt="80px">
          <Loader />
        </Center>
      ) : (
        <>
          <Flex flexDir={isMobile ? 'column' : 'row'} w="full" gap="16px" mb="56px" alignItems="stretch">
            <VStack flex={3} gap="16px" alignItems="stretch">
              <Text color="#111417" fontSize="24px" fontWeight={600}>
                {t('dashboard.engagement.title')}
              </Text>
              <Text color="#111417" fontSize="16px" lineHeight="24px">
                {t('dashboard.engagement.description')}
              </Text>
              <HStack gap="16px" alignItems="stretch">
                <CardValue
                  label={t('dashboard.engagement.teachers-coached')}
                  value={dashboard.engagement.teachersCoached}
                />
                <CardValue
                  label={t('dashboard.engagement.active-coaches')}
                  value={dashboard.engagement.activeCoaches}
                />
                <CardValue
                  label={t('dashboard.engagement.coaching-sessions')}
                  value={dashboard.engagement.coachingSessions}
                />
              </HStack>
              <HStack gap="16px" alignItems="stretch">
                <SpeedometerGraph
                  label={t('dashboard.engagement.coaching-sessions-per-teacher-over-last-three-months')}
                  value={dashboard.engagement.coachingSessionPerTeacher}
                  maxValue={dashboard.engagement.coachingSessionPerTeacherGoal}
                />
                <DoughnutGraph
                  labels={[
                    t('dashboard.engagement.completed-a-second-coach-session'),
                    'Without a second coach sessions',
                  ]}
                  values={[
                    dashboard.engagement.teacherThatCompletedSecondSession,
                    dashboard.engagement.teachersCoached - dashboard.engagement.teacherThatCompletedSecondSession,
                  ]}
                  label={t('dashboard.engagement.completed-a-second-coach-session') || ''}
                  title={
                    (dashboard.engagement.teachersCoached
                      ? (dashboard.engagement.teacherThatCompletedSecondSession /
                          dashboard.engagement.teachersCoached) *
                        100
                      : 0
                    ).toFixed(0) + '%'
                  }
                  subTitle="Of teachers"
                />
              </HStack>
            </VStack>

            <VStack flex={2} alignItems="stretch">
              <Text color="#111417" fontSize="24px" fontWeight={600}>
                {t('dashboard.targeted-improvement-areas.title')}
              </Text>
              <Text color="#111417" fontSize="16px" lineHeight="24px">
                {t('dashboard.targeted-improvement-areas.description')}
              </Text>

              <DoughnutGraph
                showLegend={true}
                labels={dashboard.teachingPractices.map((item) => item.name)}
                values={dashboard.teachingPractices.map((item) => item.data.teachers)}
              />
            </VStack>
          </Flex>

          <Text mb="8px" color="#111417" fontWeight={500} fontSize={'16px'}>
            {t('dashboard.select-teaching-practices-to-show')}
          </Text>

          <Box maxW="full" overflow="scroll">
            <HStack mb="56px" w="1300px">
              {dashboard.teachingPractices.map((item) => (
                <Button
                  py="8px"
                  px="12px"
                  key={item.name}
                  fontWeight={400}
                  fontSize={'16px'}
                  borderRadius="full"
                  border="1px solid #DCE0E5"
                  onClick={() => setSelected(item)}
                  bg={selected.name === item.name ? '#C2E0FF' : '#ffffff'}
                  color={selected.name === item.name ? '#264673' : '#111417'}
                >
                  {item.name}
                </Button>
              ))}
            </HStack>
          </Box>

          <Text color="#111417" fontSize="24px" fontWeight={600}>
            {selected.name}
          </Text>

          <Flex flexDir={isMobile ? 'column' : 'row'} w="full" mt="24px" alignItems="stretch">
            <BarGraph
              labels={[
                t('dashboard.needs-work'),
                t('dashboard.keep-working'),
                t('dashboard.needs-attention'),
                t('dashboard.almost-there'),
                t('dashboard.doing-great'),
              ]}
              values={[
                selected.data.stars.needsWork,
                selected.data.stars.keepWorking,
                selected.data.stars.needsAttention,
                selected.data.stars.almostThere,
                selected.data.stars.doingGreat,
              ]}
            />

            <VStack mt={isMobile ? 4 : 0} ml={isMobile ? 0 : 4} flex={3} alignItems="stretch">
              <HStack alignItems="stretch">
                <CardValue
                  label={t('dashboard.teachers-showing-improvement-or-mastery')}
                  value={selected.data.teachersShowingImprovement}
                />
                <CardValue
                  label={t('dashboard.teachers-and-coaches-chose-to-work-on-improving-this-practice')}
                  value={selected.data.teachers}
                />
                <CardValue
                  label={t('dashboard.teachers-did-not-have-a-feedback-session')}
                  value={selected.data.teacherWithoutFeedback}
                />
              </HStack>

              <VStack
                justifyContent="center"
                flex={2}
                alignItems="center"
                p="16px"
                bg="#F2F4F7"
                borderRadius="16px"
                gap="0px"
              >
                <HorizontalBar
                  labels={[
                    t('dashboard.school-rating'),
                    t('dashboard.regional-average'),
                    t('dashboard.national-average'),
                  ]}
                  values={[dashboard.avg.school, dashboard.avg.regional, dashboard.avg.national]}
                />
              </VStack>
            </VStack>
          </Flex>
        </>
      )}
    </VStack>
  );
};

export default DashboardPage;
