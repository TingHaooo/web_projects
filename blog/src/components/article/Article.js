import React from 'react'
import MakeComment from './MakeComment'
import CommentSectionList from './CommentSectionList'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import marked from 'marked';
import hljs from 'highlight.js';
import Loader from 'react-loader-spinner'
import placeholder from '../../static/placeholder.png'

class Article extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      imgOnLoad: false
    }
  }

  getMarkdownText = () => {
    // Synchronous highlighting with highlight.js
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value,
    });

    var rawMarkup = marked(this.props.article.file, {sanitize: true});
    return { __html: rawMarkup };
  }

  render() {
    const { article } = this.props;
    const { imgOnLoad } = this.state;

    return article ? (
      <div className="article-container container pb-5">
        <h1 className="text-center py-3">{article.title}</h1>
        <img src={article.img} alt="" className="img-fluid rounded"/>
        <div className="row mt-5">
          <div className="col-0 col-md-1"></div>
          <div className="col-12 col-md-9">
            <div className="article" dangerouslySetInnerHTML={this.getMarkdownText()}></div>
            <div className="comment-container container mt-5">
              <h2 className="text-center pt-5">Comment</h2>
              <MakeComment articleId={this.props.match.params.id}/>
              {article.comments && <CommentSectionList comments={article.comments} />}
            </div>
          </div>
          <div className="col-0 col-md-1"></div>
        </div>
      </div>
    ):
    (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh', width: '100vw'}}>
        {/* <Loader
         type="Puff"
         color="#00BFFF"
         height="100"
         width="100"
       /> */}
      </div>
    )
  }
}

const mapStateToProps = (state, selfProps) => {

  const id = selfProps.match.params.id;
  const data = state.firestore.data;
  const article = data.articles && data.articles[id];

  return {
    article: article
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'comments', orderBy: ['createAt', 'desc']},
    {collection: 'articles', orderBy: ['createAt', 'desc']}
  ])
)(Article)
