import { Button, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { useState } from 'react';
import { DASHBOARD } from './mock';

ChartJS.register(ArcElement, Tooltip, Legend);

export const coachingSessionPerTeacher: ChartData<'doughnut', number[], string> = {
  datasets: [
    {
      data: [4.3, 0.7],
      backgroundColor: ['#3373CC', '#C7CBD1'],
      borderColor: ['#ffffff', '#ffffff'],
      borderWidth: 1,
      circumference: 270,
      rotation: 225,
      weight: 30,
    },
  ],
};
export const teachersThatCompletedTheSecondCoachSession: ChartData<'doughnut', number[], string> = {
  datasets: [
    {
      data: [48, 52],
      backgroundColor: ['#3373CC', '#66CCCC'],
      borderColor: ['#ffffff', '#66CCCC'],
      borderWidth: 1,
      rotation: 180,
      weight: 30,
    },
  ],
};

export const teachingPracticesCount: ChartData<'doughnut', number[], string> = {
  labels: DASHBOARD.teachingPractices.map((item) => item.name),
  datasets: [
    {
      data: DASHBOARD.teachingPractices.map((item) => item.data.teachers),
      backgroundColor: ['#D1F0F0', '#C2E0FF', '#3373CC', '#264673', '#66CCCC', '#297A7A'],
      borderColor: ['#D1F0F0', '#C2E0FF', '#3373CC', '#264673', '#66CCCC', '#297A7A'],
      borderWidth: 1,
      rotation: 180,
      weight: 30,
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
      <Text mt={0} textAlign="center" color="#111417" fontSize="16px">
        {title}
      </Text>
    </VStack>
  );

  return (
    <VStack minH="100vh" w="100%" alignItems="flex-start" p="56px">
      <HStack w="100%" gap="16px" mb="56px" alignItems="stretch">
        <VStack flex={1} gap="16px" alignItems="stretch">
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
            <VStack flex={1} alignItems="center" p="16px" bg="#F2F4F7" borderRadius="16px">
              <Center position="relative">
                <Doughnut data={coachingSessionPerTeacher} />
                <VStack
                  top="55px"
                  position="absolute"
                  bg="#F2F4F7"
                  borderRadius="50%"
                  w="calc(100% - 60px)"
                  h="calc(100% - 60px)"
                  justifyContent="center"
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
            <VStack flex={1} alignItems="stretch" p="16px" bg="#F2F4F7" borderRadius="16px">
              <Center position="relative">
                <Doughnut data={teachersThatCompletedTheSecondCoachSession} />
                <VStack
                  top="35px"
                  position="absolute"
                  bg="#F2F4F7"
                  borderRadius="50%"
                  w="calc(100% - 60px)"
                  h="calc(100% - 60px)"
                  justifyContent="center"
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

        <VStack flex={1} alignItems="stretch">
          <Text color="#111417" fontSize="24px" fontWeight={600}>
            Targeted improvement areas
          </Text>
          <Text color="#111417" fontSize="16px" lineHeight="24px">
            Teaching practices teachers and coaches agreed to work on between coaching sessions
          </Text>
          <Center flex={1} alignItems="center" p="16px" bg="#F2F4F7" borderRadius="16px">
            <Doughnut data={teachingPracticesCount} />
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
      <HStack>
        graph
        <VStack>
          <HStack>a b c</HStack>
          graph
        </VStack>
      </HStack>
    </VStack>
  );
};

export default DashboardPage;
