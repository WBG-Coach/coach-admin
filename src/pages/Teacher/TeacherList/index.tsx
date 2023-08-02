import { Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { ITeacher } from '@/types';
import Table from '@/components/Table';
import { useTranslation } from 'react-i18next';
import Icon from '@/components/Base/Icon';

type Props = {
  teachers: ITeacher[];
  handleEdit: (teacher: ITeacher) => void;
  handleDelete: (teacher: ITeacher) => void;
};

const TeacherList: React.FC<Props> = ({ teachers, handleDelete, handleEdit }) => {
  const { t } = useTranslation();

  return (
    <Table
      data={teachers}
      columns={[
        {
          renderColumn: (item: ITeacher) => item.name,
          title: 'Name',
        },
        {
          renderColumn: (item: ITeacher) => item.surname,
          title: 'Surname',
        },
        {
          renderColumn: (item: ITeacher) => item.subject,
          title: 'Subject',
        },
        {
          renderColumn: (item: ITeacher) => (
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

export default TeacherList;
