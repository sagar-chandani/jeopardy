import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import Routing from './components/routes'

class App extends Component {
  render() {
    return (
      <Routing />
    );
  }
}
export default App;
