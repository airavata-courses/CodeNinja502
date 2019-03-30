import React from 'react';
import qs from 'qs';
import GET_ERRORS from '../actions/types';
const CREATE_POST_URL ='http://149.165.170.128:30003/rpc';

const axios = require("axios");

class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            email:'',
            aois:'',
            content:'',
            img_url:'',
            selectedFile : null
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.createPost = this.createPost.bind(this);
        this.handleselectedFile = this.handleselectedFile.bind(this);
    }
    handleselectedFile = event => {
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
    }

    handleUpload = (e) => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        if (! (this.state.selectedFile == null ))
        {
            if (! this.state.selectedFile.name == '')
            {
		    console.log(data + this.state.selectedFile)
                axios
                  .post('http://149.165.170.76:5000/upload/upload', data, {
                    onUploadProgress: ProgressEvent => {
                      this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                      })
                    },
                  })
                  .then(res => {
                    if(res.status == 200){
                      this.setState({
                        img_url : res.data.secure_url,
                      }, ()=>{
                        this.createPost();
                      }
                      );
                    }
                  }).catch(err =>{
                    this.setState({
                        errors : err.response.data.image
                    }, () =>{
                        window.alert(this.state.errors);
                    })
                  })
            }
        }
        else{

            this.createPost();  
        }

    }  

     createPost(){
        //e.preventDefault();
        var copyOptions = '';
        var i=0;
        for (i=0; i<this.state.aois.length; i++){
            copyOptions += this.state.aois[i]['value'] + ';';
        }


        const feed_post = {
                    "AOItags": copyOptions,
                    "description": this.state.content,
                    "URL":this.state.img_url,
                    "userid": this.state.email,
                    "typeofmedia" :"picture",
                    "date": Date.now().toString(),
        
                }
        if( this.state.content == ''){
            window.alert('Please provide the project description');
        }else{
            axios.post(CREATE_POST_URL, feed_post).
                        then(function(response){
                        })
                        .catch(function(errors){
                            console.log(errors);
                        })
              window.location.reload();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        else{
            this.setState({
                
                email: nextProps.email,
                aois: nextProps.aois,
                content:nextProps.content
            });
        }
    }
    render() {
        return (
            <form onSubmit={this.createPost}>
                <input type="file" name="myImage" className="btn" onChange={this.handleselectedFile} />
                <button type="button" onClick={this.handleUpload} className="btn btn-primary" style={{display:'block', marginTop:'4px'}}>Create Post</button>
            </form>
        )
    }
}

export default ReactUploadImage
