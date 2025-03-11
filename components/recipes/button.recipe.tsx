import {defineRecipe} from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  variants: {
    link: {
      ':focus': {
        outline: 'none',
        boxShadow: 'none',
      },
    },
  },
});
