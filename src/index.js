import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//==========================================
//Comment form
class CommentForm extends React.Component {
  render() {
    return (
      <div className='main'>
        <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
          <label>Join the discussion</label>
          <div className='input-field'>
            <input placeholder='Name: ' ref={(input) => this._author = input} />
            <textarea placeholder='Comment: ' ref={(textarea) => this._body = textarea}></textarea>
          </div>
          <div className='comment-form-actions'>
            <button type='submit'>
              Post comment
          </button>
          </div>
        </form>
      </div>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }
}

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

//===============================================================
// Comment
class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        {/* <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} /> */}
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete">
            Delete comment
          </a>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<CommentBox />, document.getElementById('root'));


//=====================================================================================
//CodeSchool Code
//=====================================================================================
// class Comment extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       isAbusive: false
//     };
//   }

//   render() {
//     let commentBody;
//     if (!this.state.isAbusive) {
//       commentBody = this.props.body;
//     } else {
//       commentBody = <em>Content marked as abusive</em>;
//     }
//     return (
//       <div className="comment">
//         <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />
//         <p className="comment-header">{this.props.author}</p>
//         <p className="comment-body">
//           {commentBody}
//         </p>
//         <div className="comment-actions">
//           <a href="#">Delete comment</a>
//           <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
//         </div>
//       </div>
//     );
//   }

//   _toggleAbuse(event) {
//     event.preventDefault();

//     this.setState({
//       isAbusive: !this.state.isAbusive
//     });
//   }
// }

// class CommentBox extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       showComments: false,
//       comments: [
//         { id: 1, author: 'Morgan McCircuit', body: 'Great picture!', avatarUrl: 'images/default-avatar.png' },
//         { id: 2, author: 'Bending Bender', body: 'Excellent stuff', avatarUrl: 'images/default-avatar.png' }
//       ]
//     };
//   }

//   render() {
//     const comments = this._getComments();
//     return (
//       <div className="comment-box">
//         <CommentForm addComment={this._addComment.bind(this)} />
//         <h3>Comments</h3>
//         {this._getPopularMessage(comments.length)}
//         <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
//         <div className="comment-list">
//           {comments}
//         </div>
//       </div>
//     );
//   }

//   _getPopularMessage(commentCount) {
//     const POPULAR_COUNT = 10;
//     if (commentCount > POPULAR_COUNT) {
//       return (
//         <div>This post is getting really popular, don't miss out!</div>
//       );
//     }
//   }

//   _getComments() {
//     return this.state.comments.map((comment) => {
//       return (<Comment
//         author={comment.author}
//         body={comment.body}
//         avatarUrl={comment.avatarUrl}
//         key={comment.id} />);
//     });
//   }

//   _getCommentsTitle(commentCount) {
//     if (commentCount === 0) {
//       return 'No comments yet';
//     } else if (commentCount === 1) {
//       return '1 comment';
//     } else {
//       return `${commentCount} comments`;
//     }
//   }

//   _addComment(commentAuthor, commentBody) {
//     let comment = {
//       id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
//       author: commentAuthor,
//       body: commentBody
//     };

//     this.setState({
//       comments: this.state.comments.concat([comment])
//     });
//   }
// }

// class CommentForm extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       characters: 0
//     };
//   }

//   render() {
//     return (
//       <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
//         <label>New comment</label>
//         <div className="comment-form-fields">
//           <input placeholder="Name:" ref={input => this._author = input} />
//           <textarea
//             placeholder="Comment:"
//             ref={textarea => this._body = textarea}
//             onKeyUp={this._getCharacterCount.bind(this)}></textarea>
//         </div>
//         <p>{this.state.characters} characters</p>
//         <div className="comment-form-actions">
//           <button type="submit">
//             Post comment
//           </button>
//         </div>
//       </form>
//     );
//   }

//   _handleSubmit(event) {
//     event.preventDefault();

//     this.props.addComment(this._author.value, this._body.value);

//     this._author.value = '';
//     this._body.value = '';

//     this.setState({ characters: 0 });
//   }

//   _getCharacterCount() {
//     this.setState({
//       characters: this._body.value.length
//     });
//   }
// }

//======================================
//with validation
//=========================================
// class Comment extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       isAbusive: false
//     };
//   }

