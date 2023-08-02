import { Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ICoach } from '@/types';
import Table from '@/components/Table';
import Icon from '@/components/Base/Icon';
import { useTranslation } from 'react-i18next';

type Props = {
  coachs: ICoach[];
  handleEdit: (coach: ICoach) => void;
  handleDelete: (coach: ICoach) => void;
};

const CoachList: React.FC<Props> = ({ coachs, handleDelete, handleEdit }) => {
  const { t } = useTranslation();

  return (
    <Table
      data={coachs}
      columns={[
        {
          renderColumn: (item: ICoach) => item.name,
          title: 'Name',
        },
        {
          renderColumn: (item: ICoach) => item.surname,
          title: 'Surname',
        },
        {
          renderColumn: (item: ICoach) => (
            <Flex justifyContent="center">
              <Menu>
                <MenuButton p="8px">
                  <Icon name="ellipsis-v" size={16} />
                </MenuButton>
                <MenuList>
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
