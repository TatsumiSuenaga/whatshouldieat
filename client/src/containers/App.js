import React, {Component} from 'react';

import Header from './../layouts/Header';
import { TitleContainer } from './TitleContainer';


export default class App extends Component{
  render() {
    return (
      <>
        <Header />
        <TitleContainer />
      </>
    );
  }
}
