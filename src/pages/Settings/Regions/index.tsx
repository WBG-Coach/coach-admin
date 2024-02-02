import { useCallback, useEffect, useState } from 'react';
import Icon from '@/components/Base/Icon';
import Loader from '@/components/Base/Loader';
import Menu from '@/components/Menu';
import { IRegion } from '@/types';
import {
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useTheme,
} from '@chakra-ui/react';
import RegionForm from './Form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import RegionService from '@/services/region';
import RegionImportModal from './RegionImportModal';

const Regions = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [importIsOpen, setImportIsOpen] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<IRegion>();
  const [regions, setRegions] = useState({
    isLoading: true,
    data: [] as IRegion[],
  });

  const refreshRegions = useCallback(async () => {
    const regions = await RegionService.getRegions();
    setRegions({ isLoading: false, data: regions });
  }, []);

  useEffect(() => {
    refreshRegions();
  }, [refreshRegions]);

  const handleSubmitRegion = async (region: IRegion) => {
    try {
      setRegions({ isLoading: true, data: [] });
      await RegionService.saveRegion(region);
    } catch (err) {
      toast.error('An error as ocurred on management of user');
    }

    handleClose();
    await refreshRegions();
  };

  const menuOptions = [
    {
      label: t('settings.tabs.region.edit'),
      handleClick: (region: IRegion) => {
        setFormIsOpen(true);
        setCurrentRegion(region);
      },
    },
  ];

  const handleClose = () => {
    setFormIsOpen(false);
    setCurrentRegion(undefined);
  };

  const deleteRegion = async () => {
    if (currentRegion?.id) {
      setRegions({
        isLoading: true,
        data: [] as IRegion[],
      });
      setDeleteIsOpen(false);
      await RegionService.deleteRegion(currentRegion.id);
      refreshRegions();
    }
  };

  return (
    <>
      <RegionForm
        isOpen={formIsOpen}
        handleClose={handleClose}
        regionId={currentRegion?.id}
        handleSubmitForm={handleSubmitRegion}
      />

      <VStack alignItems={'flex-start'} width={'454px'} pl={'24px'}>
        <Text fontWeight={600} fontSize={'20px'}>
          {t('settings.tabs.region.title')}
        </Text>

        {regions.isLoading ? (
          <Center minW={'400px'} h={'400px'}>
            <Loader />
          </Center>
        ) : (
          <>
            {regions.data.map((region) => (
              <HStack
                w={'100%'}
                py={'12px'}
                px={'16px'}
                key={region.id}
                borderColor={'Gray.$400'}
                borderBottom={'1px solid'}
                justifyContent={'space-between'}
              >
                <HStack>
                  <Center w={'40px'} h={'40px'} borderRadius={'50%'} background={'Blue.$200'}>
                    <Icon name={'user'} />
                  </Center>

                  <VStack justifyContent="center" gap={0} alignItems="flex-start">
                    <Text>{region.name}</Text>
                    <Text fontSize={'12px'}>
                      {t('settings.tabs.region.total_schools', { value: region.schoolsCount })}
                    </Text>
                  </VStack>
                </HStack>

                <Menu
                  items={[
                    ...menuOptions,
                    ...(!!region?.schoolsCount
                      ? []
                      : [
                          {
                            label: t('settings.tabs.region.delete'),
                            handleClick: (region: IRegion) => {
                              setDeleteIsOpen(true);
                              setCurrentRegion(region);
                            },
                          },
                        ]),
                  ]}
                  currentItem={region}
                />
              </HStack>
            ))}

            <HStack w="full">
              <Button
                px={'16px'}
                py={'12px'}
                cursor={'pointer'}
                onClick={() => setFormIsOpen(true)}
                variant="outline"
                leftIcon={<Icon name={'plus'} color={theme.colors.Primary['$200']} />}
              >
                <Text color={'Primary.$200'}>{t('settings.tabs.region.new')}</Text>
              </Button>
              <Button
                ml="auto"
                px={'16px'}
                py={'12px'}
                cursor={'pointer'}
                variant="solid"
                justifyContent="center"
                onClick={() => setImportIsOpen(true)}
                leftIcon={<Icon name={'file-alt-solid'} color={theme.colors.Primary['$200']} />}
              >
                <Text color={theme.colors.Primary['$200']}>{t('settings.tabs.region.import')}</Text>
              </Button>
            </HStack>
          </>
        )}
      </VStack>

      <Modal isOpen={!!deleteIsOpen} onClose={() => setDeleteIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this region?</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setDeleteIsOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={deleteRegion}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <RegionImportModal isOpen={importIsOpen} onClose={() => setImportIsOpen(false)} />
    </>
  );
};

export default Regions;
