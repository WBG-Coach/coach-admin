import Loader from "@/components/Base/Loader";
import CompetenceService from "@/services/competence";
import { ICompetence } from "@/types";
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
import CompetenceForm from "./CompetenceForm";
import CompetenceList from "./CompetenceList";

const CompetenciesPage: React.FC = () => {
  const [newCompetence, setNewCompetence] = useState(false);
  const [competencies, setCompetencies] = useState<ICompetence[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [competenceToEdit, setCompetenceToEdit] = useState<ICompetence>();
  const [competenceToDelete, setCompetenceToDelete] = useState<ICompetence>();

  useEffect(() => {
    loadCompetences();
  }, []);

  const loadCompetences = async () => {
    setIsLoadingList(true);
    const data = await CompetenceService.getCompetences();
    setCompetencies(data);
    setIsLoadingList(false);
  };

  const closeForm = () => {
    setNewCompetence(false);
    setCompetenceToEdit(undefined);
  };

  const saveCompetence = async (competence: Partial<ICompetence>) => {
    setIsLoadingForm(true);
    if (competenceToEdit) {
      await CompetenceService.updateCompetence({
        ...competenceToEdit,
        ...competence,
      });
    } else {
      await CompetenceService.saveCompetence(competence);
    }
    setIsLoadingForm(false);
    loadCompetences();
    closeForm();
  };

  const deleteCompetence = async () => {
    setIsLoadingDelete(true);
    if (competenceToDelete)
      await CompetenceService.deleteCompetence(competenceToDelete?.id);
    setIsLoadingDelete(false);
    onCloseDeleteModal();
    loadCompetences();
  };

  const onCloseDeleteModal = () => {
    setCompetenceToDelete(undefined);
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
        <Heading>{`Competences (count: ${competencies.length})`}</Heading>
        {/* <Button onClick={() => setNewCompetence(true)}>New competence</Button> */}
      </Flex>

      <CompetenceForm
        onClose={closeForm}
        onSubmit={saveCompetence}
        isSubmitting={isLoadingForm}
        competenceToEdit={competenceToEdit}
        isOpen={!!competenceToEdit || newCompetence}
      />

      {isLoadingList ? (
        <Center minW={"350px"} h={"200px"}>
          <Loader />
        </Center>
      ) : (
        <CompetenceList
          competences={competencies}
          handleEdit={setCompetenceToEdit}
          handleDelete={setCompetenceToDelete}
        />
      )}

      <Modal isOpen={!!competenceToDelete} onClose={onCloseDeleteModal}>
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
              onClick={deleteCompetence}
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

export default CompetenciesPage;
