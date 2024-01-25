import { Box, Center, Flex, HStack, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { Chart as ChartJS, ChartData, ArcElement, Tooltip, LabelItem } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

type Props = {
  showLegend?: boolean;
  title?: string;
  subTitle?: string;
  label?: string;
  values: number[];
  labels?: string[];
  direction?: 'row' | 'column';
};

const COLORS = ['#69D6C7', '#4C9AF7', '#6A5CE2', '#A2CF57', '#D96684'];

export const DoughnutGraph: React.FC<Props> = ({ showLegend, values, label, subTitle, title, labels, direction }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction={isMobile ? 'column' : direction} p="16px" bg="#F2F4F7" borderRadius="16px" w="full">
      <Center position="relative" maxW="200px" m="auto">
        <Doughnut
          data={{
            labels,
            datasets: [
              {
                data: values,
                backgroundColor: COLORS,
                borderWidth: 0,
              },
            ],
          }}
          options={{ radius: 100, cutout: '80%' }}
          height="200px"
          width="200px"
        />
        {title && (
          <VStack
            top="35px"
            position="absolute"
            borderRadius="50%"
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

      {showLegend && (
        <VStack my="auto">
          {labels?.map((item, index) => (
            <HStack key={item} w="100%">
              <Box bg={COLORS[index]} w="20px" h="20px" /> <Text>{item}</Text>
            </HStack>
          ))}
        </VStack>
      )}

      {label && (
        <Text mt="16px" textAlign="center" color="#111417">
          {label}
        </Text>
      )}
    </Flex>
  );
};
