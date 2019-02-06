import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import axios from 'axios';

const FEED_URL = '';




export default class FeedExampleEventsProp extends React.Component {

    constructor(){
      super();
      this.state = {
        events : []
      }
      this.parse_json = this.parse_json.bind(this);
    }
    componentDidMount() {

      axios.get(FEED_URL)
        .then( function(response){
          console.log(response)
          this.parse_json(response)
        }).catch(function(error)
          console.log(error)
        )
    }

    parse_json(response){
      var i;
      for(i=0; i<response.length; i++){
        for (var data in response[i]){
          switch(data){
            case 'URL':

            case ''
          }
        }
      }
    }

    render() {
        return (<Feed events={this.events} size = "large" />);
    }
}
const events = [
  {
    date: '1 Hour Ago',
    image: '/images/avatar/small/elliot.jpg',
    meta: '4 Likes',
    summary: 'Elliot Fu added you as a friend',
  },
  {
    date: '4 days ago',
    image: '/images/avatar/small/helen.jpg',
    meta: '1 Like',
    summary: 'Helen Troy added 2 new illustrations',
    extraImages: ['/images/wireframe/image.png', '/images/wireframe/image-text.png'],
  },
  {
    date: '3 days ago',
    image: '/images/avatar/small/joe.jpg',
    meta: '8 Likes',
    summary: 'Joe Henderson posted on his page',
    extraText:
      "Ours is a life of constant reruns. We're always circling back to where we'd we started.",
  },
  {
    date: '4 days ago',
    image: '/images/avatar/small/justen.jpg',
    meta: '41 Likes',
    summary: 'Justen Kitsune added 2 new photos of you',
    extraText: 'Look at these fun pics I found from a few years ago. Good times.',
    extraImages: ['/images/wireframe/image.png', '/images/wireframe/image-text.png'],
  },
]

const FeedExampleEventsProp = () => 

export default FeedExampleEventsProp