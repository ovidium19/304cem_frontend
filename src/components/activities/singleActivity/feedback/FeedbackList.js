import React from 'react'
import PropTypes from 'prop-types'
import Pagination from 'rc-pagination'
import FeedbackItem from './FeedbackItem'
const FeedbackList = ({ feedbacks, onPageClick, klass, count, curPage, pageSize}) => (
        <div className={klass}>
            <p className='display-4'>Feedback</p>
            <Pagination
                total = {count}
                current = {curPage}
                pageSize = {pageSize}
                defaultPageSize = {5}
                showTotal = {(total) => `${total} items`}
                hideOnSinglePage = {true}
                className = {'my-3'}
                onChange = {onPageClick}
            />
            <ul className='list-group w-100 p-0 '>
            { feedbacks.length > 0 ? feedbacks.map((r,i) =>
                    <FeedbackItem item = {r} key = {i} starName = {i} />
                )
            : <span>No feedback</span>}
            </ul>
        </div>
)
FeedbackList.propTypes = {
    feedbacks: PropTypes.array,
    onPageClick: PropTypes.func,
    klass: PropTypes.string,
    count: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    curPage: PropTypes.number,
}
export default FeedbackList
