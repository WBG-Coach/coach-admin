import { Button, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { Chart as ChartJS, ChartData, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

import { useEffect, useState } from 'react';
import { DASHBOARD } from './mock';
import { IDashboard, ITeachingPractices } from '@/types';
import DashboardService from '@/services/dashboard';
import Loader from '@/components/Base/Loader';
import { CardValue } from './components/CardValue';
import { SpeedometerGraph } from './components/SpeedometerGraph';
import { DoughnutGraph } from './components/DoughnutGraph';
import { BarGraph } from './components/BarGraph';

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<IDashboard>();
  const [selected, setSelected] = useState<ITeachingPractices>();

  useEffect(() => {
    DashboardService.getData().then((data) => {
      setDashboard(data);
      setSelected(data.teachingPractices[0]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (dashboard) {
    }
  }, [dashboard]);

  if (loading || !dashboard || !selected)
    return (
      <Center>
        <Loader />
      </Center>
    );

  return (
    <VStack mx="auto" minH="100vh" maxW="1200px" position="relative" overflow="scroll" alignItems="flex-start" p="56px">
      <HStack w="100%" gap="16px" mb="56px" alignItems="stretch">
        <VStack flex={3} gap="16px" alignItems="stretch">
          <Text color="#111417" fontSize="24px" fontWeight={600}>
            Engagement
          </Text>
          <Text color="#111417" fontSize="16px" lineHeight="24px">
            The numbers that represent coach engagement using the Coach platform in the selected period.
          </Text>
          <HStack gap="16px" alignItems="stretch">
            <CardValue label={'Teachers coached'} value={dashboard.engagement.teachersCoached} />
            <CardValue label={'Active coaches'} value={dashboard.engagement.activeCoaches} />
            <CardValue label={'Coaching sessions'} value={dashboard.engagement.coachingSessions} />
          </HStack>
          <HStack gap="16px" alignItems="stretch">
            <SpeedometerGraph
              label="Coaching sessions per teacher over last three months"
              value={dashboard.engagement.coachingSessionPerTeacher}
              maxValue={dashboard.engagement.coachingSessionPerTeacherGoal}
            />
            <DoughnutGraph
              labels={dashboard.teachingPractices.map((item) => item.name)}
              values={[dashboard.engagement.teacherThatCompletedSecondSession, DASHBOARD.engagement.teachersCoached]}
              label="Completed a second coach session"
              title={
                (
                  (DASHBOARD.engagement.teacherThatCompletedSecondSession / DASHBOARD.engagement.teachersCoached) *
                  100
                ).toFixed(0) + '%'
              }
              subTitle="Of teachers"
            />
          </HStack>
        </VStack>

        <VStack flex={2} alignItems="stretch">
          <Text color="#111417" fontSize="24px" fontWeight={600}>
            Targeted improvement areas
          </Text>
          <Text color="#111417" fontSize="16px" lineHeight="24px">
            Teaching practices teachers and coaches agreed to work on between coaching sessions
          </Text>

          <DoughnutGraph values={dashboard.teachingPractices.map((item) => item.data.teachers)} />
        </VStack>
      </HStack>

      <Text mb="8px" color="#111417" fontWeight={500} fontSize={'16px'}>
        Select Teaching Practices to show
      </Text>

      <HStack mb="56px">
        {DASHBOARD.teachingPractices.map((item) => (
          <Button
            py="8px"
            px="12px"
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

      <Text color="#111417" fontSize="24px" fontWeight={600}>
        {selected.name}
      </Text>

      <HStack w="100%" mt="24px" alignItems="stretch">
        <BarGraph
          labels={['Needs work', 'Keep working', 'Needs attention', 'Almost there', 'Doing great']}
          values={[
            selected.data.stars.needsWork,
            selected.data.stars.keepWorking,
            selected.data.stars.needsAttention,
            selected.data.stars.almostThere,
            selected.data.stars.doingGreat,
          ]}
        />

        <VStack flex={3} alignItems="stretch">
          <HStack alignItems="stretch">
            <CardValue
              label={'Teachers showing improvement or mastery'}
              value={selected.data.teachersShowingImprovement}
            />
            <CardValue
              label={'Teachers and coaches chose to work on improving this practice'}
              value={selected.data.teachers}
            />
            <CardValue label={'Teachers didn’t have a feedback session'} value={selected.data.teacherWithoutFeedback} />
          </HStack>

          <VStack
            justifyContent="center"
            flex={2}
            alignItems="center"
            p="16px"
            bg="#F2F4F7"
            borderRadius="16px"
            gap="0px"
          ></VStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default DashboardPage;
