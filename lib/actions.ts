'use server';

import prisma from "./prisma";

export const getArtists = async () => {
  const artists = await prisma.artist.findMany({});

  return artists;
};