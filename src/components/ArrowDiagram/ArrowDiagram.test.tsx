import React from 'react';
import ReactDOM from 'react-dom';
import ArrowDiagram from './ArrowDiagram';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ArrowDiagram />, div);
  ReactDOM.unmountComponentAtNode(div);
});