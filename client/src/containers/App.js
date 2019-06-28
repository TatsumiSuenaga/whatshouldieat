import React, {Component} from 'react';

import Aux from './../hoc/Aux';
import Header from './../layouts/Header';
import CoreSearch from './CoreSearch';


export default class App extends Component{
  render() {
    return (
      <Aux>
        <Header />
        <CoreSearch />
      </Aux>
    );
  }
}
