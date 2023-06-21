import Loader from "@/components/Base/Loader";
import SyncService from "@/services/sync";
import { ISync } from "@/types";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SyncList from "./SyncList";

const SyncsPage: React.FC = () => {
  const [newSync, setNewSync] = useState(false);
  const [syncs, setSyncs] = useState<ISync[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [syncToEdit, setSyncToEdit] = useState<ISync>();
  const [syncToDelete, setSyncToDelete] = useState<ISync>();

  useEffect(() => {
    loadSyncs();
  }, []);

  const loadSyncs = async () => {
    setIsLoadingList(true);
    const data = await SyncService.getSyncs();
    setSyncs(data);
    setIsLoadingList(false);
  };

  const closeForm = () => {
    setNewSync(false);
    setSyncToEdit(undefined);
  };

  const saveSync = async (sync: Partial<ISync>) => {
    setIsLoadingForm(true);
    if (syncToEdit) {
      await SyncService.updateSync({ ...syncToEdit, ...sync });
    } else {
      await SyncService.saveSync(sync);
    }
    setIsLoadingForm(false);
    loadSyncs();
    closeForm();
  };

  const deleteSync = async () => {
    setIsLoadingDelete(true);
    if (syncToDelete) await SyncService.DeleteSync(syncToDelete?.id);
    setIsLoadingDelete(false);
    onCloseDeleteModal();
    loadSyncs();
  };

  const onCloseDeleteModal = () => {
    setSyncToDelete(undefined);
  };

  return (
    <Box p={4} minH="100vh" flex={1}>
      <Flex
        pb={4}
        mb={6}
        w="full"
        alignItems="center"
        borderBottom="1px solid"
        justifyContent="space-between"
      >
        <Heading>Syncs</Heading>
        {/* <Button onClick={() => setNewSync(true)}>New sync</Button> */}
      </Flex>
      {isLoadingList ? (
        <Center minW={"350px"} h={"200px"}>
          <Loader />
        </Center>
      ) : (
        <SyncList
          syncs={syncs}
          handleEdit={setSyncToEdit}
          handleDelete={setSyncToDelete}
        />
      )}
      <Modal isOpen={!!syncToDelete} onClose={onCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this school?</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCloseDeleteModal}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={deleteSync}
              isLoading={isLoadingDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SyncsPage;
