import { CREATE_ARTICLE, CREATE_ARTICLE_ERROR } from './actionTypes'

export const makeArticle = article => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {

    const firebase = getFirebase();
    const firestore = getFirestore();
    var storage = firebase.storage();
    var filePathReference = storage.ref(article.filePath);

    // fetch article file from firebase storage
    filePathReference.getDownloadURL()
    .then(url => {
      fetch(url).then(res => res.text()).then(file => {
        console.log(file);
        // add ariticle to filrebase
        firestore.collection('articles').add({
          title :article.title,
          label: article.label,
          img: article.img,
          summary: article.summary,
          file: file,
          comments: {},
          createAt: new Date()
        })
        .then(() => {
          dispatch({type: CREATE_ARTICLE, article})
        })
        .catch(err => {
          dispatch({type: CREATE_ARTICLE_ERROR, err})
        })
      })
    })

  }
}
