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
          title: 'School',
          width: '350px',
        },
        {
          renderColumn: (item: ISessionData) => item['Number of Coaches'],
          title: 'Number of coaches',
        },
        {
          renderColumn: (item: ISessionData) => item['Teachers with at least 1 Session'],
          title: 'Number of teachers coached',
        },
        {
          renderColumn: (item: ISessionData) => item['Number of Feedbacks'],
          title: 'Feedback sessions',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Supportive learning environment'] || 0)?.toFixed(1),
          title: 'Supportive Learning Environment',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Average Value for Critical Thinking'] || 0)?.toFixed(1),
          title: 'Critical Thinking',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Effective teaching']) || (0)?.toFixed(1),
          title: 'Effective Teaching',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Time on learning'] || 0)?.toFixed(1),
          title: 'Time on Learning',
        },
        {
          renderColumn: (item: ISessionData) => Number(item['Positive behavioral expectations'] || 0)?.toFixed(1),
          title: 'Positive Behavioral Expectations',
        },
      ]}
    />
  );
};

export default SessionList;
