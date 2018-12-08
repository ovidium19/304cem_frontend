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
    onAddBlank(event) {
        event.preventDefault()
        let blanks = Array.from(this.state.act.blanks)
        let options = Array.from(this.state.act.options)
        let errorBlanks =  Array.from(this.state.errors.blanks)
        let errorOptions = Array.from(this.state.errors.options)
        blanks.push('')
        options.push(['','Option 2','Option 3','Option 4'])
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
    onStateUpdate(event) {
        let names = event.target.name.split(' ')
        const act = Object.assign({},this.state.act)
        switch (names[0]) {
            case 'blanks': {
                let blank = parseInt(names[1])
                act.blanks[blank] = event.target.value
                act.options[blank][0] = event.target.value
                break
            }
            case 'options': {
                let blank = parseInt(names[1])
                let option  = parseInt(names[2])
                act.options[blank][option] = event.target.value
                break
            }
            case 'styles': {
                act.styles[names[1]] = event.target.value
                break
            }
            case 'allow_anon':
            case 'allow_feedback': {
                act[names[0]] = event.target.value == 'true' ? true : false
                break
            }
            default: {
                act[names[0]] = event.target.value
            }

        }
        this.setState({act})

    }
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

        //all blanks should have text and found in the text and options should have text
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
    onSubmit(event) {
        console.log('Submiting form ... ')
        event.preventDefault()
        if (!(this.validateForm())) return
        //this.setState({loading: true})
        let data = Object.assign({},this.state.act)
        data.published = false
        data.under_review = false
        data.username = this.props.user.username
        data.timestamp = new Date().toLocaleString()
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
