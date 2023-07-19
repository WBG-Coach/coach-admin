import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

type Column = {
  renderColumn: (item: any) => React.ReactNode;
  title: string;
  width?: string;
};

type Props = {
  data: any[];
  columns: Column[];
};

const Table: React.FC<Props> = ({ columns, data }) => {
  const { t } = useTranslation();

  return (
    <VStack
      w="100%"
      borderRadius="16px"
      overflow="hidden"
      border="1px solid #DCE0E5"
    >
      <HStack w="100%" minH={"40px"} mb="0" bg="#F2F4F7"></HStack>

      <VStack
        w="100%"
        mt="0px !important"
        borderTop="1px solid #C7CBD1"
        borderBottom="1px solid #C7CBD1"
      >
        <HStack mt="0" w="100%" bg="#F2F4F7">
          {columns.map((column) => (
            <Box
              mt="0"
              px="12px"
              py="16px"
              fontWeight={700}
              fontSize={"16px"}
              {...(column?.width ? { width: column.width } : { flex: 1 })}
            >
              {t(column.title)}
            </Box>
          ))}
        </HStack>
        <VStack w="100%">
          {data.map((item) => (
            <HStack w="100%">
              {columns.map((column) => (
                <Box
                  px="12px"
                  py="32px"
                  fontWeight={400}
                  fontSize={"16px"}
                  {...(column?.width ? { width: column.width } : { flex: 1 })}
                >
                  {column.renderColumn(item)}
                </Box>
              ))}
            </HStack>
          ))}
        </VStack>
      </VStack>
      <HStack w="100%" px="16px" py="32px">
        <ReactPaginate
          nextLabel=">"
          onPageChange={() => {}}
          pageRangeDisplayed={5}
          pageCount={1}
          initialPage={1}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </HStack>
    </VStack>
  );
};

export default Table;
