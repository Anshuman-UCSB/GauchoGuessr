import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pano from './Pano';

function App() {
  return (
    <div className="App">
      <Pano width="1000" height="1000" src="https://i.imgur.com/0UpDels.png" title="Demo" />
    </div>
  );
}

export default App;
