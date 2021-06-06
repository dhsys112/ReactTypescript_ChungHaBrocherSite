import React, { useState, useEffect } from "react";
import Features from "components/common/Features";
import { SongType } from "assets/data/types";
import Axios from "axios";

const refineSongData = (song: any) => {
  return {
    img: song.songImg,
    albumName: song.album,
    songTitle: song.songTitle,
    paragraph1: "",
    paragraph2: "",
  };
};

const About = () => {
  const [totalSongs, setTotalSongs] = useState<Array<SongType>>();
  useEffect(() => {
    Axios.post("api/song/songs", {}).then((res) => {
      console.log("res", res);
      setTotalSongs(res.data.songs.map((song: any) => refineSongData(song)));
    });
  }, [setTotalSongs]);

  return (
    <>
      {totalSongs &&
        totalSongs.map((song, idx) => {
          return (
            <Features
              key={idx}
              IsOdd={idx % 2 == 0}
              routeIdx={idx}
              img={song.img}
              album={song.albumName}
              song={song.songTitle}
              paragraph1={song.paragraph1}
              paragraph2={song.paragraph2}
            />
          );
        })}
    </>
  );
};

export default About;
