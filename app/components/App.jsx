import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import * as SAMPLES from '../config/samples.js';
import {saveState} from './../reducers/actions';

import SCORM from './SCORM.jsx';
import Header from './Header.jsx';
import FinishScreen from './FinishScreen.jsx';
import Quiz from './Quiz.jsx';

import $ from 'jquery';
export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.state = {
      quiz:[],
      numero_preguntas:0,
    };
  }

  componentDidMount(){

// Arrays de preguntas por niveles
    let customjson = [];  // Nivel basico

    let nPreguntas = 0;

    let parseString = require('xml2js').parseString;

    $.ajax({
      async:true,
      url:GLOBAL_CONFIG.fichero,
      method:"GET",
      dataType:"text",
      success:function(response){
        parseString(response, function(err, result){

          let json = (result);

          let pregunta = Object.values(json.quiz)[0];

          let questionSize = 0;
          let questionSizes = [];

        // Hay que saber si type es category para ver cuando empieza una nueva pregunta

          for(let k = 0; k < pregunta.length; k++){

            if(pregunta[k].$.type == "category" && nPreguntas == 0){
              nPreguntas++;
            }
            else if(pregunta[k].$.type == "category" && nPreguntas != 0){
              nPreguntas++;
              questionSizes.push(questionSize);
              questionSize = 0;
            }
            else {
              questionSize++;
            }

          }

          questionSizes.push(questionSize);

          console.log("Hay " + nPreguntas + " preguntas");
          console.log("El tamaño de las preguntas es " + questionSizes);
          console.log(questionSizes.length);

          function primeraOpcion(numeroPregunta){
            if(numeroPregunta == 1){ return 1; }

            let indice = 1;
            for(let i = 0; i < numeroPregunta - 1; i++){
              indice += questionSizes[i];
            }
            return indice + numeroPregunta - 1;

          }

          for(let x = 1; x < questionSizes.length + 1; x++){

            let w = primeraOpcion(x);
            console.log(w);
            let h = x - 1;

            if(pregunta[w].$.type == "truefalse"){
              // Evaluar dificultad
              if(pregunta[w].difficulty[0] == "Basic"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjson[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < questionSizes[x - 1]; y++){

                  let z = primeraOpcion(x) + y;
                  let i = y + 1;

                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[z].questiontext[0].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[z].answer[0].$.fraction;

                }
              }

              else if(pregunta[w].difficulty[0] == "Medium"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjson[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < questionSizes[x - 1]; y++){

                  let z = primeraOpcion(x) + y;
                  let i = y + 1;

                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[z].questiontext[0].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[z].answer[0].$.fraction;

                }
              }
              else if(pregunta[w].difficulty[0] == "High"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjson[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < questionSizes[x - 1]; y++){

                  let z = primeraOpcion(x) + y;
                  let i = y + 1;

                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[z].questiontext[0].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[z].answer[0].$.fraction;

                }
              }
              else if(pregunta[w].difficulty[0] == "Advanced"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjson[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < questionSizes[x - 1]; y++){

                  let z = primeraOpcion(x) + y;
                  let i = y + 1;

                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[z].questiontext[0].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[z].answer[0].$.fraction;

                }
              }

            }// fin truefalse
            else if(pregunta[w].$.type == "multichoice" || pregunta[w].$.type == "shortanswer"){

              let tipo = "";
              if(pregunta[w].$.type == "multichoice"){
                tipo = "Multichoice";
              } else {
                tipo = "Shortanswer";
              }

              if(pregunta[w].difficulty[0] == "Basic"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjso[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < pregunta[w].answer.length; y++){

                  let i = y + 1;
                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[w].answer[y].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[w].answer[y].$.fraction;

                }
              }
              else if(pregunta[w].difficulty[0] == "Medium"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjson[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < pregunta[w].answer.length; y++){

                  let i = y + 1;
                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[w].answer[y].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[w].answer[y].$.fraction;

                }
              }
              else if(pregunta[w].difficulty[0] == "High"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjson[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < pregunta[w].answer.length; y++){

                  let i = y + 1;
                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[w].answer[y].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[w].answer[y].$.fraction;

                }
              }

              else if(pregunta[w].difficulty[0] == "Advanced"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjson[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < pregunta[w].answer.length; y++){

                  let i = y + 1;
                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[w].answer[y].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[w].answer[y].$.fraction;

                }
              }

            }

            else if(pregunta[w].$.type == "matching"){

              if(pregunta[w].difficulty[0] == "Basic"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjson[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < pregunta[w].subquestion.length; y++){

                  let i = y + 1;
                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[w].subquestion[y].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[w].subquestion[y].answer[0].text[0];
                }
              }

              else if(pregunta[w].difficulty[0] == "Medium"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjson[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < pregunta[w].subquestion.length; y++){

                  let i = y + 1;
                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[w].subquestion[y].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[w].subquestion[y].answer[0].text[0];

                }
              }
              else if(pregunta[w].difficulty[0] == "High"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjson[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < pregunta[w].subquestion.length; y++){

                  let i = y + 1;
                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[w].subquestion[y].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[w].subquestion[y].answer[0].text[0];
                }
              }

              else if(pregunta[w].difficulty[0] == "Advanced"){

                customjson[h] = {};

                customjson[h].Dificultad = pregunta[w].difficulty[0];
                customjson[h].Tipo = pregunta[w].$.type;

                customjson[h].Enunciado = pregunta[w].name[0].text[0];
                customjson[h].Opciones = [];

                for(let y = 0; y < pregunta[w].subquestion.length; y++){

                  let i = y + 1;
                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[w].subquestion[y].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[w].subquestion[y].answer[0].text[0];
                }
              }

            }

          }

          console.log(customjson);

          for(let m = 0; m < customjson.length; m++){
            customjson[m].Opciones.sort(function(){ return Math.random() - 0.5; });
          }

          this.props.dispatch(saveState(customjson));

        }.bind(this));
      }.bind(this),
    });

  }

  render(){
    let appHeader = "";
    let appContent = "";

    if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
      appHeader = (
        <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
      );
      if((this.props.wait_for_user_profile !== true) && (Object.keys(this.props.json).length > 0)){
        appContent = (
          <Quiz dispatch={this.props.dispatch} json={this.props.json} user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG}  I18n={I18n}/>
        );
      }
    } else {
      appContent = (
        <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={SAMPLES.quiz_example} config={GLOBAL_CONFIG} I18n={I18n}/>
      );
    }

    return (
      <div id="container">
        <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        {appHeader}
        {appContent}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);