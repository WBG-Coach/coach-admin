import { Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ICoach } from '@/types';
import Table from '@/components/Table';
import Icon from '@/components/Base/Icon';
import { useTranslation } from 'react-i18next';

type Props = {
  coaches: ICoach[];
  handleEdit: (coach: ICoach) => void;
  handleDelete: (coach: ICoach) => void;
  handleView: (coach: ICoach) => void;
};

const CoachList: React.FC<Props> = ({ coaches, handleDelete, handleEdit, handleView }) => {
  const { t } = useTranslation();

  return (
    <Table
      data={coaches}
      filters={[{ label: t('coaches.full-name'), prop: 'name' }]}
      columns={[
        {
          renderColumn: (item: ICoach) => `${item.name} ${item.surname}`,
          title: t('coaches.full-name'),
        },
        {
          renderColumn: (item: ICoach) => `${item.sessions?.length}`,
          title: t('coaches.total-teacher-coached'),
        },
        {
          renderColumn: (item: ICoach) => (
            <Flex justifyContent="center">
              <Menu>
                <MenuButton p="8px">
                  <Icon name="ellipsis-v" size={16} />
                </MenuButton>
                <MenuList>
                  <MenuItem gap="8px" alignItems="center" onClick={() => handleView(item)}>
                    <Icon name="eye" />
                    {t('common.view-details')}
                  </MenuItem>
                  <MenuItem gap="8px" alignItems="center" onClick={() => handleEdit(item)}>
                    <Icon name="pen" />
                    {t('common.edit')}
                  </MenuItem>
                  <MenuItem gap="8px" alignItems="center" color="red" onClick={() => handleDelete(item)}>
                    <Icon name="trash-alt" color="red" />
                    {t('common.delete')}
                  </MenuItem>
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

export default CoachList;
