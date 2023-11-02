import Table from '@/components/Table';
import { ReactNode } from 'react';

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
  return (
    <Table
      data={sessions}
      topSession={filters}
      columns={[
        {
          renderColumn: (item: ISessionData) => item['School Name'],
          getOrderProp: (item: ISessionData) => item['School Name'],
          title: 'School',
          width: '30%',
        },
        {
          renderColumn: (item: ISessionData) => item['Number of Coaches'],
          getOrderProp: (item: ISessionData) => item['Number of Coaches'],
          title: 'Number of coaches',
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => item['Teachers with at least 1 Session'],
          getOrderProp: (item: ISessionData) => item['Teachers with at least 1 Session'],
          title: 'Number of teachers coached',
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => item['Number of Feedbacks'],
          getOrderProp: (item: ISessionData) => item['Number of Feedbacks'],
          title: 'Feedback sessions',
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Supportive learning environment'] || 0)?.toFixed(1),
          getOrderProp: (item: ISessionData) => Number(item['Supportive learning environment'] || 0)?.toFixed(1),
          title: 'Supportive Learning Environment',
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Average Value for Critical Thinking'] || 0)?.toFixed(1),
          getOrderProp: (item: ISessionData) => Number(item['Average Value for Critical Thinking'] || 0)?.toFixed(1),
          title: 'Critical Thinking',
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Effective teaching'] || 0)?.toFixed(1),
          getOrderProp: (item: ISessionData) => Number(item['Effective teaching'] || 0)?.toFixed(1),
          title: 'Effective Teaching',
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Time on learning'] || 0)?.toFixed(1),
          getOrderProp: (item: ISessionData) => Number(item['Time on learning'] || 0)?.toFixed(1),
          title: 'Time on Learning',
          isNumber: true,
          width: '10%',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Positive behavioral expectations'] || 0)?.toFixed(1),
          getOrderProp: (item: ISessionData) => Number(item['Positive behavioral expectations'] || 0)?.toFixed(1),
          title: 'Positive Behavioral Expectations',
          isNumber: true,
          width: '10%',
        },
      ]}
    />
  );
};

export default SessionList;
