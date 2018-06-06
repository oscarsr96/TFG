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
          console.log(pregunta);

      

        // Hay que saber si type es category para ver cuando empieza una nueva pregunta

          for(let k = 0; k < pregunta.length; k++){

            if(pregunta[k].$.type === "category"){
              continue;
            }
            else if(pregunta[k].$.type !== "category" ){
              nPreguntas++;
         
            }
          

          }

          

          console.log("Hay " + nPreguntas + " preguntas");
         

          

          for(let x = 1; x < nPreguntas+1; x++){

            let h = x - 1;

            if(pregunta[x].$.type === "truefalse"){

              
                customjson[h] = {};

                customjson[h].Tipo = pregunta[x].$.type;


                switch(pregunta[x].difficulty){

                  case undefined:
                      break;
                  case 0:
                  case 1:
                  case 2:
                    customjson[h].Dificultad = "Basic"
                    break;
                  case 3:
                  case 4:
                  case 5:
                    customjson[h].Dificultad = "Medium"
                    break;
                  case 6:
                  case 7:
                    customjson[h].Dificultad = "High"
                    break;
                  case 8:
                  case 9:
                    customjson[h].Dificultad = "Advanced"
                    break;
                  default:
                }

                let enun = pregunta[x].questiontext[0].text[0]

                if(enun.substring(enun.indexOf('>')+1, enun.lastIndexOf('<')) != ""){
                  customjson[h].Enunciado = enun.substring(enun.indexOf('>')+1, enun.lastIndexOf('<'));
                }else{
                  customjson[h].Enunciado = enun;
                }
                
                customjson[h].Opciones = [];

                for(let y = 0; y <pregunta[x].answer.length; y++){

                  let i = y + 1;

                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;


                  let answer = pregunta[x].answer[y].text[0]


                  if(answer.substring(answer.indexOf('>')+1, answer.lastIndexOf('<')) != ""){
                  customjson[h].Opciones[y].Texto = answer.substring(answer.indexOf('>')+1, answer.lastIndexOf('<'));
                  }else{
                    customjson[h].Opciones[y].Texto=answer;
                  }
                  
                  customjson[h].Opciones[y].Valor = pregunta[x].answer[y].$.fraction;

                }
              
              
              
              }
            
            // preguntas shortanswer
            else if(pregunta[x].$.type === "multichoice"){

              

              
                customjson[h] = {};

                customjson[h].Tipo = pregunta[x].$.type;

                switch(pregunta[x].difficulty){

                  case undefined:
                      break;
                  case 0:
                  case 1:
                  case 2:
                    customjson[h].Dificultad = "Basic"
                    break;
                  case 3:
                  case 4:
                  case 5:
                    customjson[h].Dificultad = "Medium"
                    break;
                  case 6:
                  case 7:
                    customjson[h].Dificultad = "High"
                    break;
                  case 8:
                  case 9:
                    customjson[h].Dificultad = "Advanced"
                    break;
                  default:
                    break;
                }

                let enun = pregunta[x].questiontext[0].text[0]

                if(enun.substring(enun.indexOf('>')+1, enun.lastIndexOf('<'))!= ""){
                customjson[h].Enunciado = enun.substring(enun.indexOf('>')+1, enun.lastIndexOf('<'));
                } else{
                customjson[h].Enunciado = enun;

                }


                customjson[h].Opciones = [];



                for(let y = 0; y < pregunta[x].answer.length; y++){

                  let i = y + 1;
                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  let answer = pregunta[x].answer[y].text[0]


                  if(answer.substring(answer.indexOf('>')+1, answer.lastIndexOf('<')) != ""){
                  customjson[h].Opciones[y].Texto = answer.substring(answer.indexOf('>')+1, answer.lastIndexOf('<'));
                  }else if (answer.indexOf('-') != -1){
                    customjson[h].Opciones[y].Texto=answer.substring(0, answer.lastIndexOf('-'));
                  }else{
                    customjson[h].Opciones[y].Texto=answer;
                  }


                    
                  
                  customjson[h].Opciones[y].Valor = pregunta[x].answer[y].$.fraction;

                }
              

              
              
            }
            else if( pregunta[x].$.type === "shortanswer"){

              
              
                customjson[h] = {};

                customjson[h].Tipo = pregunta[x].$.type;

                switch(pregunta[x].difficulty){

                  case undefined:
                      break;
                  case 0:
                  case 1:
                  case 2:
                    customjson[h].Dificultad = "Basic"
                    break;
                  case 3:
                  case 4:
                  case 5:
                    customjson[h].Dificultad = "Medium"
                    break;
                  case 6:
                  case 7:
                    customjson[h].Dificultad = "High"
                    break;
                  case 8:
                  case 9:
                    customjson[h].Dificultad = "Advanced"
                    break;
                  default:
                    break;
                }

                let enun = pregunta[x].questiontext[0].text[0]

                if(enun.substring(enun.indexOf('>')+1, enun.lastIndexOf('<'))!= ""){
                customjson[h].Enunciado = enun.substring(enun.indexOf('>')+1, enun.lastIndexOf('<'));
                } else{
                customjson[h].Enunciado = enun;

                }


                customjson[h].Opciones = [];



                

                  customjson[h].Opciones[0] = {};
                  customjson[h].Opciones[0].Id = 1;
                  let answer = pregunta[x].answer[0].text[0];


                  if(answer.substring(answer.indexOf('>')+1, answer.lastIndexOf('<')) != ""){
                  customjson[h].Opciones[y].Texto = answer.substring(answer.indexOf('>')+1, answer.lastIndexOf('<'));
                  }else if (answer.indexOf('-') != -1){
                    customjson[h].Opciones[0].Texto=answer.substring(0, answer.lastIndexOf('-'));
                  }else{
                    customjson[h].Opciones[0].Texto=answer;
                  }


                    
                  
                  customjson[h].Opciones[0].Valor = pregunta[x].answer[0].$.fraction;

                
              

              
            }

            else if(pregunta[x].$.type === "matching"){

              
                customjson[h] = {};

                customjson[h].Tipo = pregunta[x].$.type;

                switch(pregunta[x].difficulty){

                  case undefined:
                      break;
                  case 0:
                  case 1:
                  case 2:
                    customjson[h].Dificultad = "Basic"
                    break;
                  case 3:
                  case 4:
                  case 5:
                    customjson[h].Dificultad = "Medium"
                    break;
                  case 6:
                  case 7:
                    customjson[h].Dificultad = "High"
                    break;
                  case 8:
                  case 9:
                    customjson[h].Dificultad = "Advanced"
                    break;
                  default:
                    break;
                }

                let enun = pregunta[x].questiontext[0].text[0]

                if(enun.substring(enun.indexOf('>')+1, enun.lastIndexOf('<')) != ""){
                  customjson[h].Enunciado = enun.substring(enun.indexOf('>')+1, enun.lastIndexOf('<'));
                }else{
                  customjson[h].Enunciado = enun;
                }
                customjson[h].Opciones = [];

                for(let y = 0; y < Math.min(4,pregunta[x].subquestion.length); y++){

                  let i = y + 1;
                  customjson[h].Opciones[y] = {};
                  customjson[h].Opciones[y].Id = i;
                  customjson[h].Opciones[y].Texto = pregunta[x].subquestion[y].text[0];
                  customjson[h].Opciones[y].Valor = pregunta[x].subquestion[y].answer[0].text[0];
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
          <Quiz dispatch={this.props.dispatch} json={this.props.json} user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
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