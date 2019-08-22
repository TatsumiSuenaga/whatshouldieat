import React, {Component} from 'react';

import Header from './../layouts/Header';
import CoreSearch from './CoreSearch';


export default class App extends Component{
  render() {
    return (
      <>
        <Header />
        <CoreSearch />
      </>
    );
  }
}
