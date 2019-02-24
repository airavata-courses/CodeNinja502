import React, { Component } from 'react';
import { loginUser } from '../actions/authentication';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AoiBox from './AoiBox';
import ReactUploadImage from './ReactUploadImage';

const txt_ph = "Describe your project";

export default class CreatePost extends Component {

	constructor() {
        super();
        this.state = {
            aois: [],
            content:'',
            image_url:'',
            email:'',
            errors: {}
        }
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
	    this.setState({
	    	[event.target.name] : event.target.value
	    })
	}

	handleAoiChange = (selected) => {
        
        this.setState({aois: selected});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        else{
            this.setState({
                email: nextProps.email
            });
        }
    }


    render() {
        return (
            <div style={{padding:'20px'}} className="bg-light rounded">
	            <div  id="create_post">
	            	<div className="form-group">
                    	<textarea value={this.state.content} 
                    	name="content" 
                    	form="create_post" 
                    	placeholder={txt_ph}
                    	onChange={this.handleChange}
                    	style={{width:'100%' ,height:'150px'}}
                    	/>
                	</div>
                	<div className="form-group">
	                    <p>Select Category</p>
	                    <AoiBox onChange={this.handleAoiChange} name="aoi"
                    	value={this.state.aois} />
                	</div>
            		<ReactUploadImage content={this.state.content} email={this.state.email} aois={this.state.aois}/>
	            </div>


            </div>
        );
    }


}



