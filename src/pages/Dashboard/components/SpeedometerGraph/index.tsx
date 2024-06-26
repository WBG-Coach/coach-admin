import { Center, Text, VStack } from '@chakra-ui/react';
import { ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

type Props = {
  label: string;
  value: number;
  maxValue: number;
};

export const SpeedometerGraph: React.FC<Props> = ({ maxValue, value, label }) => {
  const { t } = useTranslation();
  const coachingSessionPerTeacher: ChartData<'doughnut', number[], string> = {
    datasets: [
      {
        data: [value, maxValue - value],
        backgroundColor: ['#4C9AF7', '#C7CBD1'],
        borderWidth: 0,
        circumference: 270,
        rotation: 225,
      },
    ],
  };

  return (
    <VStack p="16px" bg="#F2F4F7" borderRadius="16px" w="full">
      <Center position="relative" maxW="200px" m="auto">
        <Doughnut
          data={coachingSessionPerTeacher}
          options={{ radius: 100, cutout: '80%' }}
          height="200px"
          width="200px"
        />
        <VStack top="55px" position="absolute" borderRadius="50%" h="calc(100% - 90px)" justifyContent="center" gap={0}>
          <Text fontSize="42px" fontWeight={600} color="#111417">
            {value}
          </Text>
          <Text fontSize={16} color="#576375">
            {t('dashboard.goal', { value: maxValue })}
          </Text>
        </VStack>
      </Center>
      <Text mt="16px" textAlign="center" color="#111417">
        {label}
      </Text>
    </VStack>
  );
};
