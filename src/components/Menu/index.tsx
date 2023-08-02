import React, { useRef, useState } from 'react';
import { Props } from './types';
import { Center, Text, VStack, useOutsideClick, useTheme } from '@chakra-ui/react';
import Icon from '../Base/Icon';

const Menu: React.FC<Props<any>> = ({ items, currentItem }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef<any>();

  useOutsideClick({
    ref: menuRef,
    handler: () => setMenuIsOpen(false),
  });

  return (
    <Center
      ref={menuRef}
      onClick={() => setMenuIsOpen(true)}
      borderRadius={'8px'}
      border={'1px solid'}
      borderColor={'Gray.$500'}
      background={menuIsOpen ? 'Primary.$300' : 'white'}
      transition={'all 300ms'}
      position={'relative'}
      cursor={'pointer'}
      width={'40px'}
      h={'40px'}
    >
      <Icon name={'ellipsis-v'} color={menuIsOpen ? 'white' : 'black'} />

      {menuIsOpen && (
        <VStack
          top={'44px'}
          right={0}
          boxShadow={'0px 0px 10.040825843811035px 0px rgba(0, 0, 0, 0.10);'}
          borderRadius={'12px'}
          position={'absolute'}
          background={'white'}
          w={'160px'}
          alignItems={'flex-start'}
        >
          {items.map((item, key) => (
            <Text
              key={key}
              p={'12px'}
              w={'100%'}
              transition={'all 300ms'}
              onClick={() => item.handleClick(currentItem)}
              {...(item.color && { color: item.color })}
              _hover={{
                background: 'Gray.$300',
              }}
            >
              {item.label}
            </Text>
          ))}
        </VStack>
      )}
    </Center>
  );
};

export default Menu;
