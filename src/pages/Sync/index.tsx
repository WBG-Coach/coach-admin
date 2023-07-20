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
import { useTranslation } from "react-i18next";
import HeaderPage from "@/components/HeaderPage";

const SyncsPage: React.FC = () => {
  const { t } = useTranslation();
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
      {" "}
      <HeaderPage title={t("Navbar.syncs")} subtitle={t("Navbar.data")} />
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
    </Box>
  );
};

export default SyncsPage;
