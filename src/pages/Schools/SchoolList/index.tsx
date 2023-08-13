import {
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react';
import { ISchool } from '@/types';
import Table from '@/components/Table';
import Icon from '@/components/Base/Icon';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import SchoolService from '@/services/school';

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
    console.log(key);
    setKey(undefined);
    setSchoolToQrCode(undefined);
  };

  return (
    <>
      <Table
        filters={[{ label: 'School name', prop: 'name' }]}
        data={schools}
        columns={[
          {
            renderColumn: (item: ISchool) => item.name,
            title: 'Name',
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
            width: '85px',
            title: 'common.actions',
          },
        ]}
      />
      <Modal isOpen={!!schoolToQrCode} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>{schoolToQrCode?.name}</Center>
          </ModalHeader>
          <ModalBody>
            <Center my="16px">
              {schoolToQrCode && key ? (
                <QRCode size={300} value={JSON.stringify({ ...schoolToQrCode, key })} />
              ) : (
                <Spinner />
              )}
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" w="full" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SchoolList;
