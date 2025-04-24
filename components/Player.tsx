'use client';
import {ButtonGroup, Box, IconButton, Center, Flex, Text, Slider} from '@chakra-ui/react';
import ReactHowler from 'react-howler';
import {useEffect, useRef, useState} from 'react';
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md';
import {useStoreActions} from 'easy-peasy';
import {formatTime} from '@/lib/formatters';

const Player = ({songs, activeSong}: any) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(songs.findIndex((s: any) => s.id === activeSong.id));
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef: any = useRef(null);
  const repeatRef: any = useRef(repeat);
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  useEffect(() => {
    let timerId: any;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef?.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (value: boolean) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  const prevSong = () => {
    setIndex((state: number) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state: number) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return nextSong();
        }
        return next;
      }

      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e: any) => {
    setSeek(parseFloat(e[0]));
    soundRef?.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler playing={playing} src={activeSong?.url} ref={soundRef} onLoad={onLoad} onEnd={onEnd} />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="ghost"
            aria-label="shuffle"
            fontSize="24px"
            color={shuffle ? 'white' : 'gray.600'}
            onClick={onShuffle}>
            <MdShuffle />
          </IconButton>

          <IconButton outline="none" variant="ghost" aria-label="next" fontSize="24px" onClick={nextSong}>
            <MdSkipNext />
          </IconButton>
          {playing ? (
            <IconButton
              outline="none"
              variant="ghost"
              aria-label="pause"
              fontSize="40px"
              color="white"
              onClick={() => setPlayState(false)}>
              <MdOutlinePauseCircleFilled />
            </IconButton>
          ) : (
            <IconButton
              outline="none"
              variant="ghost"
              aria-label="play"
              fontSize="40px"
              color="white"
              onClick={() => setPlayState(true)}>
              <MdOutlinePlayCircleFilled />
            </IconButton>
          )}

          <IconButton outline="none" variant="ghost" aria-label="skip" fontSize="24px" onClick={prevSong}>
            <MdSkipPrevious />
          </IconButton>

          <IconButton
            outline="none"
            variant="ghost"
            aria-label="repeat"
            fontSize="24px"
            color={repeat ? 'white' : 'gray.600'}
            onClick={onRepeat}>
            <MdOutlineRepeat />
          </IconButton>
        </ButtonGroup>
      </Center>

      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
          <Box width="80%">
            <Slider.Root
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              id="player-range"
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              onChange={onSeek}
              value={[seek]}
              onValueChange={() => setIsSeeking(true)}
              onValueChangeEnd={() => setIsSeeking(false)}>
              <Slider.Control>
                <Slider.Track bg="gray.800">
                  <Slider.Range bg="whiteAlpha.600" />
                </Slider.Track>
                <Slider.Thumb index={0}>
                  <Slider.DraggingIndicator layerStyle="fill.solid" top={duration} rounded="sm" px="1.5">
                    <Slider.ValueText />
                  </Slider.DraggingIndicator>
                </Slider.Thumb>
              </Slider.Control>
            </Slider.Root>
          </Box>
          <Box width="10%" textAlign="left">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
