import Loader from '@/components/Base/Loader';
import SessionService from '@/services/session';
import { ISession } from '@/types';
import { Box, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SessionView from './SessionView';
import SessionList from './SessionList';
import HeaderPage from '@/components/HeaderPage';
import { useTranslation } from 'react-i18next';
import handleDownloadJSON from '@/common/download';

const SessionsPage: React.FC = () => {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [sessionToView, setSessionToView] = useState<ISession>();

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setIsLoadingList(true);
    const data = await SessionService.getSessions();
    setSessions(data);
    setIsLoadingList(false);
  };

  const formatToSimpleJson = (sessions: ISession[]): any[] => {
    return sessions.map((session) => ({
      ...session,
      school_name: session.school.name,
      school_emis_number: session.school.emis_number,
      coach_name: session.coach.name,
      coach_surname: session.coach.surname,
      teacher_name: session.teacher.name,
      teacher_surname: session.teacher.surname,
      teacher_subject: session.teacher.subject,
      teacher_birthdate: session.teacher.birthdate,
      teacher_emis_number: session.teacher.emis_number,
      ...session.answers.reduce((acc, item) => ({ ...acc, [`answer_question_${item.question_id}`]: item.value }), {}),
    }));
  };

  return (
    <Box p={4} minH="100vh" flex={1}>
      <HeaderPage
        subtitle={t('Navbar.questionnaire')}
        title={t('Navbar.coaching-sessions')}
        onClickDownload={() =>
          handleDownloadJSON(formatToSimpleJson(sessions), t('Navbar.sessions').toLowerCase().replace(' ', '-'))
        }
      />

      <SessionView session={sessionToView} onClose={() => setSessionToView(undefined)} />

      {isLoadingList ? (
        <Center minW={'350px'} h={'200px'}>
          <Loader />
        </Center>
      ) : (
        <SessionList sessions={sessions} handleOpen={setSessionToView} />
      )}
    </Box>
  );
};

export default SessionsPage;
