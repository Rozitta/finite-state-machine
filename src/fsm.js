// class FSM {
//     /**
//      * Creates new FSM instance.
//      * @param config
//      */
//     constructor(config) {
//       this.initial = config.initial
//     }

//     /**
//      * Returns active state.
//      * @returns {String}
//      */
//     getState(config) {
//     }

//     /**
//      * Goes to specified state.
//      * @param state
//      */
//     changeState(state) {}

//     /**
//      * Changes state according to event transition rules.
//      * @param event
//      */
//     trigger(event) {}

//     /**
//      * Resets FSM state to initial.
//      */
//     reset() {}

//     /**
//      * Returns an array of states for which there are specified event transition rules.
//      * Returns all states if argument is undefined.
//      * @param event
//      * @returns {Array}
//      */
//     getStates(event) {}

//     /**
//      * Goes back to previous state.
//      * Returns false if undo is not available.
//      * @returns {Boolean}
//      */
//     undo() {}

//     /**
//      * Goes redo to state.
//      * Returns false if redo is not available.
//      * @returns {Boolean}
//      */
//     redo() {}

//     /**
//      * Clears transition history
//      */
//     clearHistory() {}
// }



class FSM {
    constructor(config) {
        this.initial = config.initial;
        this.configState = this.initial;
        this.config = config;
      }
    getState() {
      return this.configState;
    }
    changeState(state) {
        let states = this.config.states;
        if (this.config.states.hasOwnProperty(state)) {
          this.configState = state;
        } else {
          throw new Error(state);
        }
      }
    trigger(event) {
      let flag = false;
      let configState = this.configState;
      let config = this.config;
      function objectClone(config) {
        let config2 = {};
        for (var key in config) {
          if (typeof config[key] == "object") {
            config2[key] = objectClone(config[key]);
          } else {
            config2[key] = config[key];
          }
        }
        if (!config[key]) {
          return;
        }
        return config2;
      }
      function ObjectSearch(config2) {
        for (let key in config2) {
          if (typeof config2[key] !== "object") {
            if (event === key) {
              flag = true;
              configState = config2[key];
              return configState;
            }
          } else {
            config2[key] = ObjectSearch(config2[key]);
          }
        }
        
        return configState;
      }  
      let config2 = objectClone(config);
      this.configState = ObjectSearch(config2);
      if(flag == false){
          throw new Error(event)
        }
    }
    reset() {
      this.configState = this.initial;
    }
    getStates(event) {
      let states = this.config.states;
      let statesArr = [];
      for(let key in states){
        statesArr.push(key)
      }
      
      return statesArr;
    }
    undo() {}
    redo() {}
    clearHistory() {}
  }

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
