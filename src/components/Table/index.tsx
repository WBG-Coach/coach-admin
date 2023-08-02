import { Box, Center, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import Icon from '../Base/Icon';
import './table.css';
import { ChangeEvent, useEffect, useState } from 'react';

type Column = {
  renderColumn: (item: any) => React.ReactNode;
  title: string;
  width?: string;
};

type Props = {
  data: any[];
  columns: Column[];
  itemsPerPage?: number;
  filters?: { label: string; prop: string }[];
};

const Table: React.FC<Props> = ({ columns, data, filters, itemsPerPage }) => {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const [filter, setFilter] = useState<any>({});
  const [filteredData, setFilteredData] = useState(data);
  const PAGE_SIZE = itemsPerPage || 5;

  const handleFilterValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value.toUpperCase() });
  };

  useEffect(() => {
    const props = Object.keys(filter);
    if (props.length > 0) {
      setPage(0);
      setFilteredData(
        data.filter((item) => {
          for (let index = 0; index < props.length; index++) {
            const prop = props[index];
            if (!(item[prop] as string).includes(filter[prop])) return false;
          }
          return true;
        }),
      );
    }
  }, [data, filter]);

  return (
    <VStack w="100%" borderRadius="16px" overflow="hidden" border="1px solid #DCE0E5">
      {filters && (
        <HStack w="100%" minH={'40px'} mb="0" bg="#F2F4F7" p="16px">
          {filters.map((filter) => (
            <VStack alignItems="start">
              <Text fontWeight={600}>{filter.label}</Text>
              <Input p="16px" bg="white" name={filter.prop} placeholder={filter.label} onChange={handleFilterValue} />
            </VStack>
          ))}
        </HStack>
      )}

      <VStack
        w="100%"
        mt="0px !important"
        borderTop={filters ? '1px solid #C7CBD1' : undefined}
        borderBottom="1px solid #C7CBD1"
      >
        <HStack mt="0" w="100%" bg="#F2F4F7">
          {columns.map((column) => (
            <Box
              mt="0"
              px="12px"
              py="16px"
              fontWeight={700}
              fontSize={'16px'}
              {...(column?.width ? { width: column.width } : { flex: 1 })}
            >
              {t(column?.title)}
            </Box>
          ))}
        </HStack>
        <VStack w="100%">
          {filteredData.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE).map((item) => (
            <HStack w="100%">
              {columns.map((column) => (
                <Box
                  px="12px"
                  py="16px"
                  fontWeight={400}
                  fontSize={'16px'}
                  {...(column?.width ? { width: column.width } : { flex: 1 })}
                >
                  {column.renderColumn(item)}
                </Box>
              ))}
            </HStack>
          ))}
        </VStack>
      </VStack>
      <Center flex={1} p="16px">
        <ReactPaginate
          forcePage={page}
          activeClassName={'item active '}
          breakClassName={'item break-me '}
          breakLabel={'...'}
          containerClassName={'pagination'}
          disabledClassName={'disabled-page'}
          marginPagesDisplayed={2}
          nextClassName={'item next '}
          nextLabel={<Icon name="angle-right" />}
          onPageChange={({ selected }) => setPage(selected)}
          pageCount={filteredData.length / PAGE_SIZE}
          pageClassName={'item pagination-page '}
          pageRangeDisplayed={1}
          previousClassName={'item previous'}
          previousLabel={<Icon name="angle-left" />}
        />
      </Center>
    </VStack>
  );
};

export default Table;
