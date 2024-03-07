import React from "react";
import { connect } from "react-redux";

import { InAction } from "../GlobalStore/Action";

import { DecAction } from "../GlobalStore/Action";

// const ReduxForm = ({local_variable , InAction, DeAction})=> {
//   return (
//     <div>
//         <h1>{local_variable}</h1>
//         <button  > </button>
//         </div>
//   )
// }

// const mapStateToProsp=state=>({
//     local_variable:state
// })

// export default connect(mapStateToProsp)(ReduxForm,{InAction},{DeAction});

import { Component } from "react";

export class ReduxForm extends Component {
  render() {
    const { local_variable, InAction, DecAction } = this.props;
    return (
      <div>
        <h1> {local_variable} </h1>
        <button onClick={InAction}> INCREMENT</button>
        <button onClick={DecAction}> DECREMENT </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  local_variable: state,
});

export default connect(mapStateToProps,{ InAction ,DecAction })(ReduxForm);
