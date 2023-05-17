import { Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import AuthService from "@/services/auth";

const DashboardPage: React.FC = () => {
  useEffect(() => {
    embedDashboard({
      id: "e2379a55-6999-4150-8cc0-933c13b584ff",
      supersetDomain: import.meta.env.VITE_SUPERSET_DOMAIN,
      mountPoint: document.getElementById("superset-container") as HTMLElement,
      fetchGuestToken: async () => {
        const token = (await AuthService.getGuestToken()).data;
        console.log({ token });
        return token;
      },
    });
  }, []);

  return (
    <Center flex={1}>
      <div
        id={"superset-container"}
        style={{
          width: "calc(100vw - 220px)",
          height: "100vh",
          backgroundColor: "#F5F5F5",
        }}
      />
    </Center>
  );
};

export default DashboardPage;
