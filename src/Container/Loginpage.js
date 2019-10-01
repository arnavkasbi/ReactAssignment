import React, {Component} from 'react';
import FormInput from '../Component/FormInput';
import "../styles/css/App.css";


class Loginpage extends Component{
  constructor(props){
    super(props);
    this.state = {
      loginDetails : [
        { class:"", fieldClass: "fadeIn second", title: "Login", type:"text", id:"login", name:"login", placeholder: "", value:"", handleChange: this.props.handleChange },
        { class:"", fieldClass: "fadeIn third", title: "Password", type:"password", id:"password", name:"password", placeholder: "", value:"", handleChange: this.props.handleChange }   
      ]
    };
  }

  componentDidUpdate(prevProps){
    if(prevProps.username !== this.props.username){
      let loginDetails = [...this.state.loginDetails];
      loginDetails[0].value = this.props.username;
      this.setState({loginDetails});
    }
    if(prevProps.password !== this.props.password){
      let loginDetails = [...this.state.loginDetails];
      loginDetails[1].value = this.props.password;
      this.setState({loginDetails});
    }
  }

  render(){
    return(
      <div className="wrapper fadeInDown">
        <h1>Login Form</h1>
        <div id="loginForm" className="wrapper fadeInDown">
          <form>
            <FormInput
              inputFields={this.state.loginDetails} 
              onSubmit={this.props.handleSubmit} 
              submitBtnValue="Log In"
              submitBtnClass="fadeIn fourth"
            >
            </FormInput>
          </form>
        </div>
      </div>
    )
  }
  
}

export default Loginpage;
