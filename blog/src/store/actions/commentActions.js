import { CREATE_COMMENT, CREATE_COMMENT_ERROR, REPLY_COMMENT, REPLY_COMMENT_ERROR } from './actionTypes'

export const makeComment = comment => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {

    const firestore = getFirestore();
    const state = getState();
    const article = firestore.collection('articles').doc(comment.articleId);

    article.update({
      [`comments.${comment.commentId}`]: {
          title: comment.title,
          content: comment.content,
          commentId: comment.commentId,
          articleId: comment.articleId,
          replies: [],
          authorFirstName: state.firebase.profile.firstName,
          authorLastName: state.firebase.profile.lastName,
          initial: state.firebase.profile.initial,
          createAt: new Date()
        }

    })
    .then(() => {
      dispatch({type: CREATE_COMMENT, comment})
    })
    .catch(err => {
      dispatch({type: CREATE_COMMENT_ERROR, err})
    })
  }
}

export const replyComment = replyCommentInfo => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {

    const firestore = getFirestore();
    const state = getState();
    const article = firestore.collection('articles').doc(replyCommentInfo.articleId);

    article.update({
      [`comments.${replyCommentInfo.commentId}.replies`]:
            firestore.FieldValue.arrayUnion({
            ...replyCommentInfo,
            authorFirstName: state.firebase.profile.firstName,
            authorLastName: state.firebase.profile.lastName,
            initial: state.firebase.profile.initial,
            createAt: new Date()
          })
    })
    .then(() => {
      dispatch({type: REPLY_COMMENT, replyComment})
    })
    .catch(err => {
      dispatch({type: REPLY_COMMENT_ERROR, err})
    })
  }
}
