import React from 'react'
import CommentSection from './CommentSection'

const CommentSectionList = (props) => {

  const { comments } = props;
  const commentSectionList = comments && Object.keys(comments).map((key) => {
    return (
      <CommentSection comment={comments[key]} key={key}/>
    )
  })

  return (
    <div className="commentSectionList">
      {commentSectionList}
    </div>
  )
}

export default CommentSectionList
