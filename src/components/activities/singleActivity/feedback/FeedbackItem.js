import React from 'react'
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component'

const FeedbackItem = ({item, starName}) => (
    <li className='media px-2'>
        <div className='img-author mr-3'>
        <img className='img-fluid img-thumbnail' src='/anonperson.jpg' alt='Generic Placeholder' />
        <p className='feedback-owner small text-center text-success font-weight-bold'>{item.username ? item.username : 'Anonymous'}</p>
        </div>

        <div className='media-body'>
            <div className='heading row'>
                <h5 className='mt-0 col-4'>Rating</h5>
                <div className='col-4'>
                    <StarRatingComponent
                        name={starName.toString()}
                        emptyStarColor = {'black'}
                        starCount = {5}
                        value = {item.rating >= 0 ? item.rating : 0}
                        editing = {false} />
                </div>
            </div>
            <p className='feedback-text'>{item.text}</p>
        </div>
    </li>

)

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired,
    starName: PropTypes.number
}

export default FeedbackItem
