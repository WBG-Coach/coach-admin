import Loader from "@/components/Base/Loader";
import SessionService from "@/services/session";
import { ISession } from "@/types";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SessionForm from "./SessionForm";
import SessionList from "./SessionList";

const SessionsPage: React.FC = () => {
  const [newSession, setNewSession] = useState(false);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState<ISession>();
  const [sessionToDelete, setSessionToDelete] = useState<ISession>();

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setIsLoadingList(true);
    const data = await SessionService.getSessions();
    setSessions(data);
    setIsLoadingList(false);
  };

  const closeForm = () => {
    setNewSession(false);
    setSessionToEdit(undefined);
  };

  const saveSession = async (session: Partial<ISession>) => {
    setIsLoadingForm(true);
    if (sessionToEdit) {
      await SessionService.updateSession({ ...sessionToEdit, ...session });
    } else {
      await SessionService.saveSession(session);
    }
    setIsLoadingForm(false);
    loadSessions();
    closeForm();
  };

  const deleteSession = async () => {
    setIsLoadingDelete(true);
    if (sessionToDelete)
      await SessionService.DeleteSession(sessionToDelete?.id);
    setIsLoadingDelete(false);
    onCloseDeleteModal();
    loadSessions();
  };

  const onCloseDeleteModal = () => {
    setSessionToDelete(undefined);
  };

  return (
    <Box p={4} minH="100vh" flex={1}>
      <Flex
        pb={4}
        mb={6}
        justifyContent="space-between"
        w="full"
        alignItems="center"
        borderBottom="1px solid"
      >
        <Heading>{`Sessions (count: ${sessions.length})`}</Heading>
        {/* <Button onClick={() => setNewSession(true)}>New session</Button> */}
      </Flex>

      <SessionForm
        onClose={closeForm}
        onSubmit={saveSession}
        isSubmitting={isLoadingForm}
        sessionToEdit={sessionToEdit}
        isOpen={!!sessionToEdit || newSession}
      />

      {isLoadingList ? (
        <Center minW={"350px"} h={"200px"}>
          <Loader />
        </Center>
      ) : (
        <SessionList
          sessions={sessions}
          handleEdit={setSessionToEdit}
          handleDelete={setSessionToDelete}
        />
      )}

      <Modal isOpen={!!sessionToDelete} onClose={onCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this school?</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCloseDeleteModal}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={deleteSession}
              isLoading={isLoadingDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SessionsPage;