//   render() {
//     let commentBody;
//     if (!this.state.isAbusive) {
//       commentBody = this.props.body;
//     } else {
//       commentBody = <em>Content marked as abusive</em>;
//     }
//     return(
//       <div className="comment">
//         <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />
//         <p className="comment-header">{this.props.author}</p>
//         <p className="comment-body">
//           {commentBody}
//         </p>
//         <div className="comment-actions">
//           <a href="#">Delete comment</a>
//           <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
//         </div>
//       </div>
//     );
//   }

//   _toggleAbuse(event) {
//     event.preventDefault();

//     this.setState({
//       isAbusive: !this.state.isAbusive
//     });
//   }
// }

// class CommentBox extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       showComments: false,
//       comments: [
//         { id: 1, author: 'Morgan McCircuit', body: 'Great picture!', avatarUrl: 'images/default-avatar.png' },
//         { id: 2, author: 'Bending Bender', body: 'Excellent stuff', avatarUrl: 'images/default-avatar.png' }
//       ]
//     };
//   }

//   render() {
//     const comments = this._getComments();
//     return(
//       <div className="comment-box">
//         <CommentForm addComment={this._addComment.bind(this)} />
//         <h3>Comments</h3>
//         {this._getPopularMessage(comments.length)}
//         <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
//         <div className="comment-list">
//           {comments}
//         </div>
//       </div>
//     );
//   }

//   _getPopularMessage(commentCount) {
//     const POPULAR_COUNT = 10;
//     if (commentCount > POPULAR_COUNT) {
//        return (
//          <div>This post is getting really popular, don't miss out!</div>
//        );
//     }
//   }

//   _getComments() {
//     return this.state.comments.map((comment) => {
//       return (<Comment
//                author={comment.author}
//                body={comment.body}
//                avatarUrl={comment.avatarUrl}
//                key={comment.id} />);
//     });
//   }

//   _getCommentsTitle(commentCount) {
//     if (commentCount === 0) {
//       return 'No comments yet';
//     } else if (commentCount === 1) {
//       return '1 comment';
//     } else {
//       return `${commentCount} comments`;
//     }
//   }

//   _addComment(commentAuthor, commentBody) {
//     let comment = {
//       id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
//       author: commentAuthor,
//       body: commentBody
//     };

//     this.setState({
//       comments: this.state.comments.concat([comment])
//     });
//   }
// }

// class CommentForm extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       characters: 0
//     };
//   }

//   render() {
//     return (
//       <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
//         <label>New comment</label>
//         <div className="comment-form-fields">
//           <input placeholder="Name:" ref={c => this._author = c} />
//           <textarea placeholder="Comment:" ref={c => this._body = c} onChange={this._getCharacterCount.bind(this)}></textarea>
//         </div>
//         <p>{this.state.characters} characters</p>
//         <div className="comment-form-actions">
//           <button type="submit">
//             Post comment
//           </button>
//         </div>
//       </form>
//     );
//   }

//   _getCharacterCount(e) {
//     this.setState({
//       characters: this._body.value.length
//     });
//   }

//   _handleSubmit(event) {
//     event.preventDefault();

//     if (!this._author.value || !this._body.value) {
//       alert('Please enter your name and comment.');
//       return;
//     }

//     this.props.addComment(this._author.value, this._body.value);

//     this._author.value = '';
//     this._body.value = '';

//     this.setState({ characters: 0  });
//   }
// }

//==============================================================================
// With Deleting Conformation
//=================================================================================
// class CommentBox extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       showComments: false,
//       comments: []
//     };
//   }

//   componentWillMount() {
//     this._fetchComments();
//   }

//   render() {
//     const comments = this._getComments();
//     return(
//       <div className="comment-box">
//         <CommentForm addComment={this._addComment.bind(this)} />
//         <CommentAvatarList avatars={this._getAvatars()} />
//         {this._getPopularMessage(comments.length)}
//         <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
//         <div className="comment-list">
//           {comments}
//         </div>
//       </div>
//     );
//   }

//   _getAvatars() {
//     return this.state.comments.map(comment => comment.avatarUrl);
//   }

//   _getPopularMessage(commentCount) {
//     const POPULAR_COUNT = 10;
//     if (commentCount > POPULAR_COUNT) {
//        return (
//          <div>This post is getting really popular, don't miss out!</div>
//        );
//     }
//   }

