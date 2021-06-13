import React, { useState, useEffect, useCallback } from "react";
import Features from "components/common/Features";
import { SongType } from "assets/data/types";
import axios from "axios";
import { refineSongDatas } from "utils/refine";
import { songYearDatas } from "assets/data/TempData";
import { Col, Row } from "antd";
import Checkbox from "components/common/CheckBox/index";
import SearchBox from "components/common/SearchBox/index";
import {
  Section,
  Container,
  Heading,
  SearchBoxContainer,
  BtnContainer,
} from "pages/Albums/index";
interface Filters {
  [property: string]: Array<any>;
}

const HitSongs = () => {
  const [Songs, setSongs] = useState<Array<SongType>>();
  // Skip : 더보기 할 때마다, skip에 대해 지금까지 불러온 애들 수를 저장.( 축적 )
  const [Skip, setSkip] = useState(0);
  // 더보기 클릭시, 최대 8개까지만 가져오기
  const [Limit, setLimit] = useState(4);
  // 더이상 정보가 없을 때, 더보기 버튼이 안보이도록
  const [PostSize, setPostSize] = useState(0);
  // 체크리스트에서 체크된 리스트 들 ex. 대륙, 가격 등 ( 해당 data들의 _id )
  const [Filters, setFilters] = useState<Filters>({
    songYear: [],
  });
  // Search내용
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getSongs(body);
    // axios.post("api/song/songs", {}).then((res) => {
    //   console.log("res", res);
    //   setSongs(refineSongDatas(res.data.songs));
    // });
  }, [setSongs]);
  const getSongs = (body: any) => {
    axios.post("/api/song/songs", body).then((res) => {
      if (res.data.success) {
        if (body.loadMore === true) {
          console.log("songInfos", res.data.songInfos);
          // 더보기
          setSongs([...Songs!, ...refineSongDatas(res.data.songInfos)]);
        } else {
          setSongs(refineSongDatas(res.data.songInfos));
        }
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
      filters: Filters,
      limit: Limit, // Limit은 4로 같다
      loadMore: true, // 더보기 버튼을 눌렀을 때 보내는 정보라는 것을 알려주는 것
    };
    getSongs(body);
    // Product를 불러온 후, skip에 대한 변경값을 state에 반영해야
    setSkip(skip);
  };

  // 앨범들을 뿌려주는 helper 함수
  // const renderCards = songs.map( (product, index) =>{})

  const showFilteredResults = (filters: any) => {
    let body = {
      skip: 0, // 체크된 애들만 새로 처음부터 가져오는 거니까 0으로 세팅
      limit: Limit, // Limit은 8로 같다
      filters: filters,
    };
    getSongs(body);
    setSkip(0);
  };

  const handleFilters = (filters: any, category: string) => {
    // filters는 CheckBox 자식 component에서 props를 통해 넘겨주는, 체크된 애들의 목록 및 정보( id )

    console.log("before newFilters", Filters);
    const newFilters = { ...Filters };
    console.log("category // input filters", category, filters);
    // CheckBox.js에서 새로운 check된 항목들을 여기에 가져오는 것이다
    newFilters[category] = filters;
    console.log("after newFilters", newFilters);
    showFilteredResults(newFilters);
    // 우리가 새롭게 바꾼 filter 내용을 state에 반영
    // 이렇게 해야, price, continent 2개 checkbox 내용이 동시 반영
    setFilters(newFilters);
  };

  // Search Function
  const updateSearchTerm = useCallback(
    (newSearchTerm: string) => {
      let body = {
        skip: 0, // DB에서 처음부터 가져오기
        filters: Filters, // 위의 state에 있는 filter로 ( 즉, 대륙, types에 대한 조건이 입력되어있을 텐데 ,이러한 조건들에 합하여 검색 단어까지 조합하기 )
        limit: Limit,
        searchTerm: newSearchTerm,
      };
      setSkip(0);
      // Search 라는 자식 component로부터
      // 검색을 하는 단어의 내용을 가져온다
      // newSearchTerm이 바로, 자식 component에서 올려준 내용이다
      setSearchTerm(newSearchTerm);
      // Search 단어에 따른 새로운 product를 가져와준다
      getSongs(body);
    },
    [Filters]
  );

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
              View Songs
            </h1>
          </Heading>
          {/* Filter */}
          {/* years와 types Checkbox가 반반씩 차지하도록 */}

          <Row gutter={[16, 16]}>
            <Col>
              {/* CheckBox */}
              {/* Data.js에 있는 대륙 정보들을 list = {years} 로 넘겨준다  */}
              {/* CheckBox에서 체크된 애들의 list도 부모 component로 가져와야 하고 handleFilters를 통해 실시한다 
                    "years라고 해준 이유는, 2개 checkbox중에서 대륙에 해당하는 checkbox를 넘겨준 것이다 */}
              <Checkbox
                title={"Song Year"}
                type={"songYear"}
                list={songYearDatas}
                handleFilters={handleFilters}
              />
            </Col>
          </Row>

          {/* Search */}
          <SearchBoxContainer>
            <SearchBox refreshFunction={updateSearchTerm} />
          </SearchBoxContainer>
          {Songs &&
            Songs.map((song, idx) => {
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
        </Container>
        {PostSize >= Limit && (
          <BtnContainer>
            {/* button을 클릭하면 loadMoreHandler이라는 함수를 실행한다 */}
            <button onClick={loadMoreHandler}>더보기</button>
          </BtnContainer>
        )}
      </Section>
    </>
  );
};

export default HitSongs;
