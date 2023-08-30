import { Box, Button, Center, HStack, Text, VStack } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

import { useState } from 'react';
import { DASHBOARD } from './mock';

ChartJS.register(ArcElement, Tooltip);

ChartJS.register(CategoryScale, LinearScale, BarElement);

export const coachingSessionPerTeacher: ChartData<'doughnut', number[], string> = {
  datasets: [
    {
      data: [4.3, 0.7],
      backgroundColor: ['#3373CC', '#C7CBD1'],
      borderWidth: 0,
      circumference: 270,
      rotation: 225,
    },
  ],
};
export const teachersThatCompletedTheSecondCoachSession: ChartData<'doughnut', number[], string> = {
  datasets: [
    {
      data: [48, 52],
      backgroundColor: ['#3373CC', '#66CCCC'],
      borderWidth: 0,
      rotation: 180,
    },
  ],
};

export const teachingPracticesCount: ChartData<'doughnut', number[], string> = {
  labels: DASHBOARD.teachingPractices.map((item) => item.name),
  datasets: [
    {
      data: DASHBOARD.teachingPractices.map((item) => item.data.teachers),
      backgroundColor: ['#D1F0F0', '#C2E0FF', '#3373CC', '#264673', '#66CCCC', '#297A7A'],
      borderWidth: 0,
    },
  ],
};

const DashboardPage: React.FC = () => {
  const [selected, setSelected] = useState(DASHBOARD.teachingPractices[0]);

  const renderValue = (value: number, title: string) => (
    <VStack flex={1} alignItems="center" p="16px" bg="#F2F4F7" borderRadius="16px" gap="0px">
      <Text mb="4px" fontSize="40px" fontWeight={600}>
        {value}
      </Text>
      <Text mt={0} textAlign="center" color="#111417" fontSize="14px">
        {title}
      </Text>
    </VStack>
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
            {renderValue(DASHBOARD.engagement.teachersCoached, 'Teachers coached')}
            {renderValue(DASHBOARD.engagement.activeCoaches, 'Active coaches')}
            {renderValue(DASHBOARD.engagement.coachingSessions, 'Coaching sessions')}
          </HStack>
          <HStack gap="16px" alignItems="stretch">
            <VStack flex={1} justifyContent="center" alignItems="stretch" p="16px" bg="#F2F4F7" borderRadius="16px">
              <Center position="relative">
                <Doughnut
                  data={coachingSessionPerTeacher}
                  options={{ radius: 100, cutout: '80%' }}
                  height="200px"
                  width="200px"
                />
                <VStack
                  top="55px"
                  position="absolute"
                  borderRadius="50%"
                  w="100%"
                  h="calc(100% - 90px)"
                  justifyContent="center"
                  gap={0}
                >
                  <Text fontSize="42px" fontWeight={600} color="#111417">
                    {DASHBOARD.engagement.coachingSessionPerTeacher}
                  </Text>
                  <Text fontSize={16} color="#576375">
                    Goal: {DASHBOARD.engagement.coachingSessionPerTeacherGoal}
                  </Text>
                </VStack>
              </Center>
              <Text mt="16px" textAlign="center" color="#111417">
                Coaching sessions per teacher over last three months
              </Text>
            </VStack>
            <VStack flex={1} justifyContent="center" alignItems="stretch" p="16px" bg="#F2F4F7" borderRadius="16px">
              <Center position="relative">
                <Doughnut
                  data={teachersThatCompletedTheSecondCoachSession}
                  options={{ radius: 100, cutout: '80%' }}
                  height="200px"
                  width="200px"
                />
                <VStack
                  top="35px"
                  position="absolute"
                  borderRadius="50%"
                  w="100%"
                  h="calc(100% - 80px)"
                  justifyContent="center"
                  gap={0}
                >
                  <Text fontSize="42px" fontWeight={600} color="#111417">
                    {(
                      (DASHBOARD.engagement.teacherThatCompletedSecondSession / DASHBOARD.engagement.teachersCoached) *
                      100
                    ).toFixed(0)}
                    %
                  </Text>
                  <Text fontSize={16} color="#576375">
                    Of teachers
                  </Text>
                </VStack>
              </Center>
              <Text mt="16px" textAlign="center" color="#111417">
                Completed a second coach session
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <VStack flex={2} alignItems="stretch">
          <Text color="#111417" fontSize="24px" fontWeight={600}>
            Targeted improvement areas
          </Text>
          <Text color="#111417" fontSize="16px" lineHeight="24px">
            Teaching practices teachers and coaches agreed to work on between coaching sessions
          </Text>
          <Center flex={1} alignItems="center" p="16px" bg="#F2F4F7" borderRadius="16px">
            <Doughnut data={teachingPracticesCount} options={{ radius: 120, cutout: '80%' }} />
          </Center>
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
            bg={selected === item ? '#C2E0FF' : '#ffffff'}
            color={selected === item ? '#264673' : '#111417'}
          >
            {item.name}
          </Button>
        ))}
      </HStack>

      <Text color="#111417" fontSize="24px" fontWeight={600}>
        {selected.name}
      </Text>

      <HStack w="100%" mt="24px" alignItems="stretch">
        <VStack
          justifyContent="center"
          flex={2}
          minH={300}
          alignItems="center"
          p="16px"
          bg="#F2F4F7"
          borderRadius="16px"
          gap="0px"
        >
          <Bar
            options={{ responsive: true }}
            data={{
              labels: ['Needs work', 'Keep working', 'Needs attention', 'Almost there', 'Doing great'],
              datasets: [
                {
                  label: 'Dataset 1',
                  data: [
                    selected.data.stars.needsWork,
                    selected.data.stars.keepWorking,
                    selected.data.stars.needsAttention,
                    selected.data.stars.almostThere,
                    selected.data.stars.doingGreat,
                  ],
                  backgroundColor: ['#C2E0FF', '#47A3FF', '#70B8FF', '#99CCFF', '#4B83D2'],
                },
              ],
            }}
          />
        </VStack>
        <VStack flex={3} alignItems="stretch">
          <HStack alignItems="stretch">
            {renderValue(selected.data.teachersShowingImprovement, 'Teachers showing improvement or mastery')}
            {renderValue(selected.data.teachers, 'Teachers and coaches chose to work on improving this practice')}
            {renderValue(selected.data.teacherWithoutFeedback, 'Teachers didn’t have a feedback session')}
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
