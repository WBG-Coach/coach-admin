import { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, HStack, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { IDashboard, IStars, ITeachingPractices } from '@/types';
import DashboardService from '@/services/dashboard';
import Loader from '@/components/Base/Loader';
import { CardValue } from './components/CardValue';
import { SpeedometerGraph } from './components/SpeedometerGraph';
import { DoughnutGraph } from './components/DoughnutGraph';
import { BarGraph } from './components/BarGraph';
import { HorizontalBar } from './components/HorizontalBar';
import { useUserContext } from '@/contexts/UserContext';
import { useTranslation } from 'react-i18next';
import RegionSelect from '../Schools/SchoolForm/RegionSelect';
import DataRangePicker from '@/components/DataRangePicker';
import { Range } from 'react-date-range';

const DashboardPage: React.FC = () => {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState<IDashboard>();
  const [regionId, setRegionId] = useState(user?.region_id);
  const [selected, setSelected] = useState<ITeachingPractices>();
  const [dateRange, setDateRange] = useState<Range>();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (!loading) {
      setLoading(true);

      DashboardService.getData(regionId, dateRange).then((data) => {
        setDashboard(data);
        setSelected(data?.teachingPractices[0]);
        setLoading(false);
      });
    }
  }, [regionId, dateRange]);

  const handleRegion = (regionId?: string) => {
    setRegionId(regionId);
  };

  const calcAverageStars = (stars: IStars) => {
    const total = stars.needsWork + stars.keepWorking + stars.needsAttention + stars.almostThere + stars.doingGreat;
    if (total === 0) return 0;
    return (
      (stars.needsWork * 1 +
        stars.keepWorking * 2 +
        stars.needsAttention * 3 +
        stars.almostThere * 4 +
        stars.doingGreat * 5) /
      total
    );
  };

  const handleChangeDateRange = (range: Range) => {
    if (dateRange?.startDate !== range.startDate || dateRange?.endDate !== range.endDate) {
      setDateRange(range);
    }
  };

  return (
    <VStack mx="auto" w="full" minH="100vh" maxW="1200px" position="relative" p="56px" alignItems="flex-start">
      <Flex mb="20px" flexDir={isMobile ? 'column' : 'row'} w="full">
        <Flex flex={1}>
          <RegionSelect direction="row" level={0} onSelect={handleRegion} />
        </Flex>
        <Flex
          flex={1}
          ml={isMobile ? 0 : '12px'}
          mt={isMobile ? '12px' : 0}
          maxW={isMobile ? undefined : '220px'}
          w="full"
        >
          <DataRangePicker onChange={handleChangeDateRange} />
        </Flex>
      </Flex>

      {loading || !dashboard || !selected ? (
        <Center w={'100%'} mt="80px">
          <Loader />
        </Center>
      ) : (
        <>
          <VStack gap="16px" w="full" alignItems="flex-start">
            <Text color="#111417" fontSize="24px" fontWeight={600}>
              {t('dashboard.engagement.title')}
            </Text>
            <Text color="#111417" fontSize="16px" lineHeight="24px">
              {t('dashboard.engagement.description')}
            </Text>
            <HStack gap="16px" alignItems="stretch" w="full">
              <CardValue
                label={t('dashboard.engagement.teachers-coached')}
                value={dashboard.engagement.teachersCoached}
              />
              <CardValue label={t('dashboard.engagement.active-coaches')} value={dashboard.engagement.activeCoaches} />
              <CardValue
                label={t('dashboard.engagement.coaching-sessions')}
                value={dashboard.engagement.coachingSessions}
              />
              <CardValue
                label={t('dashboard.teachers-did-not-have-a-feedback-session')}
                value={selected.data.teacherWithoutFeedback}
              />
            </HStack>
            <HStack gap="16px" w="full">
              <SpeedometerGraph
                label={t('dashboard.engagement.coaching-sessions-per-teacher-over-last-three-months')}
                value={dashboard.engagement.coachingSessionPerTeacher}
                maxValue={dashboard.engagement.coachingSessionPerTeacherGoal}
              />
              <DoughnutGraph
                direction="column"
                labels={[t('dashboard.engagement.completed-a-second-coach-session'), 'Without a second coach sessions']}
                values={[
                  dashboard.engagement.teacherThatCompletedSecondSession,
                  dashboard.engagement.teachersCoached - dashboard.engagement.teacherThatCompletedSecondSession,
                ]}
                label={t('dashboard.engagement.completed-a-second-coach-session') || ''}
                title={
                  (dashboard.engagement.teachersCoached
                    ? (dashboard.engagement.teacherThatCompletedSecondSession / dashboard.engagement.teachersCoached) *
                      100
                    : 0
                  ).toFixed(0) + '%'
                }
                subTitle={t('dashboard.of_teacher') || ''}
              />
            </HStack>
          </VStack>

          <VStack w="full" alignItems="flex-start" my="24px">
            <Text color="#111417" fontSize="24px" fontWeight={600}>
              {t('dashboard.targeted-improvement-areas.title')}
            </Text>
            <Text color="#111417" fontSize="16px" lineHeight="24px" mb="8px">
              {t('dashboard.targeted-improvement-areas.description')}
            </Text>

            <DoughnutGraph
              direction="row"
              showLegend={true}
              labels={dashboard.teachingPractices.map((item) => item.name)}
              values={dashboard.teachingPractices.map((item) => item.data.teachers)}
            />
          </VStack>

          <Text mb="8px" color="#111417" fontWeight={500} fontSize={'16px'} mt="24px">
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
              </HStack>

              <VStack justifyContent="center" flex={2} alignItems="center" bg="#F2F4F7" borderRadius="16px" p={'32px'}>
                <HorizontalBar labels={[t('dashboard.average')]} values={[calcAverageStars(selected.data.stars)]} />
              </VStack>
            </VStack>
          </Flex>
        </>
      )}
    </VStack>
  );
};

export default DashboardPage;
