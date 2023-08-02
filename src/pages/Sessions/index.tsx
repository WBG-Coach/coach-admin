import Loader from "@/components/Base/Loader";
import SessionService from "@/services/session";
import { ISession } from "@/types";
import { Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SessionView from "./SessionView";
import SessionList from "./SessionList";
import HeaderPage from "@/components/HeaderPage";
import { useTranslation } from "react-i18next";

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

  return (
    <Box p={4} minH="100vh" flex={1}>
      <HeaderPage
        subtitle={t("Navbar.questionnaire")}
        title={t("Navbar.coaching-sessions")}
      />

      <SessionView
        session={sessionToView}
        onClose={() => setSessionToView(undefined)}
      />

      {isLoadingList ? (
        <Center minW={"350px"} h={"200px"}>
          <Loader />
        </Center>
      ) : (
        <SessionList sessions={sessions} handleOpen={setSessionToView} />
      )}
    </Box>
  );
};

export default SessionsPage;
