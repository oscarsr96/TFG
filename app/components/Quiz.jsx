import React from 'react';
import './../assets/scss/quiz.scss';
import './../assets/scss/main.scss';
import $ from 'jquery';


import * as Utils from '../vendors/Utils.js';
import {addObjectives, addDifficulty, resetObjectives, finishApp} from './../reducers/actions';

import QuizHeader from './QuizHeader.jsx';
import MCQuestion from './MCQuestion.jsx';
import SHAQuestion from './SHAQuestion.jsx';
import SortingQuestion from './SortingQuestion.jsx';
import TFQuestion from './TFQuestion.jsx';
import Countdown from './CountDown.jsx';

export default class Quiz extends React.Component {
  constructor(props){
    super(props);

    let questions = this.props.json;
    let basicQuiz = [];
    let mediumQuiz = [];
    let highQuiz = [];
    let advancedQuiz = [];
    let incrementalQuiz = [];
    let onetothreeQuiz = [];

    let adaptive_sorted = false;
    if((this.props.config.adaptive === true) && (typeof props.user_profile === "object") && (typeof props.user_profile.learner_preference === "object") && (typeof props.user_profile.learner_preference.difficulty === "number")){
      let difficulty = props.user_profile.learner_preference.difficulty;
      if((difficulty >= 0) && (difficulty <= 10)){
        for(let i = 0; i < questions.length; i++){

          if(questions[i].Dificultad == "Basic"){
            basicQuiz.push(questions[i]);
          } else if(questions[i].Dificultad == "Medium"){
            mediumQuiz.push(questions[i]);
          } else if(questions[i].Dificultad == "High"){
            highQuiz.push(questions[i]);
          } else {
            advancedQuiz.push(questions[i]);
          }

          questions[i].suitability = (10 - Math.abs((questions[i].Dificultad - difficulty))) / 10;
        }
        // questions.sort(function(a, b){ return b.suitability - a.suitability; });
        // adaptive_sorted = true;
      }
    }

    /* if(adaptive_sorted === false){
      questions = Utils.shuffleArray(questions);
    }*/

    function getRandomInt(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if(this.props.user_profile.learner_preference.difficulty != null){

      switch (this.props.user_profile.learner_preference.difficulty){

      case null:
        break;
      case 0:
      case 1:
      case 2:

        for(let i = 0; i < basicQuiz.length; i++){
          questions.push(basicQuiz[i]);
        }
        for(let i = 0; i < mediumQuiz.length; i++){
          questions.push(mediumQuiz[i]);
        }
        for(let i = 0; i < highQuiz.length; i++){
          questions.push(highQuiz[i]);
        }
        for(let i = 0; i < advancedQuiz.length; i++){
          questions.push(advancedQuiz[i]);
        }
        break;

      case 3:
      case 4:
      case 5:

        for(let i = 0; i < mediumQuiz.length; i++){
          questions.push(mediumQuiz[i]);
        }
        for(let i = 0; i < highQuiz.length; i++){
          questions.push(highQuiz[i]);
        }
        for(let i = 0; i < advancedQuiz.length; i++){
          questions.push(advancedQuiz[i]);
        }
        break;

      case 6:
      case 7:

        for(let i = 0; i < highQuiz.length; i++){
          questions.push(highQuiz[i]);
        }
        for(let i = 0; i < advancedQuiz.length; i++){
          questions.push(advancedQuiz[i]);
        }
        break;

      case 8:
      case 9:

        questions = advancedQuiz;
        break;

      }

    } else {

      switch (this.props.config.difficulty){
      case "Basic":
        questions = basicQuiz;
        break;
      case "Medium":
        questions = mediumQuiz;
        break;
      case "High":
        questions = highQuiz;
        break;
      case "Advanced":
        questions = advancedQuiz;
        break;
      default:

        if(this.props.config.n < 4){
          let m = getRandomInt(1, 4);
          console.log(m);
          switch (this.props.config.n){
          case 1:
            if(m == 1){
              onetothreeQuiz.push(basicQuiz[getRandomInt(0, basicQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;

            }
            if(m == 2){
              onetothreeQuiz.push(mediumQuiz[getRandomInt(0, mediumQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;

            }
            if(m == 3){
              onetothreeQuiz.push(highQuiz[getRandomInt(0, highQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;

            }
            if(m == 4){
              onetothreeQuiz.push(advancedQuiz[getRandomInt(0, advancedQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;

            }
            break;
          case 2:
            if(m == 1){
              onetothreeQuiz.push(basicQuiz[getRandomInt(0, basicQuiz.length - 1)]);
              onetothreeQuiz.push(mediumQuiz[getRandomInt(0, mediumQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;

            }
            if(m == 2){
              onetothreeQuiz.push(mediumQuiz[getRandomInt(0, mediumQuiz.length - 1)]);
              onetothreeQuiz.push(highQuiz[getRandomInt(0, highQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;

            }
            if(m == 3){
              onetothreeQuiz.push(highQuiz[getRandomInt(0, highQuiz.length - 1)]);
              onetothreeQuiz.push(advancedQuiz[getRandomInt(0, advancedQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;

            }
            if(m == 4){
              onetothreeQuiz.push(advancedQuiz[getRandomInt(0, advancedQuiz.length - 1)]);
              onetothreeQuiz.push(highQuiz[getRandomInt(0, highQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;

            }
            break;
          case 3:
            if(m == 1){
              onetothreeQuiz.push(basicQuiz[getRandomInt(0, basicQuiz.length - 1)]);
              onetothreeQuiz.push(mediumQuiz[getRandomInt(0, mediumQuiz.length - 1)]);
              onetothreeQuiz.push(highQuiz[getRandomInt(0, highQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;

            }
            if(m == 2){
              onetothreeQuiz.push(mediumQuiz[getRandomInt(0, mediumQuiz.length - 1)]);
              onetothreeQuiz.push(highQuiz[getRandomInt(0, highQuiz.length - 1)]);
              onetothreeQuiz.push(advancedQuiz[getRandomInt(0, advancedQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;

            }
            if(m == 3){
              onetothreeQuiz.push(highQuiz[getRandomInt(0, highQuiz.length - 1)]);
              onetothreeQuiz.push(advancedQuiz[getRandomInt(0, advancedQuiz.length - 1)]);
              onetothreeQuiz.push(basicQuiz[getRandomInt(0, basicQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;

            }
            if(m == 4){
              onetothreeQuiz.push(advancedQuiz[getRandomInt(0, advancedQuiz.length - 1)]);
              onetothreeQuiz.push(highQuiz[getRandomInt(0, highQuiz.length - 1)]);
              onetothreeQuiz.push(mediumQuiz[getRandomInt(0, mediumQuiz.length - 1)]);
              questions = onetothreeQuiz;
              break;
            }

            return;

          }
        } else {

          for(let i = 0; i < Math.floor(this.props.config.n / 4); i++){

            let m = getRandomInt(0, basicQuiz.length - 1);
            incrementalQuiz.push(basicQuiz[m]);
            basicQuiz.splice(m, 1);
          }
          for(let i = 0; i < Math.floor(this.props.config.n / 4); i++){

            let m = getRandomInt(0, mediumQuiz.length - 1);
            incrementalQuiz.push(mediumQuiz[m]);
            mediumQuiz.splice(m, 1);
          }
          for(let i = 0; i < Math.floor(this.props.config.n / 4); i++){

            let m = getRandomInt(0, highQuiz.length - 1);
            incrementalQuiz.push(highQuiz[m]);
            highQuiz.splice(m, 1);
          }
          for(let i = 0; i < this.props.config.n - 3 * Math.floor(this.props.config.n / 4); i++){

            let m = getRandomInt(0, advancedQuiz.length - 1);
            incrementalQuiz.push(advancedQuiz[m]);
            advancedQuiz.splice(m, 1);
          }

          questions = incrementalQuiz;
          break;
        }
      }
    }

    if((typeof this.props.config.n === "number") && (this.props.config.n >= 1)){
      // Limit number of questions
      questions = questions.slice(0, Math.min(this.props.config.n, questions.length));
    }

    this.state = {
      quiz:questions,
      current_question_index:1,

    };
  }
  componentDidMount(){

    this.props.dispatch(addDifficulty(this.state.quiz[this.state.current_question_index - 1].Dificultad));

    // Create objectives (One per question included in the quiz)
    let objectives = [];
    let nQuestions = this.state.quiz.length;
    for(let i = 0; i < nQuestions; i++){
      objectives.push(new Utils.Objective({id:("Question" + (i + 1)), progress_measure:(1 / nQuestions), score:(1 / nQuestions)}));
    }

    this.props.dispatch(addObjectives(objectives));

  }
  onNextQuestion(){
    console.log(this.state.quiz);
    let isLastQuestion = (this.state.current_question_index === this.state.quiz.length);
    console.log("Ultima pregunta " + isLastQuestion);
    if(isLastQuestion === false){
      this.setState({current_question_index:(this.state.current_question_index + 1)});
      this.props.dispatch(addDifficulty(this.state.quiz[this.state.current_question_index].Dificultad));

    } else {
      this.props.dispatch(finishApp(true));
    }

  }
  onResetQuiz(){
    this.setState({current_question_index:1});
    this.props.dispatch(resetObjectives());
    this.props.dispatch(addDifficulty(this.state.quiz[0].Dificultad));

  }
  render(){
    console.log("Render");
    console.log(this.state.current_question_index);
    let currentQuestion = this.state.quiz[this.state.current_question_index - 1];
    let isLastQuestion = (this.state.current_question_index === this.state.quiz.length);

    let objective = this.props.tracking.objectives["Question" + (this.state.current_question_index)];
    let onNextQuestion = this.onNextQuestion.bind(this);
    let onResetQuiz = this.onResetQuiz.bind(this);
    let currentQuestionRender = "";

    switch (currentQuestion.Tipo){
    case "multichoice":
      currentQuestionRender = (<MCQuestion time={this.props.config.tiempo} quiz={this.state.quiz} comodin={this.props.config.comodin} index={this.state.current_question_index} question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished}/>);
      break;
    case "truefalse":
      currentQuestionRender = (<TFQuestion time={this.props.config.tiempo} quiz={this.state.quiz} comodin={this.props.config.comodin} index={this.state.current_question_index} question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished}/>);
      break;
    case "matching":
      currentQuestionRender = (<SortingQuestion time={this.props.config.tiempo} quiz={this.state.quiz} onResetQuiz={this.onResetQuiz.bind(this)} index={this.state.current_question_index} comodin={false} question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished}/>);
      break;
    case "shortanswer":
      currentQuestionRender = (<SHAQuestion time={this.props.config.tiempo} quiz={this.state.quiz} comodin={false} index={this.state.current_question_index} question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished}/>);
      break;
    default:
      currentQuestionRender = "Question type not supported";
    }

    return (

      <div className="quiz">
        <QuizHeader I18n={this.props.I18n} quiz={this.state.quiz} currentQuestionIndex={this.state.current_question_index}/>
        {currentQuestionRender}
      </div>
    );
  }
}