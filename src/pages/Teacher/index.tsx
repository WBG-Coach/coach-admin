import Loader from "@/components/Base/Loader";
import TeacherService from "@/services/teacher";
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
    const data = await TeacherService.getTeachers();
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
      await TeacherService.updateTeacher({ ...teacherToEdit, ...teacher });
    } else {
      await TeacherService.saveTeacher(teacher);
    }
    setIsLoadingForm(false);
    loadTeachers();
    closeForm();
  };

  const deleteTeacher = async () => {
    setIsLoadingDelete(true);
    if (teacherToDelete)
      await TeacherService.DeleteTeacher(teacherToDelete?.id);
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
        justifyContent="space-between"
        w="full"
        alignItems="center"
        borderBottom="1px solid"
      >
        <Heading>Teachers</Heading>
        <Button onClick={() => setNewTeacher(true)}>New teacher</Button>
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
          <ModalHeader>Confirmar Exclusão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Tem certeza que deseja excluir este nome?</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCloseDeleteModal}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={deleteTeacher}
              isLoading={isLoadingDelete}
            >
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TeachersPage;
