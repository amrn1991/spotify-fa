"use client"
import {Box} from '@chakra-ui/react';
import {ReactNode} from 'react';
import Sidebar from './Sidebar';

function PlayerLayout({children}: {children: ReactNode}) {
  return (
    <Box height="100vh">
      <Box position="absolute" top="0" bottom="0" right="0" width="250px">
        <Sidebar />
      </Box>
      <Box marginRight="250px" marginBottom="100px">{children}</Box>
      <Box position="absolute" height="100px" bottom="0" right="0" left="0" background="gray.900">پخش</Box>
    </Box>
  );
}

export default PlayerLayout;
