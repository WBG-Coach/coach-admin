import Loader from "@/components/Base/Loader";
import SyncService from "@/services/teacher";
import { ITeacher } from "@/types";
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
import TeacherForm from "./TeacherForm";
import TeacherList from "./TeacherList";

const TeachersPage: React.FC = () => {
  const [newTeacher, setNewTeacher] = useState(false);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState<ITeacher>();
  const [teacherToDelete, setTeacherToDelete] = useState<ITeacher>();

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setIsLoadingList(true);
    const data = await SyncService.getTeachers();
    setTeachers(data);
    setIsLoadingList(false);
  };

  const closeForm = () => {
    setNewTeacher(false);
    setTeacherToEdit(undefined);
  };

  const saveTeacher = async (teacher: Partial<ITeacher>) => {
    setIsLoadingForm(true);
    if (teacherToEdit) {
      await SyncService.updateTeacher({ ...teacherToEdit, ...teacher });
    } else {
      await SyncService.saveTeacher(teacher);
    }
    setIsLoadingForm(false);
    loadTeachers();
    closeForm();
  };

  const deleteTeacher = async () => {
    setIsLoadingDelete(true);
    if (teacherToDelete) await SyncService.DeleteTeacher(teacherToDelete?.id);
    setIsLoadingDelete(false);
    onCloseDeleteModal();
    loadTeachers();
  };

  const onCloseDeleteModal = () => {
    setTeacherToDelete(undefined);
  };

  return (
    <Box p={4} minH="100vh" flex={1}>
      <Flex
        pb={4}
        mb={6}
        w="full"
        alignItems="center"
        borderBottom="1px solid"
        justifyContent="space-between"
      >
        <Heading>{`Teachers (count: ${teachers.length})`}</Heading>
        {/* <Button onClick={() => setNewTeacher(true)}>New teacher</Button> */}
      </Flex>
      <TeacherForm
        onClose={closeForm}
        onSubmit={saveTeacher}
        isSubmitting={isLoadingForm}
        teacherToEdit={teacherToEdit}
        isOpen={!!teacherToEdit || newTeacher}
      />
      {isLoadingList ? (
        <Center minW={"350px"} h={"200px"}>
          <Loader />
        </Center>
      ) : (
        <TeacherList
          teachers={teachers}
          handleEdit={setTeacherToEdit}
          handleDelete={setTeacherToDelete}
        />
      )}
      <Modal isOpen={!!teacherToDelete} onClose={onCloseDeleteModal}>
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
              onClick={deleteTeacher}
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

export default TeachersPage;
