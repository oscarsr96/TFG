import React from 'react';
import './../assets/scss/quiz.scss';

import * as Utils from '../vendors/Utils.js';
import {addObjectives, objectiveAccomplished, updateUserProfile} from './../reducers/actions';

import $ from 'jquery';

export default class Countdown extends React.Component {

  constructor(props){
 	super(props);
    this.state = {
    	secondsRemaining:0,
    };
    this.tick = this.tick.bind(this);

  }

  tick(){
    this.setState({secondsRemaining:this.state.secondsRemaining - 1});
    if(this.state.secondsRemaining <= 0){
      clearInterval(this.interval);
      this.props.corregir();
    }
  }

  componentDidMount(){
    this.setState({secondsRemaining:this.props.secondsRemaining});
    this.interval = setInterval(this.tick, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  render(){
    return (
    	<div>{this.state.secondsRemaining}</div>
    );
  }
}