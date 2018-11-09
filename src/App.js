import React, { Component } from 'react';
import './styles/mainStyle.css';
import './styles/modalStyle.css';
import { Modal } from './components/modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: false,
      postContentChanged: false,
      postId: 0,
      postOriginalTitle: '',
      postOriginalContent: '',
      postTitle: '',
      postContent: '',
      postTime: '',
    };
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);
    this.saveContent = this.saveContent.bind(this);
  }
  handleContentChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handlePostChange(e) {
    e.preventDefault();
    let classHandler = this;
    const { postId } = this.state;

    if (postId >= 1) {
      fetch("https://jsonplaceholder.typicode.com/posts/" + postId, {
        method: "GET"
      })
        .then(function(response) {
          if (response.status !== 200) {
            return;
          }
          response.json().then(function(data) {
            if (data !== undefined) {
              classHandler.setState({
                postTitle: data.title,
                postOriginalTitle: data.title,
                postContent: data.body,
                postOriginalContent: data.body,
              });
            }
          });
        });
      Modal.openModal('edit-modal');
    }
  }
  saveContent(e) {
    e.preventDefault();
    const { postId, postContentChanged } = this.state;
    if (postId >= 1) {
      if (this.state.postOriginalTitle !== this.state.postTitle || this.state.postOriginalTitle !== this.state.postContent) {
        var currentdate = new Date(); 
        let datetime = currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/"
                        + currentdate.getFullYear() + " "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":"
                        + currentdate.getSeconds();
        this.setState({ postContentChanged: !postContentChanged, postTime: datetime });
      }
      Modal.closeModal('edit-modal');
    }
  }
  render() {
    return (
      <div className="center">
        <h1>Post content checker</h1>
        <div className="card container">
          <h2>PostId</h2>
          <input type="number" name="postId" value={this.state.postId} onChange={this.handleContentChange} />
          &nbsp;&nbsp;
          <button onClick={this.handlePostChange}>Edit</button>
          <div>&nbsp;</div>
        </div>
        <div>
          &nbsp;
        </div>
        <Modal id="edit-modal">
          <div className="center">
            <h1>Post Editing: {this.state.postId} </h1>
            <div className="block">
                <label>Post Title:</label>&nbsp;
                <input type="text" name="postTitle" value={this.state.postTitle} onChange={this.handleContentChange} />
            </div>
            <br/>
            <div className="block">
                <label>Post Content:</label>&nbsp;
                <input type="text" name="postContent" value={this.state.postContent} onChange={this.handleContentChange} />
            </div>
            <br/>
            <div className="buttons">
              <button onClick={this.saveContent}>Save</button>&nbsp;&nbsp;&nbsp;
              <button onClick={Modal.close('edit-modal')}>Close</button>
            </div>
            <br/>
          </div>
        </Modal>
        <br/>
        {this.state.postContentChanged ?
          <div className="card-post container">
            <br/>
            <div className="block">
                <label>Post ID:</label>&nbsp;
                <p>{this.state.postId}</p>
            </div>
            <br/>
            <div className="block">
                <label>Post Title:</label>&nbsp;
                <p>{this.state.postTitle}</p>
            </div>
            <br/>
            <div className="block">
                <label>Post Content:</label>&nbsp;
                <p>{this.state.postContent}</p>
            </div>
            <br/>
            <div className="block">
                <label>Time Modification:</label>&nbsp;
                <p>{this.state.postTime}</p>
            </div>
          </div>
        : ''}
      </div>
    );
  }
}

export default App;
