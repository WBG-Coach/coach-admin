import Loader from "@/components/Base/Loader";
import SchoolService from "@/services/school";
import { ISchool } from "@/types";
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
import SchoolForm from "./SchoolForm";
import SchoolList from "./SchoolList";

const SchoolsPage: React.FC = () => {
  const [newSchool, setNewSchool] = useState(false);
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [schoolToEdit, setSchoolToEdit] = useState<ISchool>();
  const [schoolToDelete, setSchoolToDelete] = useState<ISchool>();

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    setIsLoadingList(true);
    const data = await SchoolService.getSchools();
    setSchools(data);
    setIsLoadingList(false);
  };

  const closeForm = () => {
    setNewSchool(false);
    setSchoolToEdit(undefined);
  };

  const saveSchool = async (school: Partial<ISchool>) => {
    setIsLoadingForm(true);
    if (schoolToEdit) {
      await SchoolService.updateSchool({ ...schoolToEdit, ...school });
    } else {
      await SchoolService.saveSchool(school);
    }
    setIsLoadingForm(false);
    loadSchools();
    closeForm();
  };

  const deleteSchool = async () => {
    setIsLoadingDelete(true);
    if (schoolToDelete) await SchoolService.DeleteSchool(schoolToDelete?.id);
    setIsLoadingDelete(false);
    onCloseDeleteModal();
    loadSchools();
  };

  const onCloseDeleteModal = () => {
    setSchoolToDelete(undefined);
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
        <Heading>{`Schools (count: ${schools.length})`}</Heading>
        {/* <Button onClick={() => setNewSchool(true)}>New school</Button> */}
      </Flex>
      <SchoolForm
        onClose={closeForm}
        onSubmit={saveSchool}
        isSubmitting={isLoadingForm}
        schoolToEdit={schoolToEdit}
        isOpen={!!schoolToEdit || newSchool}
      />
      {isLoadingList ? (
        <Center minW={"350px"} h={"200px"}>
          <Loader />
        </Center>
      ) : (
        <SchoolList
          schools={schools}
          handleEdit={setSchoolToEdit}
          handleDelete={setSchoolToDelete}
        />
      )}
      <Modal isOpen={!!schoolToDelete} onClose={onCloseDeleteModal}>
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
              onClick={deleteSchool}
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

export default SchoolsPage;
