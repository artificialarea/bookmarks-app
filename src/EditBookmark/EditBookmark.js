import React from 'react';
import PropTypes from 'prop-types';
import BookmarksContext from '../BookmarksContext';
import config from '../config';
import './EditBookmark.css';


class EditBookmark extends React.Component {

    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
        }),
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };

    static contextType = BookmarksContext;

    state = {
        error: null,
        id: '',
        title: '',
        url: '',
        description: '',
        rating: 1,
    };

    componentDidMount() {
        // QUESTION: Why make another fetch call to get bookmark object 
        // when it's already accessible in überstate/context? REFACTOR?
        const { bookmarkId } = this.props.match.params;
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error));
                }
                return res.json();
            })
            .then(resData => {
                this.setState({
                    id: resData.id,
                    title: resData.title,
                    url: resData.url,
                    description: resData.description,
                    rating: resData.rating,
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleChangeTitle = e => {
        this.setState({ title: e.target.value })
    }
    handleChangeUrl = e => {
        this.setState({ url: e.target.value })
    }
    handleChangeDescription = e => {
        this.setState({ description: e.target.value })
    }
    handleChangeRating = e => {
        this.setState({ rating: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()

        const { bookmarkId } = this.props.match.params;
        const { id, title, url, description, rating } = this.state;
        const newBookmark = { id, title, url, description, rating };


        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'PATCH',
            body: JSON.stringify(newBookmark),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                // return res.json()
            })
            .then(() => {
                this.resetFields(newBookmark)
                console.log('this.state: ', this.state)
                this.context.updateBookmark(newBookmark)
                this.props.history.push('/')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    resetFields = (newFields) => {
        this.setState({
          id: newFields.id || '',
          title: newFields.title || '',
          url: newFields.url || '',
          description: newFields.description || '',
          rating: newFields.rating || '',
        })
      }

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {
        const { error, title, url, description, rating } = this.state
        return (
            <section className='EditBookmark'>
                <h2>Create a bookmark</h2>
                <form
                    className='EditBookmark__form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='EditBookmark__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='title'>Title</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Great website!'
                            required
                            value={title}
                            onChange={this.handleChangeTitle}
                        />
                    </div>
                    <div>
                        <label htmlFor='url'>URL</label>
                        <input
                            type='url'
                            name='url'
                            id='url'
                            placeholder='https://www.great-website.com/'
                            required
                            value={url}
                            onChange={this.handleChangeUrl}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            name='description'
                            id='description'
                            value={description}
                            onChange={this.handleChangeDescription}
                        />
                    </div>
                    <div>
                        <label htmlFor='rating'>Rating</label>
                        <input
                            type='number'
                            name='rating'
                            id='rating'
                            // defaultValue='1'
                            min='1'
                            max='5'
                            required
                            value={rating}
                            onChange={this.handleChangeRating}
                        />
                    </div>
                    <div className='EditBookmark__buttons'>
                        <button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                        {' '}
                        <button type='submit'>
                            Update
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default EditBookmark;