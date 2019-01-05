import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import FeedbackSection from './FeedbackSection'

const ResultScreen = ({onFeedbackSend, answers, activities, username, score, feedbackStatus, onReplay }) => {
    let result = score >= 60
    let message
    let hint
    if (result) {
        message = (<span>Congratulations</span>)
        hint = (
            <React.Fragment>
                <span>{'You have successfully passed the assessment with '}</span>
                <p className='text-center display-4 text-success score'>{`${score}%`}</p>
            </React.Fragment>
        )
    }
    else {
        message = (<span>{'Unfortunately, you haven\'t passed'}</span>)
        hint = (
            <React.Fragment>
                <span>{'You failed to pass with '}</span>
                <p className='text-center display-4 text-danger score'>{`${score}%`}</p>
            </React.Fragment>
        )
    }
    let total_time = answers.reduce((p,c) => p + c.time, 0)
    return (
        <div className='d-flex flex-column justify-content-center align-items center flex-nowrap game-results'>

            <div className='p-3 m-0'>
                <div className='text-center'>
                    <div className='text-center lead my-3'>{message}</div>
                    <div className='text-center'>{hint}</div>
                    <div className='mt-3 d-flex justify-content-around'>
                        <Link to={`/app/user/${username}/stats`} className='btn btn-success' >Your Stats</Link>
                        <button className='btn btn-success' onClick={onReplay}>Replay</button>

                    </div>
                </div>
            </div>

            <div className='my-3 p-3'>
                <p className='text-center lead my-3'>
                    Total Time:
                    <span className={total_time < 50 ? 'text-success':'text-danger'}>{total_time}</span>
                     seconds
                </p>
            </div>

            <div className='my-3 p-2'>
                <ul className='list-group p-0'>
                    { answers && answers.map( (a,i) => (
                        <li className='list-group-item p-0 m-0 activity-item' key={i}>
                            <div className='my-2 card card-body'  style={
                                {color: activities[i].styles.color,
                                 backgroundColor: activities[i].styles.backgroundColor
                                }}>
                                <p>
                                    <span className='mr-2 lead'>Text: </span>
                                    {activities[i].text}
                                </p>
                                <div className='card-footer m-0 mb-1 bg-white text-dark'>
                                    <div className=' font-weight-bold'>
                                        <p>
                                            <span className='mr-2 '>Time: </span>
                                            {a.time} seconds
                                        </p>

                                    </div>

                                    <div className='my-2 font-weight-bold'>
                                        <div>
                                            <span className='mr-2 lead'>Your answers: </span>
                                            <ul className='list-inline'>
                                                {a.correctEach.map((c,j) => (
                                                    <li
                                                    className={`list-inline-item ${c.correct ? 'text-success' : 'text-warning'}`}
                                                    key={`answer${i}${j}`}>
                                                        {c.answer ? c.answer : 'No answer'}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='feedback card-footer'>
                                        <FeedbackSection
                                        onFeedbackSend = {onFeedbackSend}
                                        index={i}
                                        feedbackStatus = {feedbackStatus[i]}/>
                                    </div>

                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>


        </div>

    )
}

export default ResultScreen
