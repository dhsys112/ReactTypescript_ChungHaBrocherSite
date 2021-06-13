import React, { useState, Fragment, memo, useCallback } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

interface CheckBoxList {
  val: string;
}
interface CheckBoxPros {
  title: string;
  type: string;
  list: Array<CheckBoxList>;
  handleFilters: (filters: string[], type: string) => void;
}

const CheckBoxComponent = memo(
  ({ type, list, handleFilters }: CheckBoxPros) => {
    // Checkbox의 체크된 애들의 목록 ex.1 번 체크하면 여기에 들어간다 / ex. 1,2,3 체크하면 [1,2,3] 이런 식으로 들어가게 된다
    const [Checked, setChecked] = useState<Array<string>>([]);
    // check여부를 컨트롤하게 해주는 부분
    const handleToggle = (val: string) => {
      // Checked State Array 상에서 누른 대륙 요소의 index를 구하고
      // 만일 해당 값이 array에 없다면 -1을 반환한다
      const currentIndex = Checked.indexOf(val);
      const newChecked = [...Checked];
      // 전체 checked 된 state에서, 현재 누른 checkbox가
      // 없다면, state에 넣어준다
      if (currentIndex === -1) {
        newChecked.push(val);
      } else {
        // 만일 있다면 빼준다
        newChecked.splice(currentIndex, 1);
      }
      // 새로나온 newChecked를 넣어준다
      setChecked(newChecked);
      // 부모 컴포넌트에게 해당 checked 정보를 넘겨준다
      handleFilters(newChecked, type);
    };

    const renderCheckboxLists = useCallback(
      () =>
        list &&
        list.map((value: CheckBoxList, index: number) => (
          // key값 넣는 것이 중요하다
          <Fragment key={index}>
            {/* handleToggle : 체크박스 컨트롤 해주기 
            value._id ??
            Data.js 에서 보면, continents 라는 배열의 각 원소는
            "_id", "name" 이라는 속성이 있다
            */}
            <Checkbox
              onChange={() => handleToggle(value.val)}
              checked={Checked.indexOf(value.val) === -1 ? false : true}
            >
              {/* value 하나는 하나의 year 혹은 type */}
              <span>{value.val}</span>
            </Checkbox>
          </Fragment>
        )),
      [Checked]
    );

<<<<<<< HEAD
  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header={type} key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
});
=======
    return (
      <div>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header={type} key="1">
            {renderCheckboxLists()}
          </Panel>
        </Collapse>
      </div>
    );
  }
);
>>>>>>> master

export default CheckBoxComponent;
