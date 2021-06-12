import { AlbumIntroDataType } from "assets/data/types";

export const refineAlbumIntroInfo = (album: any) => {
    return {
      heading: album.albumName,
      paragraphOne: "",
      // paragraphOne: album.paragraphOne,
      paragraphTwo: "",
      // paragraphTwo: album.paragraphTwo,
      buttonLabel: `View ${album.albumName}`,
      image: album.albumImg,
      // reverse: album.id! % 2 ? true : false,
      reverse: true,
      delay: 100,
    };
  };

export const refineAlbumImgInfo = (album: any) => {
    return [
      {
        albumId: album.albumId,
        albumName: album.albumName,
        artistNm: album.artistNm,
        albumUrl: album.albumUrl,
        label: album.albumName,
        titleSong: album.titleSong,
        albumImg: album.albumImg,
        alt: album.albumName,
        albumOpenDate: new Date(album.albumOpenDate),
      },
    ];
  };

export const refineTwoAlbumsOne = (albums: Array<AlbumIntroDataType>) => {
  const twoAsOneArr = [];
  for (let i = 0; i < albums.length; i += 2) {
    twoAsOneArr.push(albums.slice(i, i + 2));
  }
  return twoAsOneArr;
};

export const refineSongData = (song: any) => {
  return {
    img: song.songImg,
    albumName: song.album,
    songTitle: song.songTitle,
    paragraph1: "",
    paragraph2: "",
  };
};

export const refineSongDatas = (songs:any) => songs.map((song: any) => refineSongData(song))

export const refineAlbumSongData = (song: any) => {
  return {
    img: song.songImg,
    albumName: song.album,
    songTitle: song.songTitle,
    paragraph1: "",
    paragraph2: "",
  };
};

export const refineAlbumSongDatas = (songs:any) => songs.map((song: any) => refineSongData(song))
