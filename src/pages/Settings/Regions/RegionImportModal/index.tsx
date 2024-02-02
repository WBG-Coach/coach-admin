import RegionService, { RegionBatchResponse } from '@/services/region';
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import Papa from 'papaparse';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  onClose: (reload?: boolean) => void;
};

const RegionImportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [header, setHeader] = useState<string[]>([]);
  const [arrayData, setArrayData] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<RegionBatchResponse>();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<string[]>(file, {
        header: false,
        complete: function (results) {
          const [header, ...data] = results.data;

          setArrayData(data);
          setHeader(header);
        },
      });
    }
  };

  const startImport = async () => {
    setIsLoading(true);
    const response = await RegionService.createRegionBatch(arrayData);
    setResponse(response);
    setIsLoading(false);
  };

  const onCancel = () => {
    onClose();
    setArrayData([]);
    setIsLoading(false);
    setResponse(undefined);
  };

  const onFinish = () => {
    onClose();
    setArrayData([]);
    setIsLoading(false);
    setResponse(undefined);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('settings.tabs.region.import-title')}</ModalHeader>
        <ModalCloseButton />
        {isLoading ? (
          <ModalBody>
            <Spinner />
          </ModalBody>
        ) : response ? (
          <ModalBody>
            <VStack w="full">
              <Text fontSize={28} mb={8}>
                {!!response.failItems?.length
                  ? t('settings.tabs.region.items-imported-fail')
                  : t('settings.tabs.region.items-imported-success')}
              </Text>
              <HStack w="full" px={4} borderBottom="1px solid">
                <Box fontWeight="bold" w="50px"></Box>
                {header.map((_, index) => (
                  <Box flex={index === 1 ? 2 : 1} fontWeight="black">
                    {index === 0 ? 'Code' : index === 1 ? 'Name' : 'Region-' + (index - 2)}
                  </Box>
                ))}
              </HStack>
              {response?.failItems?.map((row, index) => (
                <HStack w="full" bg={index % 2 ? '#f5f5f5' : '#ffffff'} px={4}>
                  <Box fontWeight="bold" w="50px">
                    {index + 1 + '.'}
                  </Box>
                  {row.map((item: string, itemIndex) => (
                    <Box flex={itemIndex === 1 ? 2 : 1}> {item}</Box>
                  ))}
                </HStack>
              ))}
            </VStack>
          </ModalBody>
        ) : (
          <ModalBody>
            {arrayData.length === 0 ? (
              <input type="file" accept=".csv" onChange={handleFileUpload} />
            ) : (
              <VStack w="full">
                <HStack w="full" px={4} borderBottom="1px solid">
                  <Box fontWeight="bold" w="50px"></Box>
                  {header.map((_, index) => (
                    <Box flex={index === 1 ? 2 : 1} fontWeight="black">
                      {'Region-' + index}
                    </Box>
                  ))}
                </HStack>
                {arrayData.map((row, index) => (
                  <HStack w="full" bg={index % 2 ? '#f5f5f5' : '#ffffff'} px={4}>
                    <Box fontWeight="bold" w="50px">
                      {index + 1 + '.'}
                    </Box>
                    {row.map((item: string, itemIndex) => (
                      <Box flex={itemIndex === 1 ? 2 : 1}> {item}</Box>
                    ))}
                  </HStack>
                ))}
              </VStack>
            )}
          </ModalBody>
        )}

        <ModalFooter>
          {!!arrayData.length && <Text mr="auto">{t('common.total_items') + arrayData.length}</Text>}

          {!isLoading && !response && (
            <>
              <Button variant="ghost" onClick={onCancel} isDisabled={isLoading}>
                {t('common.cancel')}
              </Button>
              <Button colorScheme="blue" mr={3} isDisabled={!arrayData.length} onClick={startImport}>
                {t('common.import')}
              </Button>
            </>
          )}

          {!!response && (
            <Button colorScheme="blue" mr={3} isDisabled={!arrayData.length} onClick={onFinish}>
              {t('common.finish')}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegionImportModal;
