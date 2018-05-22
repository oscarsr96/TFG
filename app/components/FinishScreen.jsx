import React from 'react';
import './../assets/scss/finish_screen.scss';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default class FinishScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nota:"",
    };
  }

  componentDidMount(){

    if(this.props.tracking.score < 0.5){
      let mark = this.props.I18n.getTrans("i.finalMarkSuspenso");
      this.setState({nota:mark})
      return;
    }else if(this.props.tracking.score <0.7){
      let mark = this.props.I18n.getTrans("i.finalMarkBien");
      this.setState({nota:mark})
      return;
    }else if(this.props.tracking.score <0.9){
      let mark = this.props.I18n.getTrans("i.finalMarkNotable");
      this.setState({nota:mark})
      return;
    }else{
      let mark = this.props.I18n.getTrans("i.finalMarkSobresaliente");
      this.setState({nota:mark})
      return;
    }
  }
  /* _getFinishScreenTitle(progress_measure, score){
    let finishTitleText;
    let hasProgressMeasure = (typeof progress_measure === "number");
    let hasScore = (typeof score === "number");
    if(hasProgressMeasure && hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_full", {progress_measure:(progress_measure * 100).toFixed(1), score:(score * 100).toFixed(1)});
    } else if(hasProgressMeasure){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_wpm", {progress_measure:(progress_measure * 100).toFixed(1)});
    } else if(hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_ws", {score:(score * 100).toFixed(1)});
    }
    if(typeof finishTitleText === "undefined"){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_simple");
    }
    return finishTitleText;
  }*/
  _getFinishScreenTitle(score){
    console.log("puntuacion final" + this.props.tracking.score);
    let finishTitleText;
    let hasScore = (typeof score === "number");
    if(hasScore){

      finishTitleText = (score * 100).toFixed(2);
    }
    if(typeof finishTitleText === "undefined"){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_simple");
    }
    return finishTitleText;
  }

  








  render(){
    let finishTitleText = this._getFinishScreenTitle(this.props.tracking.progress_measure, this.props.tracking.score);
    return (
      <div className="finish_screen">
        <div className="nota">
        <h1>{this.state.nota}</h1>
        </div>
        <div className="circle">
        <CircularProgressbar percentage={(this.props.tracking.score * 100).toFixed(2)}/>
        </div>
      </div>
    );
  }
}