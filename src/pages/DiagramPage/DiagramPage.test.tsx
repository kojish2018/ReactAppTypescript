import React from 'react';
import ReactDOM from 'react-dom';
import DiagramPage from './DiagramPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DiagramPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});