import {Box} from '@chakra-ui/react';
import NextImage from "next/image"

function Sidebar() {
  return (
    <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px" color="gray">
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" alt="logo" height={60} width={120} />
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
