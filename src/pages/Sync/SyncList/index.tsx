import { Box, Flex, Text } from '@chakra-ui/react';
import { ISync } from '@/types';
import Table from '@/components/Table';
import { useTranslation } from 'react-i18next';

type Props = {
  syncs: ISync[];
  handleEdit: (sync: ISync) => void;
  handleDelete: (sync: ISync) => void;
};

const SyncList: React.FC<Props> = ({ syncs, handleDelete, handleEdit }) => {
  const { t } = useTranslation();

  return (
    <Table
      data={syncs}
      columns={[
        {
          renderColumn: (item: ISync) => item.apiLevel,
          title: t('sync.table.android-version'),
          width: '25%',
        },
        {
          renderColumn: (item: ISync) => item.model,
          title: t('sync.table.model'),
          width: '25%',
        },
        {
          renderColumn: (item: ISync) => item.deviceId,
          title: t('sync.table.device-id'),
          width: '25%',
        },
        {
          renderColumn: (item: ISync) =>
            new Date(item.lastPulledAt).toDateString() + ' ' + new Date(item.lastPulledAt).toLocaleTimeString(),
          title: t('sync.table.last-update'),
          width: '25%',
        },
      ]}
    />
  );
};

export default SyncList;
