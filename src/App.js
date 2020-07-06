import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
];

class App extends Component {
  state = {
    bookmarks,
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const { bookmarks } = this.state
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav />
        <div className='content' aria-live='polite'>
          <Route 
            path='/add-bookmark'
            // v1: pass route props directly
            // render={(props) => {
            //   return <AddBookmark 
            //     {...props}
            //     onAddBookmark={this.addBookmark}
            //     onClickCancel={() => { props.history.push('/') }}
            //   />
            // }}
            // v2: don't bother passing route props... 
            // import/use { withRouter } in AddBookmark.js instead
            // which is a bit like Context, removing the need for prop-drilling
            render={({history}) => {
              return <AddBookmark 
                onAddBookmark={this.addBookmark}
                onClickCancel={() => { history.push('/') }}
              />
            }}
          />
          <Route 
            exact
            path='/'
            render={() => 
              <BookmarkList 
                bookmarks={bookmarks}
              />}
          />
        </div>
      </main>
    );
  }
}

export default App;
