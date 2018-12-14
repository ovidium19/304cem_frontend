import React from 'react'
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component'
import TextAreaInput from '../common/formElements/TextAreaInput'
import LoadingSpinner from '../common/LoadingSpinner'

class FeedbackSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
        }
        this.onStarRatingChanged = this.onStarRatingChanged.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onStarRatingChanged(val,pre,name) {

        this.setState({
            rating: val
        })
    }
    onChange(event) {
        event.preventDefault()
        this.setState({
            text: event.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault()
        console.log(this.state)
        this.props.onFeedbackSend(this.state,this.props.index)
    }
    renderState() {
        switch ( this.props.feedbackStatus ){
            case 'Available': {
                return (
                    <form name={this.props.id}>
                        <TextAreaInput
                        name="text"
                        value = {this.state.text}
                        label="Feedback"
                        placeholder="Enter your feedback here..."
                        onChange = {this.onChange}
                        />
                        <div className='form-group'>
                            <label htmlFor={this.props.id}>Rate</label>
                            <div className='form-control p-2' name={this.props.id}>
                                <StarRatingComponent
                                name={this.props.id}
                                value = {this.state.rating ? this.state.rating : 0}
                                onStarClick = {this.onStarRatingChanged}
                                editing = {true}
                                emptyStarColor = {'black'}
                                />
                            </div>

                        </div>
                        {
                            this.props.feedbackStatus == 'Available' ?
                            <input type='submit' className='btn btn-primary' onClick={this.onSubmit} value="Submit"/> :
                            <p className='lead font-weight-bold text-success'>Sent</p>
                        }
                    </form>
            )
            }
            case 'Not Available': {
                return (
                    <p className='text-danger font-weight-bold'>Feedback is not available for this question.</p>
                )
            }
            case 'Sent': {
                return (
                    <p className='text-success font-weight-bold'>Feedback sent to the user.</p>
                    )
            }
            case 'Loading': {
                return (
                    <LoadingSpinner message={'Sending feedback'} />
                )
            }
            default: {
                return null
            }
        }
    }
    render() {
        return (
            <React.Fragment>
                {
                this.renderState()
                }
            </React.Fragment>
        )
    }
}
FeedbackSection.propTypes = {
    onFeedbackSend: PropTypes.func,
    index: PropTypes.number,
    feedbackStatus: PropTypes.string
}
export default FeedbackSection
