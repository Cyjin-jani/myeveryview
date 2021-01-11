import React, { useState } from 'react';
import { Input } from 'antd';

const {Search} = Input;

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState("");

    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
            <Search 
                placeholder="원하는 리뷰 검색하기" 
                onChange={searchHandler} 
                style={{ minWidth: '250px' }}
                value={SearchTerm}
                size="large"
                enterButton
            />
        </div>
    )
}

export default SearchFeature
