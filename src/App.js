import React, {Component} from 'react';
import "./styles/css/App.css";
import Loginpage from "./Container/Loginpage";
import Notepage from "./Container/Notepage";


const password = "demo";
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn:false
    };
  }

  handleChange = (e) => {
    let currEl = e.target;
    let target = "";
    try {
      if(currEl.id == "login"){
        target = "username";
      } else {
        target = "password";
      }

      // this.setState((prevProps) => {
      //   if(prevProps[target] != currEl.value){
      //     return {
      //       target : currEl.val
      //     }
      //   }
      // })
      if(this.state[target] != e.target.value){
        this.setState({ [target] : e.target.value });
      }
    } catch (e) {
      console.log(e);
    }
  };

  validateForm = () => {
    let validFlag = true;
    try {
      if(this.state.username === "" || this.state.password === ""){
        validFlag = false;
      }
      if(this.state.password !== password){
        validFlag = false;
      }

      if(this.state.username !== "demo"){
        validFlag = false;
      }
      return validFlag;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    let isValid = this.validateForm();
    if(isValid){
      this.setState({loggedIn:true});
    }
    //submit form
  };
  render(){
    //console.log(this);
    if(this.state.loggedIn){
      return(
        <Notepage username = {this.state.username}></Notepage>
      )
    } else {
      return(
        <Loginpage handleSubmit={this.handleSubmit} username={this.state.username} password={this.state.password} handleChange={this.handleChange}></Loginpage>
      )
    }
  }
}

export default App;
