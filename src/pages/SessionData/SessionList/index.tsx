import Table from '@/components/Table';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type ISessionData = {
  id: string;
  'School Name': string;
  'Number of Coaches': number;
  'Number of Feedbacks': number;
  'Teachers with at least 1 Session': number;
  'Average Value for Critical Thinking': number;
  'Effective teaching': number;
  'Positive behavioral expectations': number;
  'Supportive learning environment': number;
  'Time on learning': number;
};

type Props = {
  sessions: ISessionData[];
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
          renderColumn: (item: ISessionData) => item['School Name'],
          getOrderProp: (item: ISessionData) => item['School Name'],
          title: t('session-data.table.school'),
          width: '30%',
        },
        {
          renderColumn: (item: ISessionData) => item['Number of Coaches'],
          getOrderProp: (item: ISessionData) => item['Number of Coaches'],
          title: t('session-data.table.number-of-coaches'),
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => item['Teachers with at least 1 Session'],
          getOrderProp: (item: ISessionData) => item['Teachers with at least 1 Session'],
          title: t('session-data.table.number-of-teachers-coached'),
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => item['Number of Feedbacks'],
          getOrderProp: (item: ISessionData) => item['Number of Feedbacks'],
          title: t('session-data.table.feedback-sessions'),
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Supportive learning environment'] || 0)?.toFixed(1),
          getOrderProp: (item: ISessionData) => Number(item['Supportive learning environment'] || 0)?.toFixed(1),
          title: t('session-data.table.supportive-learning Environment'),
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Average Value for Critical Thinking'] || 0)?.toFixed(1),
          getOrderProp: (item: ISessionData) => Number(item['Average Value for Critical Thinking'] || 0)?.toFixed(1),
          title: t('session-data.table.critical-thinking'),
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Effective teaching'] || 0)?.toFixed(1),
          getOrderProp: (item: ISessionData) => Number(item['Effective teaching'] || 0)?.toFixed(1),
          title: t('session-data.table.effective-teaching'),
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Time on learning'] || 0)?.toFixed(1),
          getOrderProp: (item: ISessionData) => Number(item['Time on learning'] || 0)?.toFixed(1),
          title: t('session-data.table.time-on-learning'),
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Positive behavioral expectations'] || 0)?.toFixed(1),
          getOrderProp: (item: ISessionData) => Number(item['Positive behavioral expectations'] || 0)?.toFixed(1),
          title: t('session-data.table.positive-behavioral-expectations'),
          isNumber: true,
          width: '10%',
        },
      ]}
    />
  );
};

export default SessionList;
