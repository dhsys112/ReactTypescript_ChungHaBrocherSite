import { useEffect, useState, useCallback } from "react";
import { ImageDataType } from "assets/data/types";
import Axios from "axios";

export default function GetPictureData(pictureNum: number) {
  const [loading, setLoading] = useState(true);
  const [pictureDatas, setPictureDatas] = useState<Array<any>>([]);
  const [pictures, setPictures] = useState<Array<ImageDataType>>([]);
  const [curPictNum, setCurPictNum] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const PictureDatasLength = pictureDatas.length;

  const getPictsFromDB = useCallback(
    async function () {
      const datas: Array<any> = await Axios.post("/api/album/images").then(
        (res) => res.data.imgDatas
      );
      const pictDatas = datas.slice();
      // shuffle Array
      for (let i = pictDatas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pictDatas[i], pictDatas[j]] = [pictDatas[j], pictDatas[i]];
      }
      setPictureDatas(pictDatas);
    },
    [setPictureDatas]
  ); // 변하지 않게 해주려고, setLoading 이라는 다소 관계없는 함수 넣었다

  // 사진 정보 db에서 가져오기
  useEffect(() => {
    getPictsFromDB();
  }, [getPictsFromDB]);

  // Intersection observer
  useEffect(() => {
    // 위의 useEffect 함수를 통해 pictureData가 불러와지면 해당 함수를 실행한다
    // 최대 이미지 숫자 개수를 넘어가지 않도록 한다
    pictureNum =
      pictureNum > PictureDatasLength ? PictureDatasLength : pictureNum;

    // setLoading(true)
    setPictures((prevPicts) => {
      return [...prevPicts, ...pictureDatas.slice(curPictNum, pictureNum)];
    });

    setHasMore(pictureDatas.slice(curPictNum, pictureNum).length > 0);
    setCurPictNum(pictureNum);
    // setLoading(false)
  }, [pictureNum, pictureDatas]);

  return { loading, pictures, hasMore };
}
