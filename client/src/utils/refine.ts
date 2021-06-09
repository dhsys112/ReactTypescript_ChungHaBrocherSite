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
  