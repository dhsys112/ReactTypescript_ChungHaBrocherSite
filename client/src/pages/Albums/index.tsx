import React, { useEffect, useState } from "react";
import AlbumContainer from "components/Albums/AlbumContainer";
import styled from "styled-components/macro";
import { AlbumIntroDataType } from "assets/data/types";
import axios from "axios";

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
  continents: Array<any>;
  price: Array<any>;
}

const Albums = () => {
  const [twoAlbumsAtOne, setTwoAlbumsAtOne] = useState<any>();

  // DB에서 가져온 정보( ex. Imgs ) 를 State 에 가져온다
  const [Products, setProducts] = useState<any>([]);
  // Skip : 더보기 할 때마다, skip에 대해 지금까지 불러온 애들 수를 저장.( 축적 )
  const [Skip, setSkip] = useState(0);
  // 더보기 클릭시, 최대 8개까지만 가져오기
  const [Limit, setLimit] = useState(8);
  // 더이상 정보가 없을 때, 더보기 버튼이 안보이도록
  const [PostSize, setPostSize] = useState(0);
  // 체크리스트에서 체크된 리스트 들 ex. 대륙, 가격 등 ( 해당 data들의 _id )
  const [Filters, setFilters] = useState<Filters>({
    continents: [],
    price: [],
  });
  // Search내용
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // let body = {
    //   skip: Skip,
    //   limit: Limit,
    // };
    // getProducts(body);

    axios.post("/api/album/albums").then((res) => {
      const albumLists: Array<AlbumIntroDataType> = res.data.albums.map(
        (album: any) => refineAlbumIntoInfo(album)
      );
      setTwoAlbumsAtOne(makeTwoAlbumsOne(albumLists));
    });
  }, []);

  const getProducts = (body: any) => {
    // DB에 있는 데이터를 가져오는 요청을 한다
    axios.post("/api/album/albums", body).then((res) => {
      if (res.data.success) {
        // 더보기 버튼을 통해 보내온 request 라면( body.loadMore ==  true)
        if (body.loadMore === true) {
          console.log("existing : ", Products);
          console.log("New :", res.data.productInfo);
          console.log("boy loadmore : ", body.loadMore);
          // 원래 있던 상품 목록 가져오고
          // 거기에 새로 찾아온 상품을 더해주는 것
          setProducts([...Products, ...res.data.productInfo]);
        } else {
          // DB에서 가져온 모든 상품 정보를 state에 저장한다
          setProducts(res.data.productInfo);
        }
        // Server에서 넘어온 PostSize,
        // 즉, 상품 개수가 8( limit )보다 크거나 같으면
        // 여전히 내가 더 가져올 데이터가 있다는 것이고
        // 8보다 작으면 더이상 없다는 것. 그래서 더보기 버튼이 안보인다
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
    getProducts(body);
    // Product를 불러온 후, skip에 대한 변경값을 state에 반영해야
    setSkip(skip);
  };

  // 앨범들을 뿌려주는 helper 함수
  // const renderCards = Products.map( (product, index) =>{})

  const showFilteredResults = (filters: any) => {
    // 우리가 체크박스에서 특정 리스트를 체크하면
    // 그에 맞는 조건을 갖는 상품들을 가져오기
    // getProducts 함수를 다시 한번 더 실행한다
    let body = {
      skip: 0, // 체크된 애들만 새로 처음부터 가져오는 거니까 0으로 세팅
      limit: Limit, // Limit은 8로 같다
      filters: filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value: any) => {
    // 여기서 price는 Data.js에서 가져온 총 price 목록들
    const data = value; // price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        /*
            value는 filter를 통해 들어왔고
            filter는 자식 RadioBox component에서 올라온 RadioBox 체크 항목이다 
            */
        array = data[key].array; // ex. [280, 299]
      }
    }

    return array;
  };

  const handleFilters = (filters: Array<any>, category: string) => {
    // filters는 CheckBox 자식 component에서 props를 통해 넘겨주는, 체크된 애들의 목록 및 정보( id )
    // 혹은
    // RadioBox 자식 component에서 props를 통해 넘겨주는, price 항목 애들의 id 값

    // 부모 component 상의 filter를 가져온다
    // newFilters 에는 continents 와 , price 2가지 항목이 있다 > 이 2항목을 나눠주기 위해 category 라는 parameter를 넘겨준다
    const newFilters = { ...Filters };

    // CheckBox.js에서 새로운 check된 항목들을 여기에 가져오는 것이다
    // newFilters[category] = filters;

    if (category == "price") {
      // category가 price일 때는
      // filters에 숫자들이 들어있을 것이다
      // ex. "Any" 가 선택되면 0 이 들어있다
      let priceValues = handlePrice(filters);
      // priceValues는 handlePrice를 통해 return 된 array값이 들어갈 것이다
      // newFilters의 price 항목에 대해 priceValues 라는 값과 관련된 항목을 넣어주는 것이다
      newFilters[category] = priceValues; // newFilters["price"] 이렇게 될 것이다
    }

    showFilteredResults(newFilters);

    // 우리가 새롭게 바꾼 filter 내용을 state에 반영
    // 이렇게 해야, price, continent 2개 checkbox 내용이 동시 반영
    setFilters(newFilters);
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
          {twoAlbumsAtOne &&
            twoAlbumsAtOne.map(
              (AlbumIntroData: Array<AlbumIntroDataType>, idx: number) => {
                return <AlbumContainer key={idx} datas={AlbumIntroData} />;
              }
            )}
        </Container>
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
const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
