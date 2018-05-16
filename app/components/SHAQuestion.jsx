import React from 'react';
import {Button} from 'react-bootstrap';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import QuestionButtons from './QuestionButtons.jsx';

export default class SHAQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_choices_ids:[],
      answered:false,

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
  onAnswerQuestion(){
    // Calculate score
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
    let scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers) / this.props.question.Opciones.filter(function(c){return c.answer === true;}).length);

    // Send data via SCORM
    let objective = this.props.objective;
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));

    // Mark question as answered
    this.setState({answered:true});
  }
  onResetQuiz(){
    this.props.onResetQuiz();
  }
  onNextQuestion(){
    this.props.onNextQuestion();
  }
  comprobar(){

    this.refs.questions.pararContador();
    this.setState({answered:true});

    let x, text;

        // Get the value of the input field with id="numb"
    x = document.getElementById("numb").value;

       // If x is Not a Number or less than one or greater than 10

    if(x != this.props.question.Opciones[0].Texto){
      text = "Error,la respuesta correcta es " + this.props.question.Opciones[0].Texto;
      let objective = this.props.objective;
      this.props.dispatch(objectiveAccomplished(objective.id, 0));

    } else {
      text = "Correcto";
      let objective = this.props.objective;
      this.props.dispatch(objectiveAccomplished(objective.id, objective.score));

    }
    document.getElementById("demo").innerHTML = text;
  }

  render(){

    let questionClassName = "question";
    let showCorrection = (this.state.answered);
    if(showCorrection){
      let x = document.getElementById("numb").value;
      if(x != this.props.question.Opciones[0].Texto){
        questionClassName += " input_incorrect";
      } else {
        questionClassName += " input_correct";
      }
    }

    return (
        <div className="container">

        <div className={questionClassName}>

        <div className="question_pregunta">

        <div className="question_pregunta_enunciado">
        <h1>{this.props.question.Enunciado}</h1>
        </div>

        <div className="question_pregunta_progreso">
        <h2>{this.props.I18n.getTrans("i.quiz_header_title", {current:this.props.index, total:this.props.quiz.length})}</h2>
        </div>

        </div>

        <div className="question_input">
        <input id="numb" type="text" />
        </div>

        <p key={this.props.index} id="demo"/>

        </div>

        <QuestionButtons comodin={this.props.comodin} index={this.props.index} ref="questions" lastQuestion={this.props.isLastQuestion} I18n={this.props.I18n} onAnswerQuestion={this.comprobar.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>

     </div>
    );
  }
}