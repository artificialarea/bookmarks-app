import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BookmarkList from './BookmarkList';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <BookmarkList />
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
});
