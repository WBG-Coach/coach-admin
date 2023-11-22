import { Center, Flex, Menu, MenuButton, MenuItem, MenuList, Tag, TagLabel } from '@chakra-ui/react';
import { ICompetence } from '@/types';
import Table from '@/components/Table';
import { useTranslation } from 'react-i18next';
import Icon from '@/components/Base/Icon';

type Props = {
  competences: ICompetence[];
  handleEdit: (competence: ICompetence) => void;
  handleOpen: (competence: ICompetence) => void;
  handleActivate: (competence: ICompetence) => void;
};

const CompetenceList: React.FC<Props> = ({ competences, handleActivate, handleEdit, handleOpen }) => {
  const { t } = useTranslation();

  return (
    <Table
      data={competences}
      columns={[
        {
          renderColumn: (item: ICompetence) => item.title,
          title: 'teacher-practices.table.name',
          width: 'calc(100% - 200px)',
        },
        {
          width: '100px',
          renderColumn: (item: ICompetence) => <Center>{item.questions?.length}</Center>,
          title: 'teacher-practices.table.number-of-questions',
        },
        {
          renderColumn: (item: ICompetence) => (
            <Center>
              <Tag size="lg" variant="subtle" colorScheme={item.deleted_at ? 'red' : 'green'}>
                <TagLabel>{t(item.deleted_at ? 'teacher-practices.inactive' : 'teacher-practices.active')}</TagLabel>
              </Tag>
            </Center>
          ),
          width: '120px',
          title: 'teacher-practices.table.publish-state',
        },
        {
          renderColumn: (item: ICompetence) => (
            <Flex justifyContent="center">
              <Menu>
                <MenuButton p="8px">
                  <Icon name="ellipsis-v" size={16} />
                </MenuButton>
                <MenuList>
                  <MenuItem gap="8px" alignItems="center" onClick={() => handleOpen(item)}>
                    <Icon name="eye" />
                    {t('common.view')}
                  </MenuItem>
                  <MenuItem gap="8px" alignItems="center" onClick={() => handleEdit(item)}>
                    <Icon name="pen" />
                    {t('common.edit')}
                  </MenuItem>
                  {item.deleted_at ? (
                    <MenuItem gap="8px" alignItems="center" onClick={() => handleActivate(item)}>
                      <Icon name="toggle-on" />
                      {t('common.activate')}
                    </MenuItem>
                  ) : (
                    <MenuItem gap="8px" alignItems="center" onClick={() => handleActivate(item)}>
                      <Icon name="toggle-off" />
                      {t('common.deactivate')}
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Flex>
          ),
          width: '85px',
          title: 'common.actions',
        },
      ]}
    />
  );
};

export default CompetenceList;
