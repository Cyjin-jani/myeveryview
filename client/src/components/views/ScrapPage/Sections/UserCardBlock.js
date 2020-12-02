import React from 'react';
import "./UserCardBlock.css"

function UserCardBlock(props) {

    const renderImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        props.reviews && props.reviews.map((review, index) => (
            <tr key={index}>
                <td>
                    <img style={{width: '70px'}} alt="review" src={renderImage(review.images)} />
                </td>
                <td>
                    {review.title}
                </td>
                <td>
                    {review.price}
                </td>
                <td>
                    {review.stars}
                </td>
                <td>
                    <button>
                        Remove
                    </button>
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Review Image</th>
                        <th>Review Title</th>
                        <th>Review Price</th>
                        <th>Review Stars</th>
                        <th>Remove from Scrap</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
