import React, { useState } from 'react'
import {Checkbox, Collapse} from 'antd';

const {Panel} = Collapse;

function CheckBox(props) {

    //어떤 번호들의 체크박스가 선택되었는지 배열로 저장.
    const [Checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        //누른 것의 index를 구함
        const currentIndex = Checked.indexOf(value);

        //전체 checked된 state에서 현재 누른 체크박스 확인
        const newChecked = [...Checked]
        if (currentIndex === -1) {
        //없다면 state에 넣어줌.
            newChecked.push(value)
        } else {
        //이미 있다면 빼줌.
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        //부모 컴포넌트에 전달해줘야 함.
        props.handleFilters(newChecked)
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handleToggle(value._id) } 
            checked={Checked.indexOf(value._id) === -1 ? false : true}>
                <span>{value.name}</span>
            </Checkbox>
        </React.Fragment>
    ))


    return (
        <div>
            <Collapse defaultActiveKey={['1']} >
                <Panel header="카테고리 검색" key="1">
                    {renderCheckboxLists()}
                    
                </Panel>
                
            </Collapse>
        </div>
    )
}

export default CheckBox
