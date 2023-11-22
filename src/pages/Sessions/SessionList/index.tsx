import { Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Tag, Text } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { ISession } from '@/types';
import Table from '@/components/Table';
import Icon from '@/components/Base/Icon';
import { useTranslation } from 'react-i18next';

type Props = {
  sessions: ISession[];
  handleOpen: (session: ISession) => void;
};

const SessionList: React.FC<Props> = ({ sessions, handleOpen }) => {
  const { t } = useTranslation();

  return (
    <Table
      data={sessions}
      columns={[
        {
          renderColumn: (item: ISession) => item.school.name,
          title: t('session.table.school'),
          width: '20%',
        },
        {
          renderColumn: (item: ISession) => item.coach.name,
          title: t('session.table.coach'),
          width: '20%',
        },
        {
          renderColumn: (item: ISession) => item.teacher.name,
          title: t('session.table.teacher'),
          width: '20%',
        },
        {
          renderColumn: (item: ISession) => item.subject,
          title: t('session.table.subject'),
          width: '20%',
        },

        {
          renderColumn: (item: ISession) =>
            item?.feedback_id ? (
              <Tag color="green.700" bg="green.100">
                Complete
              </Tag>
            ) : (
              <Tag color="red.700" bg="red.100">
                Incomplete
              </Tag>
            ),
          title: t('session.table.feedback'),
          width: '10%',
        },
        {
          renderColumn: (item: ISession) => (
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
                </MenuList>
              </Menu>
            </Flex>
          ),
          width: '10%',
          title: t('common.actions'),
        },
      ]}
    />
  );
};

export default SessionList;
