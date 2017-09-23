//============================================================
// Comment Box
class CommentBox extends React.Component {

  _getCommments() {

    return this.state.comments.map((comment) => {
      return (
        <Comment
          author={comment.author}
          body={comment.body}
          /* avatarUrl={comment.avatarUrl} */
          key={comment.id} />
      );
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return 'I comment';
    } else {
      return `${commentCount} comments`
    }
  }

  //Set State Object
  constructor() {
    super();
    this.state = {
      showComments: false,
      comments: [
        // { id: 1, author: 'Morgan McCircuit', body: 'Great picture!', /*avatarUrl: 'images/default-avatar.png'*/ },
        // { id: 2, author: 'Bending Bender', body: 'Excellent stuff', /*avatarUrl: 'images/default-avatar.png'*/ }
      ]
    };
  }
  // Set State true or false
  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  render() {
    const comments = this._getCommments() || [];
    let commentNodes;
    if (this.state.showComments) {
      commentNodes = <div className='comment-list'>{comments}</div>;
    }

    //Change Button text on every click
    let buttonText = 'Show comments';

    if (this.state.showComments) {
      buttonText = 'Hide comments';
    }
    return (
      <div className='comment-box'>

        <CommentForm addComment={this._addComment.bind(this)} />

        <h3>Comments</h3>
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)} comments
        </h4>
        {commentNodes}
        {/* <div className="comment-list">
          {comments}
        </div> */}
      </div>
    )
  }

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body
    }
    this.setState({ comments: this.state.comments.concat([comment]) }); //we used concat instad of push.
  }
}
