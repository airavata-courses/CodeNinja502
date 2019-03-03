import React from 'react'
import { Feed, Icon, Image } from 'semantic-ui-react'
import axios from 'axios';
import Event from './Event';

const sample_data = [{ "_id" : { "$oid" : "5c5a4d8e8a911b1ce2f8cff8" }, "mediaid" : 16.0, "URL" : "god.jpg", "likes" : 0, "comments" : "", "date" : "08/09/2020", "userid" : "tommy", "typeofmedia" : "picture", "aoi" : "tommy", "description" : "20 post" },{ "_id" : { "$oid" : "5c5a5a018a911b1ce2f8cff9" }, "URL" : "god.jpg", "likes" : 0, "description" : "20 post", "comments" : "", "aoi" : "tojdsf", "date" : "08/09/2020", "userid" : "tommy", "typeofmedia" : "picture", "mediaid" : 17.0 },{ "_id" : { "$oid" : "5c5a5a6e8a911b1ce2f8cffa" }, "mediaid" : 18.0, "URL" : "cat.jpg", "comments" : "", "date" : "08/09/2020", "userid" : "tommy", "typeofmedia" : "picture", "likes" : 0, "aoi" : "tojdsf", "description" : "20 post" },{ "_id" : { "$oid" : "5c5a5dee78435b2bd7d65ac5" }, "userid" : "tommy", "typeofmedia" : "picture", "mediaid" : 19.0, "URL" : "cat.jpg", "likes" : 0, "comments" : "", "aoi" : "tojdsf" },{ "_id" : { "$oid" : "5c5a6f378a911b1ce2f8cffb" }, "URL" : "", "likes" : 0, "comments" : "", "aoi" : "science;", "date" : "1549430582031", "userid" : "pulkit@iu.edu", "typeofmedia" : "picture", "mediaid" : 20.0, "description" : "asdasdasd" },{ "_id" : { "$oid" : "5c5a710278435b2bd7d65ac6" }, "aoi" : "math;", "userid" : "pulkit@iu.edu", "typeofmedia" : "picture", "mediaid" : 21.0, "URL" : "", "likes" : 0, "comments" : "" },{ "_id" : { "$oid" : "5c5a71498a911b1ce2f8cffc" }, "mediaid" : 22.0, "URL" : "https://res.cloudinary.com/dks7zihas/image/upload/v1549431105/afyaez20sb7wpw3sjnzv.png", "aoi" : "math;", "date" : "1549431112308", "description" : "asdasd", "userid" : "pulkit@iu.edu", "typeofmedia" : "picture", "likes" : 0, "comments" : "" },{ "_id" : { "$oid" : "5c5b40e88a911b1ce2f8cffd" }, "mediaid" : 23.0, "URL" : "https://res.cloudinary.com/dks7zihas/image/upload/v1549484261/b0fctkduhsrj8xmfmn4o.png", "likes" : 0, "userid" : "pulkit@iu.edu", "comments" : "", "aoi" : "math;", "date" : "1549484262398", "description" : "asd", "typeofmedia" : "picture" },{ "_id" : { "$oid" : "5c5b42b178435b2bd7d65ac7" }, "mediaid" : 24.0, "URL" : "cat.jpg", "likes" : 0, "comments" : "", "aoi" : "tojdsf", "userid" : "tommy", "typeofmedia" : "picture" },{ "_id" : { "$oid" : "5c5b430464b1f2e0f47626ae" }, "likes" : 0, "comments" : "", "aoi" : "science;", "description" : "hjh", "userid" : "pulkit@iu.edu", "mediaid" : 25.0, "date" : "1549484802754", "typeofmedia" : "picture", "URL" : "https://res.cloudinary.com/dks7zihas/image/upload/v1549484801/cdoqgpe2hfjoihhl9pux.png" },{ "_id" : { "$oid" : "5c5b438264b1f2e0f47626af" }, "likes" : 0, "comments" : "", "aoi" : "science;engineering;", "userid" : "pulkit@iu.edu", "typeofmedia" : "picture", "mediaid" : 26.0, "URL" : "https://res.cloudinary.com/dks7zihas/image/upload/v1549484927/jr1qfbxwteaseghcv7h2.png", "date" : "1549484928236", "description" : "Lec me dhyan do" },{ "_id" : { "$oid" : "5c5b50fdd436cdfa9f98721a" }, "mediaid" : 27.0, "date" : "08/09/2020", "description" : "20 post", "userid" : "tommy", "typeofmedia" : "picture", "URL" : "cat.jpg", "likes" : 0, "comments" : "", "aoi" : "tojdsf" },{ "_id" : { "$oid" : "5c5b5e1473727abb88e5c58a" }, "typeofmedia" : "picture", "URL" : "cat.jpg", "likes" : 0, "aoi" : "tojdsf", "date" : "08/09/2020", "userid" : "tommy", "mediaid" : 28.0, "comments" : "", "description" : "20 post" },{ "_id" : { "$oid" : "5c5b6abfa53b6b73b1e9d8d4" }, "userid" : "tommy", "likes" : 0, "aoi" : "tojdsf", "comments" : "", "date" : "08/09/2020", "description" : "20 post", "typeofmedia" : "picture", "mediaid" : 29.0, "URL" : "dinasaur.jpg" },{ "_id" : { "$oid" : "5c5b7a954a52bdcf376805a6" }, "mediaid" : 30.0, "URL" : "dinasaur.jpg", "likes" : 0, "aoi" : "tojdsf", "userid" : "tommy", "typeofmedia" : "picture", "comments" : "", "date" : "08/09/2020", "description" : "20 post" }]

const FEED_URL = 'http://149.165.168.115:5000/getLinks';
const avarat_url = 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg';
const events = [];

export default class FeedExampleEventsProp extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        temp : "q",
        events:[]
      }
      this.parse_json = this.parse_json.bind(this);
    }
    parse_json(){
      var response = this.state.resp
      var feed_data = []
      var i;
      for(i=0; i<response.length; i++){
        var event = {};

        for (var data in response[i]){
          switch(data){
            case '_id':
              event['id'] = response[i][data]['$oid']
            case 'URL':
              event['extraImages'] = response[i][data];
              break;
            case 'date':
              event['date'] = response[i][data];
              break;
            case "userid":
              event['summary'] = response[i][data] + " shared this post:";
              break;
            case "aoi":
              var temp = response[i][data].split(';');
              var str = '| |';
              var substr = '';
              for (substr in temp){
                str += temp[substr].toUpperCase() + " |" + " "
              }
              event['meta'] = str;
              break;
            case "description":
              event['extraText'] = response[i][data];
              break;
          }
        }
        event['image'] = avarat_url;

        feed_data.unshift(event);
      }
      // console.log(feed_data);
      this.setState({
        events : feed_data,
      });
    }
    componentDidMount(){
      var temp = axios.get(FEED_URL)
        .then( response => {
          this.setState({
            resp:response.data
          })
          this.parse_json();
        }).catch(function(error){
          console.log(error);
        });

    }
//"URL" : "god.jpg", "likes" : 0, "comments" : "", "date" : "08/09/2020"
//, "userid" : "tommy", "typeofmedia" : "picture", "aoi" : "tommy", "description" : "20 post" 

    render(){

        return(
            <Feed>
              {this.state.events.map(function(event){
                  return <Event key={event.id} event={event}/>
              })}
            </Feed>
          );
    }



}
