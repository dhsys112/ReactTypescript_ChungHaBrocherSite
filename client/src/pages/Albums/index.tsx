import React, { useEffect, useState } from "react";
import AlbumContainer from "components/Albums/AlbumContainer";
import styled from "styled-components/macro";
import { AlbumIntroDataType } from "assets/data/types";
import { albumTypeDatas, albumYearDatas } from "assets/data/TempData";
import axios from "axios";
import { Col, Row } from "antd";
import Checkbox from "../../components/common/CheckBox/index";
import SearchBox from "../../components/common/SearchBox/index";

const makeTwoAlbumsOne = (albums: Array<AlbumIntroDataType>) => {
  const twoAsOneArr = [];
  for (let i = 0; i < albums.length; i += 2) {
    twoAsOneArr.push(albums.slice(i, i + 2));
  }
  return twoAsOneArr;
};

const refineAlbumIntoInfo = (album: any) => {
  return {
    id: album.albumId,
    order: 1,
    albumName: album.albumName,
    artistNm: album.artistNm,
    titleSong: album.titleSong,
    albumImg: album.albumImg,
    albumOpenDate: album.albumOpenDate,
  };
};

interface Filters {
  // types: Array<any>;
  // years: Array<any>;
  [property: string]: Array<any>;
}

const Albums = () => {
  const [twoAlbumsAtOne, setTwoAlbumsAtOne] = useState<any>();
  // DB에서 가져온 정보( ex. Imgs ) 를 State 에 가져온다
  const [Albums, setAlbums] = useState<any>([]);
  // Skip : 더보기 할 때마다, skip에 대해 지금까지 불러온 애들 수를 저장.( 축적 )
  const [Skip, setSkip] = useState(0);
  // 더보기 클릭시, 최대 8개까지만 가져오기
  const [Limit, setLimit] = useState(4);
  // 더이상 정보가 없을 때, 더보기 버튼이 안보이도록
  const [PostSize, setPostSize] = useState(0);
  // 체크리스트에서 체크된 리스트 들 ex. 대륙, 가격 등 ( 해당 data들의 _id )
  let [Filters, setFilters] = useState<Filters>({
    types: [],
    years: [],
  });
  // Search내용
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getAlbums(body);

    // axios.post("/api/album/albums").then((res) => {
    //   const albumLists: Array<AlbumIntroDataType> = res.data.albums.map(
    //     (album: any) => refineAlbumIntoInfo(album)
    //   );
    //   setTwoAlbumsAtOne(makeTwoAlbumsOne(albumLists));
    // });
  }, []);

  const refineAlbums = (albums: any) => {
    const albumLists: Array<AlbumIntroDataType> = albums.map((album: any) =>
      refineAlbumIntoInfo(album)
    );
    // 처음 로드시 :
    if (!twoAlbumsAtOne) {
      setTwoAlbumsAtOne(makeTwoAlbumsOne(albumLists));
      // 그외 :
    } else {
      setTwoAlbumsAtOne([...twoAlbumsAtOne, ...makeTwoAlbumsOne(albumLists)]);
    }
  };

  const getAlbums = (body: any) => {
    axios.post("/api/album/albums", body).then((res) => {
      if (res.data.success) {
        if (body.loadMore === true) {
          // 더보기
          setAlbums([...Albums, ...res.data.albumInfo]);
        } else {
          setAlbums([...res.data.albumInfo]);
        }
        refineAlbums(res.data.albumInfo);
        setPostSize(res.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패했습니다");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit, // Limit은 8로 같다
      loadMore: true, // 더보기 버튼을 눌렀을 때 보내는 정보라는 것을 알려주는 것
    };
    getAlbums(body);
    // Product를 불러온 후, skip에 대한 변경값을 state에 반영해야
    setSkip(skip);
  };

  // 앨범들을 뿌려주는 helper 함수
  // const renderCards = Albums.map( (product, index) =>{})

  const showFilteredResults = (filters: any) => {
    let body = {
      skip: 0, // 체크된 애들만 새로 처음부터 가져오는 거니까 0으로 세팅
      limit: Limit, // Limit은 8로 같다
      filters: filters,
    };
    getAlbums(body);
    setSkip(0);
  };
  const handletypes = (value: any) => {
    const data = value; // types;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array; // ex. [280, 299]
      }
    }
    return array;
  };

  const handleFilters = (filters: any, category: string) => {
    // filters는 CheckBox 자식 component에서 props를 통해 넘겨주는, 체크된 애들의 목록 및 정보( id )
    const newFilters = { ...Filters };
    // CheckBox.js에서 새로운 check된 항목들을 여기에 가져오는 것이다
    newFilters[category] = filters;
    // if (category == "price") {
    //   // category가 price일 때는
    //   // filters에 숫자들이 들어있을 것이다
    //   // ex. "Any" 가 선택되면 0 이 들어있다
    //   let priceValues = handlePrice(filters);
    //   // priceValues는 handlePrice를 통해 return 된 array값이 들어갈 것이다
    //   // newFilters의 price 항목에 대해 priceValues 라는 값과 관련된 항목을 넣어주는 것이다
    //   newFilters[category] = priceValues; // newFilters["price"] 이렇게 될 것이다
    // }
    showFilteredResults(newFilters);
    // 우리가 새롭게 바꾼 filter 내용을 state에 반영
    // 이렇게 해야, price, continent 2개 checkbox 내용이 동시 반영
    setFilters(newFilters);
  };

  // Search Function
  const updateSearchTerm = (newSearchTerm: string) => {
    let body = {
      skip: 0, // DB에서 처음부터 가져오기
      filter: Filters, // 위의 state에 있는 filter로 ( 즉, 대륙, types에 대한 조건이 입력되어있을 텐데 ,이러한 조건들에 합하여 검색 단어까지 조합하기 )
      limit: Limit,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    // Search 라는 자식 component로부터
    // 검색을 하는 단어의 내용을 가져온다
    // newSearchTerm이 바로, 자식 component에서 올려준 내용이다
    setSearchTerm(newSearchTerm);

    // Search 단어에 따른 새로운 product를 가져와준다
    getAlbums(body);
  };

  return (
    <>
      <Section>
        <Container>
          <Heading>
            <h1
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-anchor-placement="center bottom"
            >
              View Albums
            </h1>
          </Heading>
          {/* Filter */}
          {/* years와 types Checkbox가 반반씩 차지하도록 */}
          <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
              {/* CheckBox */}
              {/* Data.js에 있는 대륙 정보들을 list = {years} 로 넘겨준다  */}
              {/* CheckBox에서 체크된 애들의 list도 부모 component로 가져와야 하고 handleFilters를 통해 실시한다 
                    "years라고 해준 이유는, 2개 checkbox중에서 대륙에 해당하는 checkbox를 넘겨준 것이다 */}
              <Checkbox
                type={"year"}
                list={albumYearDatas}
                handleFilters={(filters: string[]) =>
                  handleFilters(filters, "years")
                }
              />
            </Col>

            <Col lg={12} xs={24}>
              {/* CheckBox */}
              <Checkbox
                type={"type"}
                list={albumTypeDatas}
                handleFilters={(filters: string[]) =>
                  handleFilters(filters, "years")
                }
              />
            </Col>
          </Row>

          {/* Search */}
          <SearchBoxContainer>
            <SearchBox refreshFunction={updateSearchTerm} />
          </SearchBoxContainer>
          {twoAlbumsAtOne &&
            twoAlbumsAtOne.map(
              (AlbumIntroData: Array<AlbumIntroDataType>, idx: number) => {
                return <AlbumContainer key={idx} datas={AlbumIntroData} />;
              }
            )}
        </Container>
        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* button을 클릭하면 loadMoreHandler이라는 함수를 실행한다 */}
            <button onClick={loadMoreHandler}>더보기</button>
          </div>
        )}
      </Section>
    </>
  );
};

export default Albums;

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 10rem calc((100vw - 1300px) / 2);
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem 1rem;
`;

const Heading = styled.div`
  font-size: 1.5rem;
  padding: 2rem 1rem;
  margin-bottom: 40px;
  @media screen and (max-width: 768px) {
    text-align: start;
  }
`;

const SearchBoxContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem auto;
`;
