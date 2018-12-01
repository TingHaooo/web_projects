import React, { Component } from 'react';
import { connect } from 'react-redux'
import { makeComment } from '../../store/actions/commentActions'
import uuidv4 from 'uuid/v4'
import { withRouter } from 'react-router'

class MakeComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      isOpen: false,
      articleId: props.articleId,
      commentId: uuidv4()
    }
  }

  commentButton = (e) => {
    const { auth } = this.props;
    console.log(this.props);
    auth.uid ? this.commentTrigger() : this.props.history.push('/signin');
  }

  commentTrigger = (e) => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    const { makeComment } = this.props;
    e.preventDefault();
    //dispatch makeComment action
    makeComment(this.state);
    //setState to initial
    this.setState({
      title: '',
      content: '',
      isOpen: false,
      id: ''
    })
  }

  render() {
    const { isOpen, title, content} = this.state;
    const { auth } = this.props;

    return (
      <div className="make-comment mt-3">

        <div className="d-flex justify-content-start">
          <button className="btn btn-secondary my-3" onClick={this.commentButton}>
            {auth.uid ? 'Make Comment' : 'Sign in to make a comment'}
          </button>
        </div>

        {isOpen && (<form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label frohtml="title">Title</label>
            <input onChange={this.handleChange} id="title" className="form-control" type="text" value={title} required/>
          </div>
          <div className="form-group">
            <label frohtml="content">Content</label>
            <textarea onChange={this.handleChange} rows="5" id="content" className="form-control" value={content} required></textarea>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-secondary">POST</button>
          </div>
        </form>)}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeComment: (comment) => { dispatch(makeComment(comment)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MakeComment));
