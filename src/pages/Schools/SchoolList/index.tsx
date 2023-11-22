import {
  Button,
  Center,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ISchool } from '@/types';
import Table from '@/components/Table';
import Icon from '@/components/Base/Icon';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import SchoolService from '@/services/school';
import QRCodeModal from './QRCodeModal';

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
            renderColumn: (item: ISchool) => item.name,
            title: t('school.table.name'),
            width: '30%',
          },
          {
            renderColumn: (item: ISchool) => item.coachSchools?.length || '0',
            title: t('school.table.coaches-count'),
            width: '30%',
          },
          {
            renderColumn: (item: ISchool) => item.teachers?.length || '0',
            title: t('school.table.teachers-count'),
            width: '30%',
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
            width: '10%',
            title: 'common.actions',
          },
        ]}
      />
      <QRCodeModal school={schoolToQrCode} handleClose={closeModal} schoolKey={key} />
    </>
  );
};

export default SchoolList;
