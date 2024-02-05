import { Center, HStack, IconButton, Input, Select, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import Icon from '../Base/Icon';
import './table.css';
import { ChangeEvent, useEffect, useState } from 'react';

type Column = {
  renderColumn: (item: any) => React.ReactNode;
  getOrderProp?: (item: any) => any;
  isNumber?: boolean;
  title: string;
  width?: string;
};

type Props = {
  data: any[];
  columns: Column[];
  filters?: { label: string; prop: string }[];
  topSession?: React.ReactNode;
};

const SIZE_OPTIONS = [5, 10, 15, 20];

const Table: React.FC<Props> = ({ columns, data, filters, topSession }) => {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const [filter, setFilter] = useState<any>({});
  const [filteredData, setFilteredData] = useState(data);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortedBy, setSortedBy] = useState({ title: '', getProp: (item: any) => item, order: '', isNumber: false });

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
            console.log(item[prop], filter[prop]);
            if (!(`${item[prop]}`.toLocaleUpperCase() as string).includes(filter[prop])) return false;
          }
          return true;
        }),
      );
    }
  }, [data, filter]);

  useEffect(() => {
    if (sortedBy.title && filteredData) {
      setPage(0);
      setFilteredData(
        filteredData.sort((a, b) => {
          const propA = sortedBy.getProp(a);
          const propB = sortedBy.getProp(b);
          if (sortedBy.order === 'ASC') {
            if (sortedBy.isNumber) return parseInt(propA) - parseInt(propB);
            return `${propA}`.localeCompare(`${propB}`);
          }
          if (sortedBy.isNumber) return parseInt(propB) - parseInt(propA);
          return `${propB}`.localeCompare(`${propA}`);
        }),
      );
    }
  }, [sortedBy, filteredData]);

  return (
    <VStack minW="100%" borderRadius="16px" overflow="hidden" border="1px solid #DCE0E5" gap={0}>
      {filters && (
        <HStack w="100%" minH={'40px'} mb="0" bg="#F2F4F7" p="16px">
          {filters.map((filter) => (
            <VStack key={filter.label} alignItems="start">
              <Text fontWeight={600}>{filter.label}</Text>
              <Input p="16px" bg="white" name={filter.prop} placeholder={filter.label} onChange={handleFilterValue} />
            </VStack>
          ))}
        </HStack>
      )}

      {topSession}

      <div style={{ display: 'block', overflowX: 'scroll', width: '100%' }}>
        <table className="ZebraStripedTable" style={{ whiteSpace: 'nowrap', width: '100%' }}>
          <thead style={{ background: '#F2F4F7' }}>
            <tr>
              {columns.map((column) => (
                <th key={'h_' + column?.title}>
                  <HStack w="full" justifyContent="space-between" p={3}>
                    <div>{t(column?.title)}</div>
                    {column.getOrderProp && (
                      <VStack gap={0} mr="8px">
                        <IconButton
                          mb={0}
                          size="xs"
                          aria-label="test"
                          bg={sortedBy.title === column.title && sortedBy.order === 'DESC' ? '#3373CC' : 'gray.200'}
                          icon={<Icon name="angle-up" size={16} color="#000" />}
                          onClick={() => {
                            if (column.getOrderProp && (sortedBy.title !== column.title || sortedBy.order !== 'DESC')) {
                              setSortedBy({
                                order: 'DESC',
                                getProp: column.getOrderProp,
                                title: column.title,
                                isNumber: !!column.isNumber,
                              });
                            }
                          }}
                        />

                        <IconButton
                          mt={0}
                          size="xs"
                          aria-label="test"
                          bg={sortedBy.title === column.title && sortedBy.order === 'ASC' ? '#3373CC' : 'gray.200'}
                          icon={<Icon name="angle-down" size={16} color="#000" />}
                          onClick={() => {
                            if (column.getOrderProp && (sortedBy.title !== column.title || sortedBy.order !== 'ASC')) {
                              setSortedBy({
                                order: 'ASC',
                                getProp: column.getOrderProp,
                                title: column.title,
                                isNumber: !!column.isNumber,
                              });
                            }
                          }}
                        />
                      </VStack>
                    )}
                  </HStack>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage).map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={index + column.title} style={{ padding: '12px' }}>
                    {column.renderColumn(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HStack p="16px" w="100%">
        <HStack w="120px"></HStack>
        <Center flex={1}>
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
            onPageChange={({ selected }) => {
              setPage(selected);
            }}
            pageCount={Math.ceil(filteredData.length / itemsPerPage)}
            pageClassName={'item pagination-page '}
            pageRangeDisplayed={1}
            previousClassName={'item previous'}
            previousLabel={<Icon name="angle-left" />}
          />
        </Center>
        <VStack w="120px">
          <Text fontSize="14px" fontWeight="semibold" mr="auto">
            {t('common.items-per-page')}
          </Text>
          <Select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            {SIZE_OPTIONS.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Table;
