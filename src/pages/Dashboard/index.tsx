import { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, HStack, Select, Spinner, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { IDashboard, ISchool, ITeachingPractices } from '@/types';
import DashboardService from '@/services/dashboard';
import Loader from '@/components/Base/Loader';
import { CardValue } from './components/CardValue';
import { SpeedometerGraph } from './components/SpeedometerGraph';
import { DoughnutGraph } from './components/DoughnutGraph';
import { BarGraph } from './components/BarGraph';
import { HorizontalBar } from './components/HorizontalBar';
import { REGIONS } from '@/common/constants';
import { useUserContext } from '@/contexts/UserContext';
import { ROLES } from '@/common/user';
import SelectDistrict from '@/components/SelectDistrict';

const DashboardPage: React.FC = () => {
  const { user } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState<IDashboard>();
  const [region, setRegion] = useState(user?.region);
  const [district, setDistrict] = useState(user?.district);
  const [schoolName, setSchoolName] = useState<string>();
  const [schoolList, setSchoolList] = useState<ISchool[]>([]);
  const [selected, setSelected] = useState<ITeachingPractices>();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      let schoolId: string | undefined;
      if (schoolName) {
        schoolId = schoolList.find((school) => school.name === schoolName)?.id;
      }
      DashboardService.getData(region, district, schoolId).then((data) => {
        const { schools, ...dash } = data;
        if (schools) {
          setSchoolList(schools);
        }
        setDashboard(dash);
        setSelected(dash?.teachingPractices[0]);
        setLoading(false);
      });
    }
  }, [region, district, schoolName]);

  const handleRegion = (newRegion: string) => {
    setRegion(newRegion);
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
          <Text fontWeight="600">Select region</Text>
          {user?.role === ROLES.admin ? (
            <Select placeholder="..." onChange={(e) => handleRegion(e.target.value)} value={region}>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Select>
          ) : (
            <Text>{region}</Text>
          )}
        </VStack>

        <VStack alignItems="start" mb="12px" mr="12px" minW={250}>
          <Text fontWeight="600">Select district</Text>
          {user?.role === ROLES.admin || user?.role === ROLES['region-analyst'] ? (
            <SelectDistrict
              role={user.role}
              region={region}
              onChange={(e) => handleDistrict(e.target.value)}
              value={district}
            />
          ) : (
            <Text>{district}</Text>
          )}
        </VStack>

        <VStack alignItems="start" mb="12px" mr="12px" minW={250}>
          <Text fontWeight="600">Select school</Text>
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
                  labels={['Completed a second coach session', 'Without a second coach sessions']}
                  values={[
                    dashboard.engagement.teacherThatCompletedSecondSession,
                    dashboard.engagement.teachersCoached - dashboard.engagement.teacherThatCompletedSecondSession,
                  ]}
                  label="Completed a second coach session"
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
                Targeted improvement areas
              </Text>
              <Text color="#111417" fontSize="16px" lineHeight="24px">
                Teaching practices teachers and coaches agreed to work on between coaching sessions
              </Text>

              <DoughnutGraph
                showLegend={true}
                labels={dashboard.teachingPractices.map((item) => item.name)}
                values={dashboard.teachingPractices.map((item) => item.data.teachers)}
              />
            </VStack>
          </Flex>

          <Text mb="8px" color="#111417" fontWeight={500} fontSize={'16px'}>
            Select Teaching Practices to show
          </Text>

          <Box maxW="full" overflow="scroll">
            <HStack mb="56px" w="1200px">
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
              labels={['Needs work', 'Keep working', 'Needs attention', 'Almost there', 'Doing great']}
              values={[
                selected.data.stars.needsWork,
                selected.data.stars.keepWorking,
                selected.data.stars.needsAttention,
                selected.data.stars.almostThere,
                selected.data.stars.doingGreat,
              ]}
            />

            <VStack mt={isMobile ? 4 : 0} flex={3} alignItems="stretch">
              <HStack alignItems="stretch">
                <CardValue
                  label={'Teachers showing improvement or mastery'}
                  value={selected.data.teachersShowingImprovement}
                />
                <CardValue
                  label={'Teachers and coaches chose to work on improving this practice'}
                  value={selected.data.teachers}
                />
                <CardValue
                  label={'Teachers didn’t have a feedback session'}
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
                  labels={['School rating', 'Regional average', 'National average']}
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
