'use client';

import {ChakraProvider, createSystem, defaultConfig} from '@chakra-ui/react';
import {ColorModeProvider, type ColorModeProviderProps} from './color-mode';
import {store} from '@/lib/store';
import {StoreProvider} from 'easy-peasy';

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        gray: {
          DEFAULT: {value: '#e2e2e2'},
          100: {value: '#f5f5f5'},
          200: {value: '#eeeeee'},
          300: {value: '#e0e0e0'},
          400: {value: '#bdbdbd'},
          500: {value: '#9e9e9e'},
          600: {value: '#757575'},
          700: {value: '#616161'},
          800: {value: '#424242'},
          900: {value: '#212121'},
        },
      },
    },
  },
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <StoreProvider store={store}>
        <ColorModeProvider {...props} />
      </StoreProvider>
    </ChakraProvider>
  );
}
