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
          title: 'School',
        },
        {
          renderColumn: (item: ISession) => item.coach.name,
          title: 'Coach',
        },
        {
          renderColumn: (item: ISession) => item.teacher.name,
          title: 'Teacher',
        },
        {
          renderColumn: (item: ISession) => item.subject,
          title: 'Subject',
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
          title: 'Feedback',
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
          width: '85px',
          title: 'common.actions',
        },
      ]}
    />
  );
};

export default SessionList;
