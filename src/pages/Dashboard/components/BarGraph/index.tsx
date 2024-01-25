import { Center, HStack, Text, VStack } from '@chakra-ui/react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

type Props = {
  values: number[];
  labels?: string[];
};

const COLORS = ['#69D6C7', '#6A5CE2', '#4C9AF7', '#A2CF57', '#D96684'];

export const BarGraph: React.FC<Props> = ({ values, labels }) => {
  const indices = Array.from({ length: values.length }, (_, i) => i);

  indices.sort((a, b) => values[b] - values[a]);

  const shortedColors = new Array(COLORS.length);

  shortedColors[indices[0]] = COLORS[0];
  shortedColors[indices[1]] = COLORS[1];
  shortedColors[indices[2]] = COLORS[2];
  shortedColors[indices[3]] = COLORS[3];
  shortedColors[indices[4]] = COLORS[4];

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
              backgroundColor: shortedColors,
            },
          ],
        }}
      />
    </VStack>
  );
};
