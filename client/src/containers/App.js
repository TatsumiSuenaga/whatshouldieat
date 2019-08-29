import React, {Component} from 'react';

import Header from './../layouts/Header';
// import CoreSearch from './CoreSearch';
import { CoreTitleContainer } from './CoreTitleContainer';


export default class App extends Component{
  render() {
    return (
      <>
        <Header />
        {/* <CoreSearch /> */}
        <CoreTitleContainer />
      </>
    );
  }
}