//   _getComments() {
//     return this.state.comments.map((comment) => {
//       return (<Comment
//                id={comment.id}
//                author={comment.author}
//                body={comment.body}
//                avatarUrl={comment.avatarUrl}
//                onDelete={this._deleteComment.bind(this)}
//                key={comment.id} />);
//     });
//   }

//   _getCommentsTitle(commentCount) {
//     if (commentCount === 0) {
//       return 'No comments yet';
//     } else if (commentCount === 1) {
//       return '1 comment';
//     } else {
//       return `${commentCount} comments`;
//     }
//   }

//   _addComment(commentAuthor, commentBody) {
//     let comment = {
//       id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
//       author: commentAuthor,
//       body: commentBody,
//       avatarUrl: 'images/default-avatar.png'
//     };

//     this.setState({
//       comments: this.state.comments.concat([comment])
//     });
//   }

//   _fetchComments() {
//     $.ajax({
//       method: 'GET',
//       url: 'comments.json',
//       success: (comments) => {
//         this.setState({ comments });
//       }
//     });
//   }

//   _deleteComment(commentID) {
//     const comments = this.state.comments.filter(
//       comment => comment.id !== commentID
//     );

//     this.setState({ comments });
//   }
// }

// class CommentForm extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       characters: 0
//     };
//   }

//   render() {
//     return (
//       <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
//         <label>New comment</label>
//         <div className="comment-form-fields">
//           <input placeholder="Name:" ref={c => this._author = c} />
//           <textarea placeholder="Comment:" ref={c => this._body = c} onChange={this._getCharacterCount.bind(this)}></textarea>
//         </div>
//         <p>{this.state.characters} characters</p>
//         <div className="comment-form-actions">
//           <button type="submit">
//             Post comment
//           </button>
//         </div>
//       </form>
//     );
//   }

//   _getCharacterCount(e) {
//     this.setState({
//       characters: this._body.value.length
//     });
//   }

//   _handleSubmit(event) {
//     event.preventDefault();

//     if (!this._author.value || !this._body.value) {
//       alert('Please enter your name and comment.');
//       return;
//     }

//     this.props.addComment(this._author.value, this._body.value);

//     this._author.value = '';
//     this._body.value = '';

//     this.setState({ characters: 0  });
//   }
// }

// class CommentAvatarList extends React.Component {
//   render() {
//     const { avatars = [] } = this.props;
//     return (
//       <div className="comment-avatars">
//         <h4>Authors</h4>
//         <ul>
//           {avatars.map((avatarUrl, i) => (
//             <li key={i}>
//               <img src={avatarUrl} />
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }
// }

// class Comment extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       isAbusive: false
//     };
//   }

//   render() {
//     let commentBody;
//     if (!this.state.isAbusive) {
//       commentBody = this.props.body;
//     } else {
//       commentBody = <em>Content marked as abusive</em>;
//     }
//     return(
//       <div className="comment">

//         <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />

//         <p className="comment-header">{this.props.author}</p>
//         <p className="comment-body">{commentBody}</p>

//         <div className="comment-actions">
//           <RemoveCommentConfirmation onDelete={this._handleDelete.bind(this)} />
//           <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
//         </div>
//       </div>
//     );
//   }

//   _toggleAbuse(event) {
//     event.preventDefault();

//     this.setState({
//       isAbusive: !this.state.isAbusive
//     });
//   }

//   _handleDelete() {
//     this.props.onDelete(this.props.id);
//   }
// }

// class RemoveCommentConfirmation extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       showConfirm: false
//     };
//   }

//   render() {
//     let confirmNode;
//     if (this.state.showConfirm) {
//       return (
//         <span>
//           <a href="" onClick={this._confirmDelete.bind(this)}>Yes </a> - or - <a href="" onClick={this._toggleConfirmMessage.bind(this)}> No</a>
//         </span>
//       );
//     } else {
//       confirmNode = <a href="" onClick={this._toggleConfirmMessage.bind(this)}>Delete comment?</a>;
//     }
//     return (
//       <span>{confirmNode}</span>
//     );
//   }

//   _toggleConfirmMessage(e) {
//     e.preventDefault();

//     this.setState({
//       showConfirm: !this.state.showConfirm
//     });
//   }

//   _confirmDelete(e) {
//     e.preventDefault();
//     this.props.onDelete();
//   }
// }