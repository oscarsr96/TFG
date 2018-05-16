import React from 'react';
import './../assets/scss/finish_screen.scss';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default class FinishScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      npta:"",
    };
  }

  componentDidMount(){

    if(this.props.tracking.score < 0.5){
      this.setState({nota:"SUSPENSO"})
      return;
    }else if(this.props.tracking.score <0.7){
      this.setState({nota:"BIEN"});
      return;
    }else if(this.props.tracking.score <0.9){
      this.setState({nota:"NOTABLE ALTO"});
      return;
    }else{
      this.setState({nota:"SOBRESALIENTE"});
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
        <h1> Has acabado el quiz. Has sacado un {this.state.nota}</h1>
        </div>
        <div className="circle">
        <CircularProgressbar percentage={(this.props.tracking.score * 100).toFixed(2)}/>
        </div>
      </div>
    );
  }
}