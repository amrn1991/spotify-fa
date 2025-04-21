'use server';

import { cookies } from "next/headers";
import { validateToken } from "./auth";
import prisma from "./prisma";

export const getArtists = async () => {
  const artists = await prisma.artist.findMany({});

  return artists;
};

export const getPlaylist = async (playlistId: any) => {
  let user: any;

  try {
    const { value }: any = (await cookies()).get('FAR_ACCESS_TOKEN')
    user = validateToken(value);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +playlistId,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return playlist;
};