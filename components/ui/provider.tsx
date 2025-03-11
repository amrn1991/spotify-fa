'use client';

import {ChakraProvider, defaultSystem, createSystem, defineConfig, defaultConfig} from '@chakra-ui/react';
import {ColorModeProvider, type ColorModeProviderProps} from './color-mode';

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        gray: {
          DEFAULT: {value: '#EE0F0F'},
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
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
