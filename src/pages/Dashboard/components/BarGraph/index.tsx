import { Center, HStack, Text, VStack } from '@chakra-ui/react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

type Props = {
  values: number[];
  labels?: string[];
};

export const BarGraph: React.FC<Props> = ({ values, labels }) => {
  return (
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
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: ['#C2E0FF', '#47A3FF', '#70B8FF', '#99CCFF', '#4B83D2'],
            },
          ],
        }}
      />
    </VStack>
  );
};
