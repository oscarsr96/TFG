import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import TrueFalseChoice from './TrueFalseChoice.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class TrueFalseQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_choices_ids:[],
      answered:false,
      key:0,
      comodin:true,
      selected_choice:"",
    };
  }
  componentWillUpdate(prevProps, prevState){
    if(prevProps.question !== this.props.question){
      this.setState({selected_choices_ids:[], answered:false});
    }
  }
  handleChoiceChange(choice){
    let newSelectedChoice = choice;
    this.setState({selected_choice:newSelectedChoice});
}
 

  onAnswerQuestion(){
    // Calculate score

    this.refs.questions.pararContador();
    let objective = this.props.objective;
    
    if(this.state.selected_choice.Valor === "100"){
      // Send data via SCORM
      

      this.props.dispatch(objectiveAccomplished(objective.id, objective.score * 1))
    }
    else{
      this.props.dispatch(objectiveAccomplished(objective.id, objective.score * 0))

    }
    // Mark question as answered
    this.setState({answered:true});
  }
  
  onNextQuestion(){
    this.props.onNextQuestion();
    document.getElementById("comodin").disabled = false;

    let nChoices = this.props.question.Opciones.length;
    let nFalses = 0;

  }

  render(){

     let choices = [];
     for(let i = 0; i < this.props.question.Opciones.length; i++){
      let checked = false;
      if(this.state.selected_choice === this.props.question.Opciones[i]){
        checked = true;
      }
      choices.push(<TrueFalseChoice key={"MyQuestion_" + "question_choice_" + i} choice={this.props.question.Opciones[i]}  checked={checked} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);
      }   
    return (
      <div className="container">

      <div className="question">

        <div className="question_pregunta">

        <div className="question_pregunta_enunciado">
        <h1>{this.props.question.Enunciado}</h1>
        </div>

        <div className="question_pregunta_progreso">
        <h2>{this.props.I18n.getTrans("i.quiz_header_title", {current:this.props.index, total:this.props.quiz.length})}</h2>
        </div>

        </div>

        {choices}
      </div>

        <QuestionButtons time={this.props.time}  comodin={this.props.comodin}  index={this.props.index} ref="questions" lastQuestion={this.props.isLastQuestion} I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)}  onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>

      </div>

    );
  }
}