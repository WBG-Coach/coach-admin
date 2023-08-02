import Loader from '@/components/Base/Loader';
import Table from '@/components/Table';
import LogsService from '@/services/logs';
import { ILogs } from '@/types';
import { Center, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<ILogs[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    LogsService.getLogs().then((data) => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Center minW={'350px'} h={'200px'}>
      <Loader />
    </Center>
  ) : (
    <Table
      columns={[
        { title: t('settings.tabs.logs.user'), renderColumn: (log: ILogs) => log.user.name },
        { title: t('settings.tabs.logs.action'), renderColumn: (log: ILogs) => log.description },
        {
          title: t('settings.tabs.logs.date'),
          renderColumn: (log: ILogs) => new Date(log.created_at).toLocaleString(),
        },
      ]}
      data={logs}
    />
  );
};

export default Logs;
