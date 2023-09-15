import {
  Button,
  Center,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import React from 'react';
import { Props } from './types';
import { QROpenApp, QRScan, QRSelectSchool } from '@/assets/images/qrcode';

const QRSteps = [
  {
    description: 'Open the app',
    src: QROpenApp,
  },
  {
    description: 'Scan the QR Code',
    src: QRScan,
  },
  {
    description: 'Select school, profile and start coaching',
    src: QRSelectSchool,
  },
];

const QRCodeModal: React.FC<Props> = ({ handleClose, school, schoolKey }) => {
  return (
    <Modal isOpen={!!school} onClose={handleClose} size={'full'}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Center my="16px">
            {school && schoolKey ? (
              <VStack>
                <Text fontSize={'24px'} mb={'18px'} fontWeight={600}>
                  Getting started with the app
                </Text>

                <HStack spacing={'24px'} alignItems={'flex-start'} mb={'64px'}>
                  {QRSteps.map((step, index) => (
                    <VStack spacing={0} key={index} maxW={'180px'}>
                      <Image src={step.src} alt={step.description} />
                      <Text fontSize={'TMD'} mt={'8px'} fontWeight={700}>
                        Step {index + 1}
                      </Text>
                      <Text textAlign={'center'} fontSize={'TSM'} mt={'4px'} fontWeight={400}>
                        {step.description}
                      </Text>
                    </VStack>
                  ))}
                </HStack>

                <QRCode size={350} value={JSON.stringify({ id: school.id, name: school.name, schoolKey })} />

                <Text fontSize={'TXL'} mt={'8px'} fontWeight={700}>
                  {school?.name}
                </Text>
              </VStack>
            ) : (
              <Center h={'100vh'} flex={1}>
                <Spinner />
              </Center>
            )}
          </Center>
        </ModalBody>

        {school && schoolKey && (
          <ModalFooter>
            <Center flex={1}>
              <HStack>
                <Button variant={'outline'} colorScheme="blue" w="3xs" onClick={window.print}>
                  Print this page
                </Button>
                <Button colorScheme="blue" w="3xs" onClick={handleClose}>
                  Close
                </Button>
              </HStack>
            </Center>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default QRCodeModal;
