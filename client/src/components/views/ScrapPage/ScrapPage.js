import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getScrapItems, removeScrapItem } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import {Empty} from 'antd';

function ScrapPage(props) {

    const dispatch = useDispatch();
    
    const [ShowEmpty, setShowEmpty] = useState(true);

    useEffect(() => {

        let scrapItems = []

        //redux의 user state안에 scrap안에 리뷰가 들어 있는지 확인.
        if (props.user.userData && props.user.userData.scrap) {
            if(props.user.userData.scrap.length > 0) {
                props.user.userData.scrap.forEach(item => {
                    scrapItems.push(item.id)
                });

                dispatch(getScrapItems(scrapItems, props.user.userData.scrap))
                setShowEmpty(false)
            }
        }
    }, [props.user.userData])

    let removeFromScrap = (reviewId) => {
        dispatch(removeScrapItem(reviewId))
        .then(response => {
            if(response.payload.reviewInfo.length <= 0){
                setShowEmpty(true)
            }
        })
    }
    
    
    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h1>My ScrapBook</h1>
            <div>
                <UserCardBlock reviews={props.user.scrapDetail} removeItem={removeFromScrap} />
            </div>

            {ShowEmpty &&
                <>
                <br></br>
                <Empty />
                </>
            }


        </div>
    )
}

export default ScrapPage
