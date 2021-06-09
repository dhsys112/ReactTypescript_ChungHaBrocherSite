import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

interface SearchBoxProp {
  refreshFunction: (newSearchTerm: string) => void;
}

const SearchBox = (props: SearchBoxProp) => {
  const [SearchTerm, setSearchTerm] = useState("");

  const searchHandler = (event: any) => {
    // 아래에서 SearchTerm이라는 value를 바꿔주는 것이다
    setSearchTerm(event.currentTarget.value);
    // 우리가 여기서 search 하는 단어의 내용을 props를 통해 부모 component로 넘겨준다
    props.refreshFunction(event.currentTarget.value);
  };

  return (
    <div>
      <Search
        placeholder="input search text"
        onChange={searchHandler}
        style={{ width: 200 }}
        value={SearchTerm}
      />
    </div>
  );
};

export default SearchBox;
