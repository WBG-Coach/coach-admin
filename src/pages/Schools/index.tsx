import Loader from '@/components/Base/Loader';
import SchoolService from '@/services/school';
import { ISchool } from '@/types';
import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SchoolList from './SchoolList';
import HeaderPage from '@/components/HeaderPage';
import { useTranslation } from 'react-i18next';
import SchoolForm from './SchoolForm';
import handleDownloadJSON from '@/common/download';
import SchoolImportModal from './SchoolImportModal';

const SchoolsPage: React.FC = () => {
  const { t } = useTranslation();
  const [newSchool, setNewSchool] = useState(false);
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [schoolToEdit, setSchoolToEdit] = useState<ISchool>();
  const [schoolToDelete, setSchoolToDelete] = useState<ISchool>();
  const [showImportModal, setShowImportModal] = useState(false);

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
    if (schoolToEdit) {
      await SchoolService.updateSchool({ ...schoolToEdit, ...school });
    } else {
      await SchoolService.saveSchool(school);
    }
    loadSchools();
    closeForm();
  };

  const deleteSchool = async () => {
    setIsLoadingDelete(true);
    if (schoolToDelete) await SchoolService.DeleteSchool(schoolToDelete?.id || '');
    setIsLoadingDelete(false);
    onCloseDeleteModal();
    loadSchools();
  };

  const onCloseDeleteModal = () => {
    setSchoolToDelete(undefined);
  };

  const onCloseImport = (reload?: boolean) => {
    setShowImportModal(false);
    if (reload) loadSchools();
  };

  return (
    <Box p={4} minH="100vh" flex={1}>
      <HeaderPage
        subtitle={t('Navbar.data')}
        title={t('Navbar.schools')}
        newButtonValue={t('school.new-school')}
        onClickNew={() => setNewSchool(true)}
        onClickImport={() => setShowImportModal(true)}
        onClickDownload={() => handleDownloadJSON(schools, t('Navbar.schools').toLowerCase().replace(' ', '-'))}
      />
      <SchoolForm
        onClose={closeForm}
        onSubmit={saveSchool}
        schoolId={schoolToEdit?.id}
        isOpen={!!schoolToEdit || newSchool}
      />
      {isLoadingList ? (
        <Center minW={'350px'} h={'200px'}>
          <Loader />
        </Center>
      ) : (
        <SchoolList schools={schools} handleEdit={setSchoolToEdit} handleDelete={setSchoolToDelete} />
      )}

      <SchoolImportModal isOpen={showImportModal} onClose={onCloseImport} />

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
            <Button colorScheme="red" onClick={deleteSchool} isLoading={isLoadingDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SchoolsPage;
