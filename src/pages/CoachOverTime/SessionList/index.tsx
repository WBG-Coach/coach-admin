import { Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Tag, Text } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { ISession } from '@/types';
import Table from '@/components/Table';
import Icon from '@/components/Base/Icon';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

export type ISessionOverTime = {
  id: string;
  'School Name': string;
  'Number of Coaches': number;
  'Number of Feedbacks': number;
  'Teachers with at least 1 Session': number;
  'Last 30 days': number;
  'Last 30 and 60 days': number;
  'Last 60 and 90 days': number;
  'More than 90 days ago': number;
};
type Props = {
  sessions: ISessionOverTime[];
  filters?: ReactNode;
};

const SessionList: React.FC<Props> = ({ sessions, filters }) => {
  const { t } = useTranslation();

  return (
    <Table
      data={sessions}
      topSession={filters}
      columns={[
        {
          renderColumn: (item: ISessionOverTime) => item['School Name'],
          getOrderProp: (item: ISessionOverTime) => item['School Name'],
          title: t('coach-over-time.table.School'),
        },
        {
          renderColumn: (item: ISessionOverTime) => item['Number of Coaches'],
          getOrderProp: (item: ISessionOverTime) => item['Number of Coaches'],
          title: t('coach-over-time.table.Number of coaches'),
          isNumber: true,
        },
        {
          renderColumn: (item: ISessionOverTime) => item['Teachers with at least 1 Session'],
          getOrderProp: (item: ISessionOverTime) => item['Teachers with at least 1 Session'],
          title: t('coach-over-time.table.Number of teachers coached'),
          isNumber: true,
        },
        {
          renderColumn: (item: ISessionOverTime) => item['Number of Feedbacks'],
          getOrderProp: (item: ISessionOverTime) => item['Number of Feedbacks'],
          title: t('coach-over-time.table.Feedback sessions'),
          isNumber: true,
        },
        {
          renderColumn: (item: ISessionOverTime) => item['Last 30 days'],
          getOrderProp: (item: ISessionOverTime) => item['Last 30 days'],
          title: t('coach-over-time.table.Teachers coached (last 30 days)'),
          isNumber: true,
        },
        {
          renderColumn: (item: ISessionOverTime) => item['Last 30 and 60 days'],
          getOrderProp: (item: ISessionOverTime) => item['Last 30 and 60 days'],
          title: t('coach-over-time.table.Teachers coached (30-60 days)'),
          isNumber: true,
        },
        {
          renderColumn: (item: ISessionOverTime) => item['Last 60 and 90 days'],
          getOrderProp: (item: ISessionOverTime) => item['Last 60 and 90 days'],
          title: t('coach-over-time.table.Teachers coached (60-90 days)'),
          isNumber: true,
        },
        {
          renderColumn: (item: ISessionOverTime) => item['More than 90 days ago'],
          getOrderProp: (item: ISessionOverTime) => item['More than 90 days ago'],
          title: t('coach-over-time.table.Teachers coached (90+ days)'),
          isNumber: true,
        },
      ]}
    />
  );
};

export default SessionList;
