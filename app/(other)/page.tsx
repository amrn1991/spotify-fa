import GradientLayout from '@/components/GradientLayout';
import {Box, Text, Flex, Image} from '@chakra-ui/react';
import {getArtists} from '@/lib/actions';
import { validateRoute } from '@/lib/auth';

export default async function Home() {
  const artists = await getArtists();
  const user: any = await validateRoute();

  if(!user) return null;
  return (
    <GradientLayout
      roundImage
      color="gray"
      subtitle="پروفایل"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} پلی لیست`}
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0">
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            برترین آرتیست ها
          </Text>
          <Text fontSize="md">فقط برای شما</Text>
        </Box>
        <Flex>
          {artists?.map((artist, index) => (
            <Box paddingX="10px" width="20%" key={index}>
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image src="https://picsum.photos/300/300" borderRadius="100%" />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">خواننده</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
}
