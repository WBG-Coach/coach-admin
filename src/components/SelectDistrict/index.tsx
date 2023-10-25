import { ROLES } from '@/common/user';
import SchoolService from '@/services/school';
import { Select, SelectProps, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type Props = {
  region?: string;
  role?: string;
} & SelectProps;

const SelectDistrict: React.FC<Props> = ({ role, region, ...field }) => {
  const [districts, setDistricts] = useState({ isLoading: false, data: [] as string[] });

  console.log({ region });

  useEffect(() => {
    if (region) {
      setDistricts({ isLoading: true, data: [] });
      SchoolService.findAllDistrictsByRegion(region).then((data) => {
        setDistricts({ isLoading: false, data });
      });
    } else {
      setDistricts({ isLoading: false, data: [] });
    }
  }, [region, role]);

  if (districts.isLoading) return <Spinner />;

  return (
    <Select id={'district'} {...field}>
      {districts.data.map((district) => (
        <option key={district} value={district}>
          {district}
        </option>
      ))}
    </Select>
  );
};

export default SelectDistrict;
