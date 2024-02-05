import Loader from '@/components/Base/Loader';
import CoachService from '@/services/coach';
import { ICoach } from '@/types';
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
import CoachForm from './CoachForm';
import CoachList from './CoachList';
import HeaderPage from '@/components/HeaderPage';
import { useTranslation } from 'react-i18next';
import handleDownloadJSON from '@/common/download';
import CoachDetail from './CoachDetail';

const CoachesPage: React.FC = () => {
  const { t } = useTranslation();
  const [newCoach, setNewCoach] = useState(false);
  const [coaches, setCoaches] = useState<ICoach[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [coachToEdit, setCoachToEdit] = useState<ICoach>();
  const [coachToDelete, setCoachToDelete] = useState<ICoach>();
  const [coachToVew, setCoachToVew] = useState<ICoach>();

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

  const closeView = () => {
    setCoachToVew(undefined);
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
      <HeaderPage
        subtitle={t('Navbar.data')}
        title={t('Navbar.coaches')}
        newButtonValue={t('coaches.new-coach')}
        onClickNew={() => setNewCoach(true)}
        onClickDownload={() => handleDownloadJSON(coaches, t('Navbar.coaches').toLowerCase().replace(' ', '-'))}
      />

      <CoachForm
        onClose={closeForm}
        onSubmit={saveCoach}
        isSubmitting={isLoadingForm}
        coachToEdit={coachToEdit}
        isOpen={!!coachToEdit || newCoach}
      />

      <CoachDetail onClose={closeView} coach={coachToVew} isOpen={!!coachToVew} />

      {isLoadingList ? (
        <Center minW={'350px'} h={'200px'}>
          <Loader />
        </Center>
      ) : (
        <CoachList
          coaches={coaches}
          handleEdit={setCoachToEdit}
          handleDelete={setCoachToDelete}
          handleView={setCoachToVew}
        />
      )}
      <Modal isOpen={!!coachToDelete} onClose={onCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('coaches.delete-title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{t('coaches.delete-detail')}</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCloseDeleteModal}>
              {t('common.cancel')}
            </Button>
            <Button colorScheme="red" onClick={deleteCoach} isLoading={isLoadingDelete}>
              {t('common.delete')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CoachesPage;
