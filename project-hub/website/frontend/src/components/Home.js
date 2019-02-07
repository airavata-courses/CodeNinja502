import React, { Component } from 'react';
import FeedExampleEventsProp from './Feed';
import { loginUser } from '../actions/authentication';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreatePost from './CreatePost';

class Home extends Component {

    constructor(){
        super();
        this.state = {
            email : ''
        }
    }
	componentDidMount() {
        console.log(this.props.auth.user)
        
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
        else{
            this.setState({
                email : this.props.auth.user.email
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.auth.isAuthenticated) {
            this.props.history.push('/login')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        else{
            this.setState({
                email : this.props.auth.user.email
            });
        }
    }
    render() {
        return (
            <div style={{ margin: '50px', paddingLeft: "50px"}}>
            	<CreatePost email={this.state.email}/>
                <FeedExampleEventsProp/>
            </div>
        );
    }


}



Home.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Home)