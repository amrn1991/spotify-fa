import GradientLayout from '@/components/GradientLayout';
import SongsTable from '@/components/SongsTable';
import {getPlaylist} from '@/lib/actions';

const getBGColor = (id: number) => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'gray', 'teal', 'yellow'];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = async ({params}: {params: Promise<{id: number}>}) => {
  const {id} = await params;
  const playlist: any = await getPlaylist(id);
  const color = getBGColor(id);

  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="پلی لیست"
      description={`${playlist.songs.length} آهنگ`}
      image={`https://picsum.photos/400?random=${playlist.id}`}>
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export default Playlist;
