import { Center, Text, VStack } from '@chakra-ui/react';
import { Chart as ChartJS, ChartData, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

type Props = {
  title?: string;
  subTitle?: string;
  label?: string;
  values: number[];
  labels?: string[];
};

export const DoughnutGraph: React.FC<Props> = ({ values, label, subTitle, title, labels }) => {
  const teachersThatCompletedTheSecondCoachSession: ChartData<'doughnut', number[], string> = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#3373CC', '#66CCCC', '#297A7A', '#264673', '#D1F0F0', '#C2E0FF'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <VStack flex={1} justifyContent="center" alignItems="stretch" p="16px" bg="#F2F4F7" borderRadius="16px">
      <Center position="relative">
        <Doughnut
          data={teachersThatCompletedTheSecondCoachSession}
          options={{ radius: 100, cutout: '80%' }}
          height="200px"
          width="200px"
        />
        {title && (
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
              {title}
            </Text>
            <Text fontSize={16} color="#576375">
              {subTitle}
            </Text>
          </VStack>
        )}
      </Center>
      <Text mt="16px" textAlign="center" color="#111417">
        {label}
      </Text>
    </VStack>
  );
};
