import React from 'react';
const CREATE_POST = '';

const axios = require("axios");

class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            email:'',
            aois:'',
            content:'',
            img_url:''
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
        
        axios
          .post('/upload/upload', data, {
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
              });

            }
          })
    }  

    createPost(e){
        e.preventDefault();
        var copyOptions = '';
        var i=0;
        for (i=0; i<this.state.aois.length; i++){
            copyOptions += this.state.aois[i]['value'] + ';';
        }


        console.log(copyOptions);
        
        const feed_post = {
          endpoint:{
                    AOItags: copyOptions,
                    description: this.state.content,
                    URL:this.state.img_url,
                    userid: this.state.email,
                    typeofmedia :"picture",
                    date: Date.now().toString(),
        
                },
          service: "uploadService"
              }
        console.log(feed_post);
        axios.post(
                CREATE_POST,
                feed_post).
                    then(function(response){
                        console.log(response);
                    })
                    .catch()
                
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
                <button onClick={this.handleUpload} className="btn btn-primary" style={{display:'block', marginBottom:'4px'}}>Upload</button>
                <button type="submit" className="btn btn-primary"> Create Post </button>
            </form>
        )
    }
}

export default ReactUploadImage