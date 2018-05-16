function jsonReducer(state = {}, action){
  let newState;
  switch (action.type){
  case 'SAVE_STATE':
    newState = JSON.parse(JSON.stringify(state));
    newState = action.quiz;
    return newState;
  default:
    return state;
  }
}

export default jsonReducer;