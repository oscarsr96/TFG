import React from 'react';

export default class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let loggedText;
    let trackingTexts = [];

    if(typeof this.props.tracking.progress_measure === "number"){
      trackingTexts.push(this.props.I18n.getTrans("i.progress_measure") + ": " + (this.props.tracking.progress_measure * 100).toFixed(1) + "%");
    } else {
      trackingTexts.push(this.props.I18n.getTrans("i.progress_measure") + ": 0.0%");
    }
    if(typeof this.props.tracking.score === "number"){
      trackingTexts.push(this.props.I18n.getTrans("i.score") + ": " + (this.props.tracking.score * 100).toFixed(1) + "%");
    } else {
      trackingTexts.push(this.props.I18n.getTrans("i.score") + ": 0.0%");
    }
    if(this.props.user_profile){
      if((typeof this.props.user_profile.name === "string")){
        loggedText = (this.props.I18n.getTrans("i.logged_as") + " " + this.props.user_profile.name);
      }
      if(typeof this.props.user_profile.learner_preference === "object"){

        if(this.props.tracking.difficulty === undefined || this.props.tracking.difficulty === null){
          trackingTexts.push("");
        }

        else /* (typeof this.props.user_profile.learner_preference.difficulty === "number")*/if(this.props.tracking.difficulty === "Basic"){
          trackingTexts.push(this.props.I18n.getTrans("i.difficulty") + ": " + this.props.I18n.getTrans("i.difficultyBasic"));
        }
        else if(this.props.tracking.difficulty === "Medium"){
          trackingTexts.push(this.props.I18n.getTrans("i.difficulty") + ": " + this.props.I18n.getTrans("i.difficultyMedium"));
        }
        else if(this.props.tracking.difficulty === "High"){
          trackingTexts.push(this.props.I18n.getTrans("i.difficulty") + ": " + this.props.I18n.getTrans("i.difficultyHigh"));
        } else {
          trackingTexts.push(this.props.I18n.getTrans("i.difficulty") + ": " + this.props.I18n.getTrans("i.difficultyAdvanced"));
        }

      }
    }

    let loggedEl = null;
    if(typeof loggedText === "string"){
      loggedEl = <p id="logged_user">{loggedText}</p>;
    }
    let trackingEls = trackingTexts.map(function(text, index){
      return <span key={index}>{text}</span>;
    });

    return (
      <div>
      <div className="header_wrapper">

        <div className="header_wrapper_title">
        <a target="_blank" href="https://github.com/agordillo/RESCORM"><img src="assets/images/react_logo.png"/></a>
        <h1 id="heading">{this.props.config.titulo}</h1>
        </div>

        <div className="header_wrapper_logged">
        {loggedEl}
        </div>

      </div>
      <div className="indicators">
        <div className="second_header_progress">
        <p id="tracking">{trackingEls[0]}</p>
        </div>

        <div className="second_header_score">

        <div className="second_header_score_text">
        <p id="tracking">{trackingEls[1]}</p>
        </div>

        </div>

        <div className="second_header_difficulty">
        <p id="tracking">{trackingEls[2]}</p>
        </div>
      </div>
       </div>
    );
  }
}