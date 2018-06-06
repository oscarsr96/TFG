import React from 'react';
import {RadioGroup, Radio} from 'react-radio-group';

export default class TFQuestionChoice extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedValue:'apple',

    };
  }

  handleChange(value){
    this.setState({selectedValue:value});
  }

  render(){
    let questionClassName = "question_choice";
    let showCorrection = (this.props.questionAnswered);
    if(showCorrection){
      if(this.props.checked){
        if(this.props.choice.Valor === 100){
          questionClassName += " question_choice_correct";
        } else {
          questionClassName += " question_choice_incorrect";
        }
      } else if(this.props.choice.Valor === 100){
        questionClassName += " question_choice_blank";
      }
    }

    /*       <div id={this.props.id} className={questionClassName}>

    <div className="questionC1">
          <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className="questionC2">
          <p>{this.props.choice.Texto}</p>
        </div>
        </div>*/

    return (
        <RadioGroup
            name="fruit"
            selectedValue={this.state.selectedValue}
            onChange={this.handleChange}>
          <label>
            <Radio value="apple" />Apple
          </label>
          <label>
           <Radio value="orange" />Orange
          </label>

        </RadioGroup>

    );
  }
}