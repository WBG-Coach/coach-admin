import Loader from "@/components/Base/Loader";
import SyncService from "@/services/sync";
import { ISync } from "@/types";
import { Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SyncList from "./SyncList";
import { useTranslation } from "react-i18next";
import HeaderPage from "@/components/HeaderPage";
import handleDownloadJSON from "@/common/download";

const SyncsPage: React.FC = () => {
  const { t } = useTranslation();
  const [syncs, setSyncs] = useState<ISync[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);

  useEffect(() => {
    loadSyncs();
  }, []);

  const loadSyncs = async () => {
    setIsLoadingList(true);
    const data = await SyncService.getSyncs();
    setSyncs(data);
    setIsLoadingList(false);
  };

  return (
    <Box p={4} minH="100vh" flex={1}>
      <HeaderPage
        title={t("Navbar.syncs")}
        subtitle={t("Navbar.data")}
        onClickDownload={() =>
          handleDownloadJSON(
            syncs,
            t("Navbar.syncs").toLowerCase().replaceAll(" ", "-")
          )
        }
      />
      {isLoadingList ? (
        <Center minW={"350px"} h={"200px"}>
          <Loader />
        </Center>
      ) : (
        <SyncList syncs={syncs} handleEdit={() => {}} handleDelete={() => {}} />
      )}
    </Box>
  );
};

export default SyncsPage;
