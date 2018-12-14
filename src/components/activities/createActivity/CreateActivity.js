import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect} from 'react-router-dom'
import * as activityActions from '../../../actions/activityActions'
import CreateActivityForm from './CreateActivityForm'
import categories from '../../common/categories'
import colors from '../../common/colors'
import music from '../../common/music'
import sounds from '../../common/sounds'
import toastr from 'toastr'
const defaultShape = {
    blanks: [],
    options: [],
    styles: {
        backgroundColor: '',
        color: ''
    }
}
/**
 * @class - This controls the form interaction when creating a new activity
 */
export class CreateActivity extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            act: Object.assign({},this.props.activity),
            loading: false,
            redirect: false,
            errors: Object.assign({},defaultShape),
            shape: Object.assign({},defaultShape),
            categoryOptions: categories,
            soundOptions: sounds,
            musicOptions: music,
            colorOptions: colors
        }
        this.onStateUpdate = this.onStateUpdate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onAddBlank = this.onAddBlank.bind(this)
    }
    /**
     * There are a few things to look at when creating a new blank area.
     * Each blank area has its own error sections and it's important to
     * create those error sections when adding a new blank area, otherwise
     * I get runtime errors for calling fields on undefined.
     * This function handles creating a new blank area.
     * @param {Event} event - Just to preven the default
     */
    onAddBlank(event) {
        event.preventDefault()
        let blanks = Array.from(this.state.act.blanks)
        let options = Array.from(this.state.act.options)
        let errorBlanks =  Array.from(this.state.errors.blanks)
        let errorOptions = Array.from(this.state.errors.options)
        //default values for the new blank and its options
        blanks.push('')
        options.push(['','Option 2','Option 3','Option 4'])
        //default error values
        errorBlanks.push('')
        errorOptions.push(['','','',''])
        this.setState({
            act: Object.assign({},this.state.act,{
                blanks,
                options
                }),
            errors:
                Object.assign({},this.state.errors,{
                    blanks: errorBlanks,
                    options: errorOptions
                    }),
            shape: Object.assign({},this.state.shape,{
                blanks: errorBlanks,
                options: errorOptions
            })

        })
    }
    /**
     * Synchronizes changes between model and view by reacting to user input. There are several different
     * cases, where we have nested fields or arrays and those need to be handled in a different way
     * @param {Event} event - All form fields have a name attribute. I am using that attribute to understand which
     * field has been updated. For this reason, we need the event param
     */
    onStateUpdate(event) {
        let names = event.target.name.split(' ')
        const act = Object.assign({},this.state.act)
        switch (names[0]) {
            case 'blanks': {
                //The form field that contains blank has a useful string after the space
                //that lets me know what index it has in the blanks array
                let blank = parseInt(names[1])
                act.blanks[blank] = event.target.value
                act.options[blank][0] = event.target.value
                break
            }
            case 'options': {
                //similarly to above, the name of the option field is 'option {indexBlank} {indexOption}
                //to fetch the right indexes for the option changed.
                let blank = parseInt(names[1])
                let option  = parseInt(names[2])
                act.options[blank][option] = event.target.value
                break
            }
            case 'styles': {
                //styles is an object and we need to handle the input on it in a special way
                act.styles[names[1]] = event.target.value
                break
            }
            case 'allow_anon':
            case 'allow_feedback': {
                //these values come back as string and need to be converted to boolean
                act[names[0]] = event.target.value == 'true' ? true : false
                break
            }
            default: {
                act[names[0]] = event.target.value
            }

        }
        this.setState({act})

    }
    /**
     * There is a lot of validation needed to properly create an activity.
     * Text and name should not be empty
     * Activity should have at least 1 blank area.
     * The blank text must exist and must be found in the activity text
     * Blank options should not be empty and should not contain spacing
     */
    validateForm() {
        let allErrors = JSON.parse(JSON.stringify(this.state.shape))
        let errors = 0

        //activity has a name and text
        if (this.state.act.name.length == 0) {
            errors = errors + 1
            allErrors.name = 'Please input an activity name.'
        }
        if (this.state.act.text.length < 10 ) {
            errors = errors + 1
            allErrors.text = 'Activity text should have at least 10 characters.'
        }

        //there must be at least 1 blank
        if (this.state.act.blanks.length == 0) {
            errors = errors + 1
            allErrors.name = 'There must be at least 1 blank section'
        }

        //all blanks should have text and found in the text and options should have text and no spacing
        this.state.act.blanks.map((b,i) => {
            if (b.length == 0){
                allErrors.blanks[i] = 'Please enter the text you want to blank.'
                errors = errors + 1
            }
            else {
                if (!(this.state.act.text.includes(b))){
                    errors = errors + 1
                    allErrors.blanks[i] = 'This blank is not in the text!'
                }
                if (b.includes(' ')) {
                    errors = errors + 1
                    allErrors.blanks[i] = 'You can only blank individual words, no spacing.'
                }
                else {
                    this.state.act.options[i].map((o,j) => {
                        if (o.length == 0){
                            errors = errors + 1
                            allErrors.options[i][j] = 'Options cannot be empty.'
                        }
                        if (o.includes(' ')) {
                            errors = errors + 1
                            allErrors.options[i][j] = 'Can only have 1 word, no spacing.'
                        }
                    })
                }
            }
        })
        console.log(allErrors)

        if (errors) {
            this.setState({
                errors: allErrors
            })
            toastr.error(`There are ${errors} errors in the form`)
        }
        else {
             this.setState({
                 errors:  JSON.parse(JSON.stringify(this.state.shape))
             })
        }
        return errors == 0
    }
    /**
     *
     * @param {Event} event - Just to prevent the default behaviour of submitting a form.
     */
    onSubmit(event) {
        event.preventDefault()
        //check validation, return if errors are found.
        if (!(this.validateForm())) return
        //this.setState({loading: true})
        let data = Object.assign({},this.state.act)
        //set default values for uneditable activity fields.
        data.published = false
        data.under_review = false
        data.username = this.props.user.username
        data.timestamp = new Date().toLocaleString()

        //Call the redux-thunk for posting an activity
        this.props.actions.postActivity(this.props.user.header,data)
            .then(res => {
                console.log(res)
                toastr.success('Activity posted')
                this.props.actions.removeActivity()
                this.redirect()
            })
            .catch(err => {
                console.log(err)
                toastr.danger(err.message)
            })
    }
    /**
     * A useful function to redirect the user when the form has been submitted
     */
    redirect() {
        this.setState({
            loading: false,
            redirect: true
        })
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={`/app/user/${this.props.user.username}/activities`} />
            )
        }
        return (
                <CreateActivityForm
                onChange = {this.onStateUpdate}
                onSubmit = {this.onSubmit}
                loading = {this.state.loading}
                errors = {this.state.errors}
                act = {this.state.act}
                categoryOptions = {this.state.categoryOptions}
                musicOptions = {this.state.musicOptions}
                soundOptions = {this.state.soundOptions}
                colorOptions = {this.state.colorOptions}
                onAddBlank = {this.onAddBlank}
                disabled={false}/>
            )
    }
}
CreateActivity.propTypes = {
    user: PropTypes.object.isRequired,
    activity: PropTypes.object,
    actions: PropTypes.object.isRequired
}
function mapStateToProps(state,ownProps) {
    let user = {
        username: state.user.username,
        header: state.user.header
    }
    return {
        user,
        activity: state.activity
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(activityActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateActivity)
