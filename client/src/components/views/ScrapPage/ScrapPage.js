import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getScrapItems } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';

function ScrapPage(props) {
    const dispatch = useDispatch();
    
    useEffect(() => {

        let scrapItems = []

        //redux의 user state안에 scrap안에 리뷰가 들어 있는지 확인.
        if (props.user.userData && props.user.userData.scrap) {
            if(props.user.userData.scrap.length > 0) {
                props.user.userData.scrap.forEach(item => {
                    scrapItems.push(item.id)
                });

                dispatch(getScrapItems(scrapItems, props.user.userData.scrap))

            }
        }
    }, [props.user.userData])
    
    
    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h1>My ScrapBook</h1>
            <div>
                <UserCardBlock reviews={props.user.reviewDetail && props.user.reviewDetail.product} />
            </div>
        </div>
    )
}

export default ScrapPage
