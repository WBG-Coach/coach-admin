import Loader from '@/components/Base/Loader';
import CompetenceService from '@/services/competence';
import { ICompetence } from '@/types';
import { Box, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CompetenceForm from './CompetenceForm';
import CompetenceList from './CompetenceList';
import HeaderPage from '@/components/HeaderPage';
import { useTranslation } from 'react-i18next';
import handleDownloadJSON from '@/common/download';

const CompetenciesPage: React.FC = () => {
  const { t } = useTranslation();
  const [newCompetence, setNewCompetence] = useState(false);
  const [competencies, setCompetencies] = useState<ICompetence[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [competenceToEdit, setCompetenceToEdit] = useState<ICompetence>();
  const [competenceToView, setCompetenceToView] = useState<ICompetence>();

  useEffect(() => {
    loadCompetences();
  }, []);

  const loadCompetences = async () => {
    setIsLoadingList(true);
    const data = await CompetenceService.getCompetences();
    setCompetencies(data);
    setIsLoadingList(false);
  };

  const handleActivate = async (item: ICompetence) => {
    const newItem = {
      ...item,
      deleted_at: item.deleted_at ? null : new Date(),
    };
    await handleSave(newItem);
  };

  const handleSave = async (itemToSave: ICompetence) => {
    closeModal();
    setIsLoadingList(true);
    if (itemToSave.id) {
      await CompetenceService.updateCompetence(itemToSave);
    } else {
      await CompetenceService.saveCompetence(itemToSave);
    }
    await loadCompetences();
  };

  const closeModal = () => {
    setNewCompetence(false);
    setCompetenceToView(undefined);
    setCompetenceToEdit(undefined);
  };

  return (
    <Box p={4} minH="100vh" flex={1}>
      <HeaderPage
        subtitle={t('Navbar.questionnaire')}
        title={t('Navbar.teaching-practices')}
        newButtonValue={t('competence.new-competence')}
        onClickNew={() => setNewCompetence(true)}
        onClickDownload={() =>
          handleDownloadJSON(competencies, t('Navbar.teaching-practices').toLowerCase().replace(' ', '-'))
        }
      />

      <CompetenceForm
        onSubmit={handleSave}
        onClose={closeModal}
        competence={competenceToEdit || competenceToView}
        isOpen={!!competenceToView || !!competenceToEdit || newCompetence}
        readonly={!!competenceToView}
      />

      {isLoadingList ? (
        <Center minW={'350px'} h={'200px'}>
          <Loader />
        </Center>
      ) : (
        <CompetenceList
          competences={competencies}
          handleActivate={handleActivate}
          handleEdit={setCompetenceToEdit}
          handleOpen={setCompetenceToView}
        />
      )}
    </Box>
  );
};

export default CompetenciesPage;
