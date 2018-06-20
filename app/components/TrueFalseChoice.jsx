import React from 'react';

export default class TrueFalseChoice extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let questionClassName = "question_choice";
    let showCorrection = (this.props.questionAnswered);
    if(showCorrection){
      if(this.props.checked){
        if(this.props.choice.Valor === "100"){
          questionClassName += " question_choice_correct";
        } else {
          questionClassName += " question_choice_incorrect";
        }
      } else if(!this.props.checked && this.props.choice.Valor === "100"){
        questionClassName += " question_choice_blank";
      }
    }
    return (
      <div id={this.props.id} className={questionClassName}>
        <div className="questionC1">
          <input type="radio" name="button" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className="questionC2">
          <p>{this.props.choice.Texto}</p>
        </div>
      </div>
    );
  }
}