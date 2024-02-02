import React, { useState } from 'react';
import { DateRangePicker, Range, RangeKeyDict, defaultStaticRanges } from 'react-date-range';
import {
  Input,
  Box,
  useOutsideClick,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

interface State {
  selection: Range;
}
const nepaliDefinedRangeLabels: any = {
  Today: 'आज',
  Yesterday: 'हिजो',
  'Last 7 Days': 'पछिल्लो ७ दिनहरू',
  'Last 30 Days': 'पछिल्लो ३० दिनहरू',
  'This Week': 'यो हप्ता',
  'Last Week': 'गत हप्ता',
  'This Month': 'यो महिना',
  'Last Month': 'गत महिना',
  'Custom Range': 'अनुकूलित अवधि',
};

const nepaliLocale: Locale = {
  code: 'ne',
  formatDistance: (...args) => args.join(' '),
  formatRelative: (...args) => args.join(' '),
  localize: {
    ordinalNumber: (n, _options) => {
      return `${n}º`;
    },
    era: (n, _options) => {
      return n === 1 ? 'AD' : 'BC';
    },
    quarter: (n, _options) => {
      return `Q${n}`;
    },
    month: (n, _options) =>
      [
        'जनवरी',
        'फेब्रुअरी',
        'मार्च',
        'अप्रिल',
        'मे',
        'जून',
        'जुलाई',
        'अगस्ट',
        'सेप्टेम्बर',
        'अक्टोबर',
        'नोभेम्बर',
        'डिसेम्बर',
      ][n],
    day: (n, _options) => ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'][n],
    dayPeriod: (n, _options) => {
      return n < 12 ? 'AM' : 'PM';
    },
  },
  formatLong: {
    date: () => '...',
    time: () => '...',
    dateTime: () => '...',
  },
};

type Props = {
  onChange: (range?: Range) => void;
};

const DataRangePicker: React.FC<Props> = ({ onChange }) => {
  const { t, i18n } = useTranslation();

  const [state, setState] = useState<State>({
    selection: {
      startDate: undefined,
      endDate: undefined,
      key: 'selection',
    },
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = React.useRef(null);

  const handleSelect = (ranges?: RangeKeyDict) => {
    if (!ranges) {
      setState({
        selection: {
          startDate: undefined,
          endDate: undefined,
          key: 'selection',
        },
      });
      onChange();
    } else {
      setState({
        selection: {
          ...ranges.selection,
        },
      });

      if (ranges.selection.startDate !== ranges.selection.endDate) {
        onChange(ranges.selection);
        setIsCalendarOpen(false);
      }
    }
  };

  const displayDates = () => {
    const range = state.selection;
    if (!range.endDate || !range.startDate) return '';
    return `${format(range.startDate, 'yyyy-MM-dd')} - ${format(range.endDate, 'yyyy-MM-dd')}`;
  };

  useOutsideClick({
    ref: calendarRef,
    handler: () => {
      onChange(state.selection);
      setIsCalendarOpen(false);
    },
  });

  return (
    <FormControl ref={calendarRef} position="relative">
      <FormLabel fontWeight="bold">{t('dashboard.filters.data-range')}</FormLabel>
      <InputGroup>
        <Input
          readOnly
          value={displayDates()}
          onFocus={() => setIsCalendarOpen(true)}
          placeholder={t('dashboard.filters.data-range-placeholder') || ''}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => handleSelect()}>
            {t('common.clean')}
          </Button>
        </InputRightElement>
      </InputGroup>
      {isCalendarOpen && (
        <Box position="absolute" zIndex="2" top="80px" right={0} shadow="base">
          <DateRangePicker
            showDateDisplay={false}
            renderStaticRangeLabel={(staticRange) => {
              return (
                (i18n.language === 'np' && staticRange.label && nepaliDefinedRangeLabels[staticRange.label]) ||
                staticRange.label
              );
            }}
            locale={i18n.language === 'np' ? nepaliLocale : undefined}
            onChange={handleSelect}
            ranges={[state.selection]}
            rangeColors={['#3d91ff']}
            staticRanges={defaultStaticRanges.map((item) => ({ ...item, hasCustomRendering: true }))}
          />
        </Box>
      )}
    </FormControl>
  );
};

export default DataRangePicker;
