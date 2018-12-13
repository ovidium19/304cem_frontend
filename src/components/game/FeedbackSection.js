import React from 'react'
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component'
import TextAreaInput from '../common/formElements/TextAreaInput'

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
    }
    render() {
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
                <input type='submit' className='btn btn-primary' onClick={this.onSubmit} value="Submit"/>
            </form>
        )
    }
}
FeedbackSection.propTypes = {
    onFeedbackSend: PropTypes.func,
    id: PropTypes.string
}
export default FeedbackSection
