import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import QuestionButtons from './QuestionButtons.jsx';

export default class SortingQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_choices_ids:[],
      answered:false,
      boton1:1,
      boton2:4,
      boton3:2,
      boton4:3,
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

  onNextQuestion(){

    document.getElementById("respuestaSorting").innerHTML = "";
    this.props.onNextQuestion();
  }
  boton1(){
    let newValue = this.state.boton1 + 1;
    if(newValue == 5){
      this.setState({boton1:1});
      return;
    }
    this.setState({boton1:newValue});
  }
  boton2(){
    let newValue = this.state.boton2 + 1;
    if(newValue == 5){
      this.setState({boton2:1});
      return;
    }
    this.setState({boton2:newValue});
  }
  boton3(){
    let newValue = this.state.boton3 + 1;
    if(newValue == 5){
      this.setState({boton3:1});
      return;
    }
    this.setState({boton3:newValue});
  }
  boton4(){
    let newValue = this.state.boton4 + 1;
    if(newValue == 5){
      this.setState({boton4:1});
      return;
    }
    this.setState({boton4:newValue});
  }
  comprobarSorting(){

    this.refs.questions.pararContador();

    /* function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }*/

    let resp1 = this.props.question.Opciones[0];
    let resp2 = this.props.question.Opciones[1];
    let resp3 = this.props.question.Opciones[2];
    let resp4 = this.props.question.Opciones[3];

    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    if(resp1.Id == 1){
      a = 0;
    } else if(resp1.Id == 2){
      b = 0;
    } else if(resp1.Id == 3){
      c = 0;
    } else {
      d = 0;
    }

    if(resp2.Id == 1){
      a = 1;
    } else if(resp2.Id == 2){
      b = 1;
    } else if(resp2.Id == 3){
      c = 1;
    } else {
      d = 1;
    }

    if(resp3.Id == 1){
      a = 2;
    } else if(resp3.Id == 2){
      b = 2;
    } else if(resp3.Id == 3){
      c = 2;
    } else {
      d = 2;
    }

    if(resp4.Id == 1){
      a = 3;
    } else if(resp4.Id == 2){
      b = 3;
    } else if(resp4.Id == 3){
      c = 3;
    } else {
      d = 3;
    }

    let objective = this.props.objective;

    if(this.state.boton1 == resp1.Texto && this.state.boton2 == resp2.Texto && this.state.boton3 == resp3.Texto && this.state.boton4 == resp4.Texto){

      document.getElementById("respuestaSorting").innerHTML = "Genial";
      this.props.dispatch(objectiveAccomplished(objective.id, objective.score * 1));

    }
    else {

      this.props.dispatch(objectiveAccomplished(objective.id, objective.score * 0));
      let text = "Error, la solucion es " + this.props.question.Opciones[a].Valor + ">" + this.props.question.Opciones[b].Valor + ">" + this.props.question.Opciones[c].Valor + ">" + this.props.question.Opciones[d].Valor;

      document.getElementById("respuestaSorting").innerHTML = text;

    }

    this.setState({answered:true});

  }
  reset(){
    this.props.onResetQuiz();
  }

  render(){

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

        <div className = "question_choice_sorting">
        <button disabled={this.state.answered} onClick={this.boton1.bind(this)}>{this.state.boton1}</button><p>{this.props.question.Opciones[0].Valor}</p>
        </div>

        <div className = "question_choice_sorting">
        <button disabled={this.state.answered} onClick={this.boton2.bind(this)}>{this.state.boton2}</button><p>{this.props.question.Opciones[1].Valor}</p>
        </div>

        <div className = "question_choice_sorting">
        <button disabled={this.state.answered} onClick={this.boton3.bind(this)}>{this.state.boton3}</button><p>{this.props.question.Opciones[2].Valor}</p>
        </div>

        <div className = "question_choice_sorting">
        <button disabled={this.state.answered} onClick={this.boton4.bind(this)}>{this.state.boton4}</button><p>{this.props.question.Opciones[3].Valor}</p>
        </div>

        <p id="respuestaSorting" />

        </div>

        <QuestionButtons time={this.props.time} onResetQuiz={this.reset.bind(this)} comodin={this.props.comodin} index={this.props.index} ref="questions" lastQuestion={this.props.isLastQuestion} I18n={this.props.I18n} onAnswerQuestion={this.comprobarSorting.bind(this)} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>

     </div>
    );
  }
}