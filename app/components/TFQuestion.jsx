import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../reducers/actions';

import TFQuestionChoice from './TFQuestionChoice.jsx';
import QuestionButtons from './QuestionButtons.jsx';
import {RadioGroup, Radio} from 'react-radio-group';

export default class TFQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_choices_ids:[],
      answered:false,
      key:0,
      selectedValue1:"",
      selectedValue2:"",
      selectedValue3:"",
      selectedValue4:"",
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
      if(this.props.question.Opciones[i].Valor == 0 && nFalses != 2){
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

    console.log("nchoices vale " + nChoices);
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let blankAnswers = 0;

    switch (nChoices){

    case 2:

      if(this.props.question.Opciones[0].Valor == 0){

        if(this.state.selectedValue1 == "true"){
          incorrectAnswers += 1;
        } else if(this.state.selectedValue1 == "false"){
          correctAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[0].Valor == 100){

        if(this.state.selectedValue1 == "true"){
          correctAnswers += 1;
        } else if(this.state.selectedValue1 == "false"){
          incorrectAnswers += 1;
        } else {
          blankAnswers += 1;
        }

      }

      if(this.props.question.Opciones[1].Valor == 0){

        if(this.state.selectedValue2 == "true"){
          incorrectAnswers += 1;
        } else if(this.state.selectedValue2 == "false"){
          correctAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[1].Valor == 100){

        if(this.state.selectedValue2 == "true"){
          correctAnswers += 1;
        } else if(this.state.selectedValue2 == "false"){
          incorrectAnswers += 1;
        } else {
          blankAnswers += 1;
        }

      }

      break;
    case 3:

      if(this.props.question.Opciones[0].Valor == 0){

        if(this.state.selectedValue1 == "true"){
          incorrectAnswers += 1;
        } else if(this.state.selectedValue1 == "false"){
          correctAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[0].Valor == 100){

        if(this.state.selectedValue1 == "true"){
          correctAnswers += 1;
        } else if(this.state.selectedValue1 == "false"){
          incorrectAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[1].Valor == 0){

        if(this.state.selectedValue2 == "true"){
          incorrectAnswers += 1;
        } else if(this.state.selectedValue2 == "false"){
          correctAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[1].Valor == 100){

        if(this.state.selectedValue2 == "true"){
          correctAnswers += 1;
        } else if(this.state.selectedValue2 == "false"){
          incorrectAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[2].Valor == 0){

        if(this.state.selectedValue3 == "true"){
          incorrectAnswers += 1;
        } else if(this.state.selectedValue3 == "false"){
          correctAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[2].Valor == 100){

        if(this.state.selectedValue3 == "true"){
          correctAnswers += 1;
        } else if(this.state.selectedValue3 == "false"){
          incorrectAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }
      break;
    case 4:

      if(this.props.question.Opciones[0].Valor == 0){

        if(this.state.selectedValue1 == "true"){
          incorrectAnswers += 1;
        } else if(this.state.selectedValue1 == "false"){
          correctAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[0].Valor == 100){

        if(this.state.selectedValue1 == "true"){
          correctAnswers += 1;
        } else if(this.state.selectedValue1 == "false"){
          incorrectAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[1].Valor == 0){

        if(this.state.selectedValue2 == "true"){
          incorrectAnswers += 1;
        } else if(this.state.selectedValue2 == "false"){
          correctAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[1].Valor == 100){

        if(this.state.selectedValue2 == "true"){
          correctAnswers += 1;
        } else if(this.state.selectedValue2 == "false"){
          incorrectAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[2].Valor == 0){

        if(this.state.selectedValue3 == "true"){
          incorrectAnswers += 1;
        } else if(this.state.selectedValue3 == "false"){
          correctAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[2].Valor == 100){

        if(this.state.selectedValue3 == "true"){
          correctAnswers += 1;
        } else if(this.state.selectedValue3 == "false"){
          incorrectAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[3].Valor == 0){

        if(this.state.selectedValue4 == "true"){
          incorrectAnswers += 1;
        } else if(this.state.selectedValue4 == "false"){
          correctAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }

      if(this.props.question.Opciones[3].Valor == 100){

        if(this.state.selectedValue4 == "true"){
          correctAnswers += 1;
        } else if(this.state.selectedValue4 == "false"){
          incorrectAnswers += 1;
        } else {
          blankAnswers += 1;
        }
      }
      break;

    }

    /* for(let i = 0; i < nChoices; i++){
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
    }*/

    let totalCorrectAnswers = 0;
    let scorePercentage = 0;
    if(blankAnswers != 0){
      scorePercentage = 0;

    } else {
      scorePercentage = Math.max(0, (correctAnswers - 2 * incorrectAnswers) / correctAnswers);
    }
    // Send data via SCORM
    let objective = this.props.objective;

    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));

    // Mark question as answered
    this.setState({answered:true});
  }
  onResetQuestion(){
    this.setState({selected_choices_ids:[], answered:false});
  }
  handleChange(value){
    this.setState({selectedValue1:value});
  }
  handleChange2(value){
    this.setState({selectedValue2:value});
  }
  handleChange3(value){
    this.setState({selectedValue3:value});
  }
  handleChange4(value){
    this.setState({selectedValue4:value});
  }
  onNextQuestion(){
    this.props.onNextQuestion();
    document.getElementById("comodin").disabled = false;

    let nChoices = this.props.question.Opciones.length;
    let nFalses = 0;

    /* for(let i = 0; i < nChoices; i++){
      if(this.props.question.Opciones[i].Valor == 0 && nFalses != 2){
        document.getElementById(200 * i + 200).style = "display: inline-block, background: white";
        nFalses++;
      }

    }*/
    this.setState({selectedValue1:"", selectedValue2:"", selectedValue3:"", selectedValue4:""});
  }
  render(){

    let choices = [];
    let opciones = [0, 1, 2, 3];

    let questionClassName1 = "truefalse";
    let questionClassName2 = "truefalse";
    let questionClassName3 = "truefalse";
    let questionClassName4 = "truefalse";

    let showCorrection = (this.state.answered);
    if(showCorrection){

      if(this.props.question.Opciones.length == 2){

        if(this.state.selectedValue1 == "true" && this.props.question.Opciones[0].Valor == 100 || this.state.selectedValue1 == "false" && this.props.question.Opciones[0].Valor == 0){
          questionClassName1 = "truefalse_correcto";
        }
        if(this.state.selectedValue1 == ""){
          questionClassName1 = "truefalse_blanco";
        }
        if(this.state.selectedValue1 == "false" && this.props.question.Opciones[0].Valor == 100 || this.state.selectedValue1 == "true" && this.props.question.Opciones[0].Valor == 0){
          questionClassName1 = "truefalse_incorrecto";
        }

        if(this.state.selectedValue2 == "true" && this.props.question.Opciones[1].Valor == 100 || this.state.selectedValue2 == "false" && this.props.question.Opciones[1].Valor == 0){
          questionClassName2 = "truefalse_correcto";
        }
        if(this.state.selectedValue1 == ""){
          questionClassName2 = "truefalse_blanco";
        }
        if(this.state.selectedValue2 == "false" && this.props.question.Opciones[1].Valor == 100 || this.state.selectedValue2 == "true" && this.props.question.Opciones[1].Valor == 0){
          questionClassName2 = "truefalse_incorrecto";
        }

      }

      if(this.props.question.Opciones.length == 3){

        if(this.state.selectedValue1 == "true" && this.props.question.Opciones[0].Valor == 100 || this.state.selectedValue1 == "false" && this.props.question.Opciones[0].Valor == 0){
          questionClassName1 = "truefalse_correcto";
        }
        if(this.state.selectedValue1 == ""){
          questionClassName1 = "truefalse_blanco";
        }
        if(this.state.selectedValue1 == "false" && this.props.question.Opciones[0].Valor == 100 || this.state.selectedValue1 == "true" && this.props.question.Opciones[0].Valor == 0){
          questionClassName1 = "truefalse_incorrecto";
        }

        if(this.state.selectedValue2 == "true" && this.props.question.Opciones[1].Valor == 100 || this.state.selectedValue2 == "false" && this.props.question.Opciones[1].Valor == 0){
          questionClassName2 = "truefalse_correcto";
        }
        if(this.state.selectedValue1 == ""){
          questionClassName2 = "truefalse_blanco";
        }
        if(this.state.selectedValue2 == "false" && this.props.question.Opciones[1].Valor == 100 || this.state.selectedValue2 == "true" && this.props.question.Opciones[1].Valor == 0){
          questionClassName2 = "truefalse_incorrecto";
        }

        if(this.state.selectedValue3 == "true" && this.props.question.Opciones[2].Valor == 100 || this.state.selectedValue3 == "false" && this.props.question.Opciones[2].Valor == 0){
          questionClassName3 = "truefalse_correcto";
        }
        if(this.state.selectedValue3 == ""){
          questionClassName3 = "truefalse_blanco";
        }
        if(this.state.selectedValue3 == "false" && this.props.question.Opciones[2].Valor == 100 || this.state.selectedValue3 == "true" && this.props.question.Opciones[2].Valor == 0){
          questionClassName3 = "truefalse_incorrecto";
        }

      }

      if(this.props.question.Opciones.length == 4){

        if(this.state.selectedValue1 == "true" && this.props.question.Opciones[0].Valor == 100 || this.state.selectedValue1 == "false" && this.props.question.Opciones[0].Valor == 0){
          questionClassName1 = "truefalse_correcto";
        }
        if(this.state.selectedValue1 == ""){
          questionClassName1 = "truefalse_blanco";
        }
        if(this.state.selectedValue1 == "false" && this.props.question.Opciones[0].Valor == 100 || this.state.selectedValue1 == "true" && this.props.question.Opciones[0].Valor == 0){
          questionClassName1 = "truefalse_incorrecto";
        }

        if(this.state.selectedValue2 == "true" && this.props.question.Opciones[1].Valor == 100 || this.state.selectedValue2 == "false" && this.props.question.Opciones[1].Valor == 0){
          questionClassName2 = "truefalse_correcto";
        }
        if(this.state.selectedValue2 == ""){
          questionClassName2 = "truefalse_blanco";
        }
        if(this.state.selectedValue2 == "false" && this.props.question.Opciones[1].Valor == 100 || this.state.selectedValue2 == "true" && this.props.question.Opciones[1].Valor == 0){
          questionClassName2 = "truefalse_incorrecto";
        }

        if(this.state.selectedValue3 == "true" && this.props.question.Opciones[2].Valor == 100 || this.state.selectedValue3 == "false" && this.props.question.Opciones[2].Valor == 0){
          questionClassName3 = "truefalse_correcto";
        }
        if(this.state.selectedValue3 == ""){
          questionClassName3 = "truefalse_blanco";
        }
        if(this.state.selectedValue3 == "false" && this.props.question.Opciones[2].Valor == 100 || this.state.selectedValue4 == "true" && this.props.question.Opciones[3].Valor == 0){
          questionClassName3 = "truefalse_incorrecto";
        }

        if(this.state.selectedValue4 == "true" && this.props.question.Opciones[3].Valor == 100 || this.state.selectedValue4 == "false" && this.props.question.Opciones[3].Valor == 0){
          questionClassName4 = "truefalse_correcto";
        }
        if(this.state.selectedValue4 == ""){
          questionClassName4 = "truefalse_blanco";
        }
        if(this.state.selectedValue4 == "false" && this.props.question.Opciones[3].Valor == 100 || this.state.selectedValue4 == "true" && this.props.question.Opciones[3].Valor == 0){
          questionClassName4 = "truefalse_incorrecto";
        }

      }

    }

    switch (this.props.question.Opciones.length){

    case 2:
      choices.push(

        // <TFQuestionChoice id={200 * i + 200} key={"MyQuestion_" + "question_choice_" + i} choice={this.props.question.Opciones[i]} checked={this.state.selected_choices_ids.indexOf(this.props.question.Opciones[i].Id) !== -1} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);
    <div className="container_truefalse">
      <div className={questionClassName1}>
        <div className="botones">
          <RadioGroup
                key={"MyQuestion_" + "question_choice_" + 0}
                selectedValue={this.state.selectedValue1}
                onChange={this.handleChange.bind(this)}>

              <label>
                <Radio disabled={this.state.answered} value="true" />V
              </label>
              <label>
               <Radio disabled={this.state.answered} value="false" />F
              </label>

            </RadioGroup>
        </div>

        <div className="opcion">
          <p>{this.props.question.Opciones[0].Texto}</p>
        </div>

      </div>
      <div className={questionClassName2}>
        <div className="botones">
            <RadioGroup
                key={"MyQuestion_" + "question_choice_" + 1}
                selectedValue={this.state.selectedValue2}
                onChange={this.handleChange2.bind(this)}>

              <label>
                <Radio disabled={this.state.answered} value="true" />V
              </label>
              <label>
               <Radio disabled={this.state.answered} value="false" />F
              </label>

            </RadioGroup>
        </div>

          <div className="opcion">
          <p>{this.props.question.Opciones[1].Texto}</p>
          </div>

        </div>
    </div>

        );
      break;
    case 3:
      choices.push(

        // <TFQuestionChoice id={200 * i + 200} key={"MyQuestion_" + "question_choice_" + i} choice={this.props.question.Opciones[i]} checked={this.state.selected_choices_ids.indexOf(this.props.question.Opciones[i].Id) !== -1} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);

    <div className="container_truefalse">
      <div className={questionClassName1}>
        <div className="botones">
        <RadioGroup
            key={"MyQuestion_" + "question_choice_" + 0}
            selectedValue={this.state.selectedValue1}
            onChange={this.handleChange.bind(this)}>

          <label>
            <Radio disabled={this.state.answered} value="true" />V
          </label>
          <label>
           <Radio disabled={this.state.answered} value="false" />F
          </label>

        </RadioGroup>
        </div>

          <div className="opcion">
          <p>{this.props.question.Opciones[0].Texto}</p>
          </div>
        </div>

        <div className={questionClassName2}>
        <div className="botones">
        <RadioGroup
            key={"MyQuestion_" + "question_choice_" + 1}
            selectedValue={this.state.selectedValue2}
            onChange={this.handleChange2.bind(this)}>

          <label>
            <Radio disabled={this.state.answered} value="true" />V
          </label>
          <label>
           <Radio disabled={this.state.answered} value="false" />F
          </label>

        </RadioGroup>
        </div>

          <div className="opcion">
          <p>{this.props.question.Opciones[1].Texto}</p>
          </div>
        </div>

        <div className={questionClassName3}>
        <div className="botones">
        <RadioGroup
            key={"MyQuestion_" + "question_choice_" + 2}
            selectedValue={this.state.selectedValue3}
            onChange={this.handleChange3.bind(this)}>

          <label>
            <Radio disabled={this.state.answered} value="true" />V
          </label>
          <label>
           <Radio disabled={this.state.answered} value="false" />F
          </label>

        </RadioGroup>
        </div>

          <div className="opcion">
          <p>{this.props.question.Opciones[2].Texto}</p>
          </div>

        </div>
      </div>

        );
      break;
    case 4:
      choices.push(

        // <TFQuestionChoice id={200 * i + 200} key={"MyQuestion_" + "question_choice_" + i} choice={this.props.question.Opciones[i]} checked={this.state.selected_choices_ids.indexOf(this.props.question.Opciones[i].Id) !== -1} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);

      <div className="container_truefalse">
      <div className={questionClassName1}>
        <div className="botones">
      <RadioGroup
            key={"MyQuestion_" + "question_choice_" + 0}
            selectedValue={this.state.selectedValue1}
            onChange={this.handleChange.bind(this)}>

          <label>
            <Radio disabled={this.state.answered} value="true" />V
          </label>
          <label>
           <Radio disabled={this.state.answered} value="false" />F
          </label>

        </RadioGroup>
        </div>

          <div className="opcion">
          <p>{this.props.question.Opciones[0].Texto}</p>
          </div>
        </div>

        <div className={questionClassName2}>
        <div className="botones">
        <RadioGroup
            key={"MyQuestion_" + "question_choice_" + 1}
            selectedValue={this.state.selectedValue2}
            onChange={this.handleChange2.bind(this)}>

          <label>
            <Radio disabled={this.state.answered} value="true" />V
          </label>
          <label>
           <Radio disabled={this.state.answered} value="false" />F
          </label>

        </RadioGroup>
        </div>

          <div className="opcion">
          <p>{this.props.question.Opciones[1].Texto}</p>
          </div>
        </div>

        <div className={questionClassName3}>
        <div className="botones">
        <RadioGroup
            key={"MyQuestion_" + "question_choice_" + 2}
            selectedValue={this.state.selectedValue3}
            onChange={this.handleChange3.bind(this)}>

          <label>
            <Radio disabled={this.state.answered} value="true" />V
          </label>
          <label>
           <Radio disabled={this.state.answered} value="false" />F
          </label>

        </RadioGroup>
        </div>

          <div className="opcion">
          <p>{this.props.question.Opciones[2].Texto}</p>
          </div>
        </div>

        <div className={questionClassName4}>
        <div className="botones">
        <RadioGroup
            key={"MyQuestion_" + "question_choice_" + 3}
            selectedValue={this.state.selectedValue4}
            onChange={this.handleChange4.bind(this)}>

          <label>
            <Radio disabled={this.state.answered} value="true" />V
          </label>
          <label>
           <Radio disabled={this.state.answered} value="false" />F
          </label>

        </RadioGroup>
        </div>

          <div className="opcion">
          <p>{this.props.question.Opciones[3].Texto}</p>
          </div>
        </div>

        </div>

        );
      break;
    default:
      break;

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

        <QuestionButtons comodin={false} clickComodin={this.comodinMitad.bind(this)} index={this.props.index} ref="questions" lastQuestion={this.props.isLastQuestion} I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>
      </div>
    );
  }
}