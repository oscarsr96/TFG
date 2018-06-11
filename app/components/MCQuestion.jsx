import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import MCQuestionChoice from './MCQuestionChoice.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class MCQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_choices_ids:[],
      answered:false,
      key:0,
    };
  }
  componentWillUpdate(prevProps, prevState){
    if(prevProps.question !== this.props.question){
      this.setState({selected_choices_ids:[], answered:false});
    }
  }
  handleChoiceChange(choice){
    let newSelectedChoices = Object.assign([], this.state.selected_choices_ids);
    let indexOf = newSelectedChoices.indexOf(choice.Id);
    if(indexOf === -1){
      newSelectedChoices.push(choice.Id);
    } else {
      newSelectedChoices.splice(indexOf, 1);
    }
    this.setState({selected_choices_ids:newSelectedChoices});
  }
  comodinMitad(){

    document.getElementById("comodin").disabled = true;

    let nChoices = this.props.question.Opciones.length;
    let nFalses = 0;

    for(let i = 0; i < nChoices; i++){
      if(this.props.question.Opciones[i].Valor == 0 && nFalses != 1){
        document.getElementById(200 * i + 200).style = "display: none";
        nFalses++;
      }

    }

  }

  onAnswerQuestion(){
    // Calculate score
    document.getElementById("comodin").disabled = true;

    this.refs.questions.pararContador();

    let nChoices = this.props.question.Opciones.length;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let blankAnswers = 0;

    for(let i = 0; i < nChoices; i++){
      let choice = this.props.question.Opciones[i];
      if(this.state.selected_choices_ids.indexOf(choice.Id) !== -1){
        // Answered choice
        if(choice.Valor == 100){
          correctAnswers += 1;
        } else {
          incorrectAnswers += 1;
        }
      } else {
        blankAnswers += 1;
      }
    }
    let totalCorrectAnswers = 0;
    for(let x = 0; x < this.props.question.Opciones.length; x++){
      if(this.props.question.Opciones[x].Valor == 100){
        totalCorrectAnswers++;
      }
    }

    let scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers) / totalCorrectAnswers);
    // Send data via SCORM
    let objective = this.props.objective;

    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));

    // Mark question as answered
    this.setState({answered:true});
    console.log(blankAnswers)
  }
  onResetQuestion(){
    this.setState({selected_choices_ids:[], answered:false});
  }
  onNextQuestion(){
    this.props.onNextQuestion();
    document.getElementById("comodin").disabled = false;

    let nChoices = this.props.question.Opciones.length;
    let nFalses = 0;

    /*for(let i = 0; i < nChoices; i++){
      if(this.props.question.Opciones[i].Valor == 0 && nFalses != 1){
        document.getElementById(200 * i + 200).style = "display: inline";
        nFalses++;
      }

    }*/

  }
  render(){

    let choices = [];
    let opciones = [0, 1, 2, 3];

    for(let i = 0; i < this.props.question.Opciones.length; i++){

      choices.push(<MCQuestionChoice id={200 * i + 200} key={"MyQuestion_" + "question_choice_" + i} options={this.state.selected_choices_ids.length} choice={this.props.question.Opciones[i]} checked={this.state.selected_choices_ids.indexOf(this.props.question.Opciones[i].Id) != -1} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);
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

        <QuestionButtons time={this.props.time} comodin={this.props.comodin} clickComodin={this.comodinMitad.bind(this)} index={this.props.index} ref="questions" lastQuestion={this.props.isLastQuestion} I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>

      </div>

    );
  }
}