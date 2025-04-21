import NextImage from 'next/image';
import NextLink from 'next/link';
import {Box, List, Separator} from '@chakra-ui/react';
import {MdHome, MdLibraryMusic, MdSearch, MdPlaylistAdd, MdFavorite} from 'react-icons/md';
import {usePlaylist} from '../lib/hooks';

const navMenu = [
  {
    name: 'خانه',
    icon: <MdHome />,
    route: '/',
  },
  {
    name: 'جستجو',
    icon: <MdSearch />,
    route: '/search',
  },
  {
    name: 'آرشیو',
    icon: <MdLibraryMusic />,
    route: '/library',
  },
];

const musicMenu = [
  {
    name: 'ساخت پلی لیست',
    icon: <MdPlaylistAdd />,
    route: '/',
  },
  {
    name: 'اهنگ های محبوب',
    icon: <MdFavorite />,
    route: '/favorites',
  },
];

function Sidebar() {
  const {playlists} = usePlaylist();

  return (
    <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px">
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/icon.svg" alt="logo" height={40} width={40} />
        </Box>
        <Box marginBottom="20px">
          <List.Root spaceY={2}>
            {navMenu.map((menu) => (
              <List.Item paddingX="20px" fontSize="16px" key={menu.name}>
                <NextLink href={menu.route}>
                  <List.Indicator asChild marginLeft="20px">
                    {menu.icon}
                  </List.Indicator>
                  {menu.name}
                </NextLink>
              </List.Item>
            ))}
          </List.Root>
        </Box>
        <Box marginTop="20px">
          <List.Root spaceY={2}>
            {musicMenu.map((menu) => (
              <List.Item paddingX="20px" fontSize="16px" key={menu.name}>
                <NextLink href={menu.route}>
                  <List.Indicator asChild marginLeft="20px">
                    {menu.icon}
                  </List.Indicator>
                  {menu.name}
                </NextLink>
              </List.Item>
            ))}
          </List.Root>
        </Box>
        <Separator color="gray.800" />
        <Box height="66%" overflowY="auto" paddingY="20px">
          <List.Root spaceY={2}>
            {playlists.map((playlist: any) => (
              <List.Item paddingX="20px" key={playlist.id}>
                <NextLink href={`/playlist/${playlist.id}`}>{playlist.name}</NextLink>
              </List.Item>
            ))}
          </List.Root>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
