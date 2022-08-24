import React from 'react';
import ReactDOM from 'react-dom';
import ReactFlowComponent from './ReactFlowComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReactFlowComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});