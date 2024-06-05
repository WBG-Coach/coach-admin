import { Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IRegion, ISchool } from '@/types';
import Table from '@/components/Table';
import Icon from '@/components/Base/Icon';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import SchoolService from '@/services/school';
import QRCodeModal from './QRCodeModal';
import { formatRegionPath } from '@/common/helper';

type Props = {
  schools: ISchool[];
  handleEdit: (school: ISchool) => void;
  handleDelete: (school: ISchool) => void;
};

const SchoolList: React.FC<Props> = ({ schools, handleDelete, handleEdit }) => {
  const { t } = useTranslation();
  const [schoolToQrCode, setSchoolToQrCode] = useState<ISchool>();
  const [key, setKey] = useState<string>();

  useEffect(() => {
    if (schoolToQrCode?.id) SchoolService.generateQrCode(schoolToQrCode.id).then(setKey);
  }, [schoolToQrCode]);

  const closeModal = () => {
    setKey(undefined);
    setSchoolToQrCode(undefined);
  };

  return (
    <>
      <Table
        filters={[{ label: t('school.table.name'), prop: 'name' }]}
        data={schools}
        columns={[
          {
            title: t('school.table.emis_number'),
            renderColumn: (item: ISchool) => item.emis_number,
            getOrderProp: (item: ISchool) => item.emis_number,
          },
          {
            title: t('school.table.name'),
            renderColumn: (item: ISchool) => item.name,
            getOrderProp: (item: ISchool) => item.name,
          },
          {
            title: t('school.table.region'),
            renderColumn: (item: ISchool) => formatRegionPath(item.region),
            getOrderProp: (item: ISchool) => formatRegionPath(item.region),
          },
          {
            renderColumn: (item: ISchool) => (
              <Flex justifyContent="center">
                <Menu>
                  <MenuButton p="8px">
                    <Icon name="ellipsis-v" size={16} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem gap="8px" alignItems="center" onClick={() => setSchoolToQrCode(item)}>
                      <Icon name="qrcode-scan" />
                      {t('common.generateQRCode')}
                    </MenuItem>
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
            title: 'common.actions',
          },
        ]}
      />
      <QRCodeModal school={schoolToQrCode} handleClose={closeModal} schoolKey={key} />
    </>
  );
};

export default SchoolList;
