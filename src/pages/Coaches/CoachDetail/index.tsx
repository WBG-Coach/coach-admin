import { ICoach } from '@/types';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  VStack,
  Text,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  coach?: ICoach;
  onClose: () => void;
};

const CoachDetail: React.FC<Props> = ({ isOpen, coach, onClose }) => {
  const { t } = useTranslation();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent roundedLeft={14}>
        <DrawerCloseButton mt={2} color="Primary.$200" />

        <DrawerHeader>{t('coaches.detail-title')}</DrawerHeader>

        <DrawerBody>
          <VStack w="full" alignItems="start">
            <Divider mb="12px" />

            <Text>{`${coach?.name} ${coach?.surname}`}</Text>
            <Text>{`${coach?.email || '-'}`}</Text>

            <Divider mt="12px" />

            <HStack w="full" bg="#eee" p={'8px'}>
              <Text fontWeight="bold" flex={1}>
                {t('coaches.school')}
              </Text>
              <Text fontWeight="bold" flex={1}>
                {t('coaches.teacher')}
              </Text>
              <Text fontWeight="bold" flex={1}>
                {t('coaches.session-date')}
              </Text>
            </HStack>

            {coach?.sessions?.map((session, index) => (
              <HStack key={session.id} w="full" px="8px" py="4px" bg={index % 2 ? '#f5f5f5' : '#fff'}>
                <Text flex={1}>{session.school.name}</Text>
                <Text flex={1}>{session.teacher.name}</Text>
                <Text flex={1}>{new Date(session.created_at || '').toLocaleDateString()}</Text>
              </HStack>
            ))}
          </VStack>
        </DrawerBody>

        <DrawerFooter mt="auto">
          <Button variant="outline" mr={'auto'} onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CoachDetail;
