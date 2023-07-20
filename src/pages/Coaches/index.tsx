import Loader from "@/components/Base/Loader";
import CoachService from "@/services/coach";
import { ICoach } from "@/types";
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CoachForm from "./CoachForm";
import CoachList from "./CoachList";
import HeaderPage from "@/components/HeaderPage";
import { useTranslation } from "react-i18next";

const CoachesPage: React.FC = () => {
  const { t } = useTranslation();
  const [newCoach, setNewCoach] = useState(false);
  const [coaches, setCoaches] = useState<ICoach[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [coachToEdit, setCoachToEdit] = useState<ICoach>();
  const [coachToDelete, setCoachToDelete] = useState<ICoach>();

  useEffect(() => {
    loadCoaches();
  }, []);

  const loadCoaches = async () => {
    setIsLoadingList(true);
    const data = await CoachService.getCoaches();
    setCoaches(data);
    setIsLoadingList(false);
  };

  const closeForm = () => {
    setNewCoach(false);
    setCoachToEdit(undefined);
  };

  const saveCoach = async (coach: Partial<ICoach>) => {
    setIsLoadingForm(true);
    if (coachToEdit) {
      await CoachService.updateCoach({ ...coachToEdit, ...coach });
    } else {
      await CoachService.saveCoach(coach);
    }
    setIsLoadingForm(false);
    loadCoaches();
    closeForm();
  };

  const deleteCoach = async () => {
    setIsLoadingDelete(true);
    if (coachToDelete) await CoachService.DeleteCoach(coachToDelete?.id);
    setIsLoadingDelete(false);
    onCloseDeleteModal();
    loadCoaches();
  };

  const onCloseDeleteModal = () => {
    setCoachToDelete(undefined);
  };

  return (
    <Box p={4} minH="100vh" flex={1}>
      <HeaderPage subtitle={t("Navbar.data")} title={t("Navbar.coaches")} />
      <CoachForm
        onClose={closeForm}
        onSubmit={saveCoach}
        isSubmitting={isLoadingForm}
        coachToEdit={coachToEdit}
        isOpen={!!coachToEdit || newCoach}
      />
      {isLoadingList ? (
        <Center minW={"350px"} h={"200px"}>
          <Loader />
        </Center>
      ) : (
        <CoachList
          coachs={coaches}
          handleEdit={setCoachToEdit}
          handleDelete={setCoachToDelete}
        />
      )}
      <Modal isOpen={!!coachToDelete} onClose={onCloseDeleteModal}>
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
              onClick={deleteCoach}
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

export default CoachesPage;
