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

    let quiz = this.props.json;
    let questions = [];
    let basicQuiz = [];
    let mediumQuiz = [];
    let highQuiz = [];
    let advancedQuiz = [];
    let incrementalQuiz = [];
    let onetothreeQuiz = [];
    let noDiffQuiz=[];

    let adaptive_sorted = false;
    if((this.props.config.adaptive === true) && (typeof props.user_profile === "object") && (typeof props.user_profile.learner_preference === "object")) {
      
    
        for(let i = 0; i < quiz.length; i++){

          if( quiz[i].Dificultad !== undefined){

              if(quiz[i].Dificultad == "Basic"){
                basicQuiz.push(quiz[i]);
              } else if(quiz[i].Dificultad == "Medium"){
                mediumQuiz.push(quiz[i]);
              } else if(quiz[i].Dificultad == "High"){
                highQuiz.push(quiz[i]);
              } else if (quiz[i].Dificultad == "Advanced") {
                advancedQuiz.push(quiz[i]);
              }
        }
          else if (typeof quiz[i].Dificultad === "undefined"){
                noDiffQuiz.push(quiz[i]);
              }

        }
        // questions.sort(function(a, b){ return b.suitability - a.suitability; });
        // adaptive_sorted = true;
      
    }
  

    

    function getRandomInt(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

   


      if(typeof this.props.user_profile.learner_preference.difficulty !== "undefined" && noDiffQuiz.length == 0){
        console.log("La dificultad lms no es undefined")

      switch (this.props.user_profile.learner_preference.difficulty){

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
                console.log("Empiezo por High");

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
              default:
                break;

              }
      } else {
          console.log("He entrado en el else de lms config undefined")
          console.log(noDiffQuiz.length)
        if( noDiffQuiz.length != 0){
          questions = noDiffQuiz;
        }
        else if( this.props.config.difficulty !== undefined && noDiffQuiz.length==0){
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

                      

                    }
                  } else {

                    for(let i = 0; i < Math.min(basicQuiz.length,Math.floor(this.props.config.n / 4)); i++){

                      let m = getRandomInt(0, basicQuiz.length - 1);
                      incrementalQuiz.push(basicQuiz[m]);
                      basicQuiz.splice(m, 1);
                    }
                    for(let i = 0; i < Math.min(mediumQuiz.length,Math.floor(this.props.config.n / 4)); i++){

                      let m = getRandomInt(0, mediumQuiz.length - 1);
                      incrementalQuiz.push(mediumQuiz[m]);
                      mediumQuiz.splice(m, 1);
                    }
                    for(let i = 0; i < Math.min(highQuiz.length,Math.floor(this.props.config.n / 4)); i++){

                      let m = getRandomInt(0, highQuiz.length - 1);
                      incrementalQuiz.push(highQuiz[m]);
                      highQuiz.splice(m, 1);
                    }
                    for(let i = 0; i < Math.min(advancedQuiz.length, this.props.config.n - 3 * Math.floor(this.props.config.n / 4)); i++){

                      let m = getRandomInt(0, advancedQuiz.length - 1);
                      incrementalQuiz.push(advancedQuiz[m]);
                      advancedQuiz.splice(m, 1);
                    }

                    questions = incrementalQuiz;
                    break;
                  }
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
    console.log(this.state.quiz)
   

    if( this.state.quiz[this.state.current_question_index - 1].Dificultad !== undefined){
    this.props.dispatch(addDifficulty(this.state.quiz[this.state.current_question_index - 1].Dificultad));
    }

    // Create objectives (One per question included in the quiz)
    let objectives = [];
    let nQuestions = this.state.quiz.length;
    for(let i = 0; i < nQuestions; i++){
      objectives.push(new Utils.Objective({id:("Question" + (i + 1)), progress_measure:(1 / nQuestions), score:(1 / nQuestions)}));
    }

    this.props.dispatch(addObjectives(objectives));

  }
  onNextQuestion(){
    
    console.log(this.props.user_profile.learner_preference.difficulty)
    let isLastQuestion = (this.state.current_question_index === this.state.quiz.length);
    if(isLastQuestion === false){
      this.setState({current_question_index:(this.state.current_question_index + 1)});
        if(typeof this.state.quiz[this.state.current_question_index - 1].Dificultad !== undefined){
            this.props.dispatch(addDifficulty(this.state.quiz[this.state.current_question_index - 1].Dificultad));
            }
    } else {
      this.props.dispatch(finishApp(true));
    }

  }
  onResetQuiz(){
    this.setState({current_question_index:1});
    this.props.dispatch(resetObjectives());


    if(typeof this.state.quiz[this.state.current_question_index - 1].Dificultad !== undefined){
    this.props.dispatch(addDifficulty(this.state.quiz[this.state.current_question_index - 1].Dificultad));
    }
  }
  render(){
    
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
      currentQuestionRender = (<TFQuestion time={this.props.config.tiempo} quiz={this.state.quiz} comodin={false} index={this.state.current_question_index} question={currentQuestion} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished}/>);
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