import React from 'react';
import Countdown from './CountDown.jsx';

export default class QuestionButtons extends React.Component {
  constructor(props){
    super(props);

  }

  // <button className="resetQuestion" onClick={this.props.onResetQuestion} disabled={disable_resetQuestion}>{this.props.I18n.getTrans("i.reset_question")}</button>

  pararContador(){
    this.refs.contador.componentWillUnmount();
  }
  comodin(){
    this.props.clickComodin();
  }

  render(){
    let disable_answer = (this.props.answered || this.props.quizCompleted);
    let disable_resetQuestion = (!this.props.answered || this.props.quizCompleted);
    let disable_next = (!this.props.answered || this.props.quizCompleted);
    let resetQuiz = "";
    if((this.props.allow_finish) && (disable_next === false)){
      resetQuiz = (<button className="resetQuiz" onClick={this.props.onResetQuiz}>{this.props.I18n.getTrans("i.reset_quiz")}</button>);
    }
    return (
      <div className="questionButtonsWrapper">

      <div className="buttons">
        <button className="answerQuestion" onClick={this.props.onAnswerQuestion} disabled={this.props.answered}>{this.props.I18n.getTrans("i.answer")}</button>
        <button id="comodin" className="comodinQuestion" disabled={this.props.answered} hidden={!(this.props.comodin && this.props.stateComodin)} onClick={this.comodin.bind(this)}>Comodín</button>
        <button className="botonQuestion" ><Countdown secondsRemaining={this.props.time} ref="contador" key={this.props.index} corregir={this.props.onAnswerQuestion}/></button>
      </div>
      <div className="nextButton">
        <button className="nextQuestion" hidden={this.props.isLastQuestion} onClick={this.props.onNextQuestion} disabled={disable_next}>{this.props.allow_finish ? this.props.I18n.getTrans("i.finish_quiz") : this.props.I18n.getTrans("i.next")}</button>
      </div>

      </div>
    );
  }
}