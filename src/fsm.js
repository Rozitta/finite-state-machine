
class FSM {
  constructor(config) {
     if(config == undefined){
       throw new Error('config isn\'t passed')
     }
    this.initial = config.initial;
     this.initialState = config.initial;
     this.arrStates = [];
     
    for(let key in config.states){
      let obj = {}
      let trans =  config.states[key]
       obj.state = key;
      for(let key in trans){
        obj.transition = trans[key]
      }
      this.arrStates.push(obj);
   
    }

    }
  getState() {
    return this.initialState;
  }
  changeState(state) {
    this.changeStatePrevAfter;
    let flag = false;
      for(let i = 0; i < this.arrStates.length; i++){
        let trans = this.arrStates[i].transition
     
        if(state == this.arrStates[i].state){
          this.initialState = state;
          flag = true;
           for(let key in trans){
            this.changeStatePrevAfter = trans[key]
          }  
        }
      }
    if(flag == false){
      throw new Error('state isn\'t exist');
    }
    }
    trigger(event) {
      for(let i  = 0; i < this.arrStates.length; i++){
        let myState = this.arrStates[i].state;
        
        if(this.initialState == myState){
          let myTrans = this.arrStates[i].transition;
          if(!myTrans[event]){
            throw new Error();
          }
        }
      }
      this.triggerInitialState = undefined;
      this.triggerPrevStep = undefined;
      let flag = true;
     for(let i = 0; i < this.arrStates.length; i++){
       let state = this.arrStates[i];
       
       for(let key in state.transition){
         if(key == event){
           this.triggerInitialState = state.transition[key];
           this.triggerPrevStep = state.state;
           this.initialState = this.triggerInitialState;
           flag = false;
        
         }
       }
       
       if(flag == false){
         break;
       }
     }
        this.checkEvent = true;
        return event;
 
    }
  reset() {
   this.initialState = this.initial;
  }
  getStates(event) {
    let states = [];
    if(event == undefined){
    for(let i = 0; i < this.arrStates.length; i++){
      states.push(this.arrStates[i].state);
    }
    }
    
    if(event !== undefined){
      for(let i = 0; i < this.arrStates.length; i++){
        let stateName = this.arrStates[i].state;
        let trans = this.arrStates[i].transition;
        
        for(let key in trans){
          if(event == key){
            states.push(stateName)
          }
 
        }
        
      }
      
    }
  
    return states;
    
  }
  undo() {
    if(this.clearHistory == 'available'){
      return false;
    }
    this.redoFlag = true;
    if(this.initialState == this.initial){
      return false;
    }
    if(this.triggerPrevStep !== undefined){
    this.initialState = this.triggerPrevStep; 
      return true;
  }
  if(this.changeStatePrevAfter !== undefined){
    this.initialState = this.changeStatePrevAfter; 
    return true;
  }
  
  }
  redo() {
    if(this.clearHistory == 'available'){
      return false;
    }
    this.redoFlag;

    if(this.redoFlag === false){
      return false;
    }
    if(this.initialState == this.initial && this.checkEvent !== true ){
      return false;
    }else{
    this.triggerPrevStep = this.triggerInitialState;
    this.initialState = this.triggerPrevStep;
    this.redoFlag = false;
   return true;
    }

     

  }
  clearHistory() {
    this.clearHistory ='available';
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
