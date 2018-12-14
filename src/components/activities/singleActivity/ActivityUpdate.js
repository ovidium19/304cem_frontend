import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect} from 'react-router-dom'
import * as activityActions from '../../../actions/activityActions'
import CreateActivityForm from '../createActivity/CreateActivityForm'
import categories from '../../common/categories'
import colors from '../../common/colors'
import music from '../../common/music'
import sounds from '../../common/sounds'
import toastr from 'toastr'

export class ActivityUpdate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            act: Object.assign({},this.props.activity),
            redirect: false,
            categoryOptions: categories,
            soundOptions: sounds,
            musicOptions: music,
            colorOptions: colors,
            link: ''
        }
        this.onStateUpdate = this.onStateUpdate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onGoBack = this.onGoBack.bind(this)
    }
    onStateUpdate(event) {
        let names = event.target.name.split(' ')
        const act = Object.assign({},this.state.act)
        switch (names[0]) {
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
    onGoBack(e){
        e.preventDefault()
        this.redirect(this.props.location.pathname.replace('/update',''))
    }
    onSubmit(event) {
        console.log('Submiting form ... ')
        event.preventDefault()
        //this.setState({loading: true})
        let data = Object.assign({},this.state.act)
        this.props.actions.updateActivity(this.props.user.header,data)
            .then(res => {
                console.log(res)
                toastr.success('Activity updated')
                this.redirect(this.props.location.pathname.replace('/update',''))
            })
            .catch(err => {
                console.log(err)
                toastr.danger(err.message)
            })
    }
    redirect(link) {
        this.setState({
            loading: false,
            redirect: true,
            link
        })
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={this.state.link} />
            )
        }
        return (
                <div className='container-fluid single-activity my-0 py-4'>
                    <div className='go-back-button my-3 ml-3'>
                        <button className='btn btn-primary' onClick={this.onGoBack}><i className="fas fa-arrow-left pr-2"/>Go Back</button>
                    </div>
                    <div className='jumbotron text-center my-3'>
                        <p className='display-4'>Warning</p>
                        <p className='lead'>You may only update your styles and settings. If you want to change anything
                        else, consider creating a new activity. You may click the button below to create a new activity
                        from this one.
                        </p>
                        <button className='btn btn-success'>Create activity from this</button>
                    </div>

                    <CreateActivityForm
                    onChange = {this.onStateUpdate}
                    onSubmit = {this.onSubmit}
                    loading = {this.props.loading}
                    act = {this.state.act}
                    categoryOptions = {this.state.categoryOptions}
                    musicOptions = {this.state.musicOptions}
                    soundOptions = {this.state.soundOptions}
                    colorOptions = {this.state.colorOptions}
                    onAddBlank = {this.onAddBlank}
                    disabled={true}/>
                </div>
            )
    }
}
ActivityUpdate.propTypes = {
    user: PropTypes.object.isRequired,
    activity: PropTypes.object,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object
}
function mapStateToProps(state,ownProps) {
    let user = {
        username: state.user.username,
        header: state.user.header
    }
    return {
        user,
        activity: state.activity,
        loading: state.asyncCalls > 0
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(activityActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActivityUpdate)
