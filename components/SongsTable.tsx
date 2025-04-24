'use client'
import {Box, Table, IconButton} from '@chakra-ui/react';
import {BsFillPlayFill} from 'react-icons/bs';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {useStoreActions} from 'easy-peasy';
import {formatDate, formatTime} from '@/lib/formatters';

const SongsTable = ({songs}: any) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const handlePlay = (activeSong?: any) => {
      setActiveSong(activeSong || songs[0]);
      playSongs(songs);
  };

  return (
    <Box bg="transparent" >
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px">
          <IconButton aria-label="play" colorScheme="green" size="lg" rounded="full" onMouseDown={() => handlePlay()}>
            <BsFillPlayFill fontSize="30px" />
          </IconButton>
        </Box>
        <Table.Root>
          <Table.Header borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Table.Row>
              <Table.ColumnHeader>#</Table.ColumnHeader>
              <Table.ColumnHeader>عنوان</Table.ColumnHeader>
              <Table.ColumnHeader>تاریخ اپلود</Table.ColumnHeader>
              <Table.ColumnHeader>
                <AiOutlineClockCircle />
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {songs.map((song: any, i: number) => (
              <Table.Row
                css={{
                  transition: 'all .3s ',
                  '&:hover': {
                    bg: 'rgba(255,255,255, 0.1)',
                  },
                }}
                key={song.id}
                cursor="pointer"
                onMouseDown={() => handlePlay(song)}
                >
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{song.name}</Table.Cell>
                <Table.Cell>{formatDate(song.createdAt)}</Table.Cell>
                <Table.Cell>{formatTime(song.duration)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default SongsTable;
