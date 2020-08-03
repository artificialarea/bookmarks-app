import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkItem from './BookmarkItem';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        match: { params: {} },
        history: {
            push: () => { }
        },
    }
    ReactDOM.render(
        <BrowserRouter>
            <BookmarkItem {...props} />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
