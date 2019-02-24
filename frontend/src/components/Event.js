import React from 'react'
import { Feed, Header, Icon, Image, Modal, Button } from 'semantic-ui-react'

export default class Event extends React.Component{




    render(){
    	return(

    			<Feed.Event className='bg-light rounded' style={{'margin-bottom':'5px', 'padding': '20px'}}>
    				<Feed.Label>
				        <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
			      	</Feed.Label>
			      	<Feed.Content>
			      		<Feed.Summary>
			      		<script>
    					console.log({this.props.event.summary})
    					</script>
			      			<Feed.User>{this.props.event.summary}</Feed.User>
			      			<Feed.Date>{this.props.event.date}</Feed.Date>
			      		</Feed.Summary>
			      		<Feed.Extra>
			      			<p>{this.props.event.extraText}</p>
			      			<Image src={this.props.event.extraImages} size='big' rounded />
			      			<div stype={{'margin':'3px'}}>
			      			</div>
			      		</Feed.Extra>
			      		<Feed.Like>
				            <Icon name='like' />
				            <p>12 Likes</p>
			          	</Feed.Like>
			      		<Feed.Meta>
			      			<p>
			      			{"Category: "  + " "+  this.props.event.meta}
			      			</p>
			      		</Feed.Meta>

			      		
			      	</Feed.Content>
    			</Feed.Event>
    		)
    }
}