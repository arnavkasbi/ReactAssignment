import React, {Component} from 'react';
import "../styles/css/App.css";

class Loginpage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="wrapper fadeInDown">
        <h1>Login Form</h1>
        <div id="loginForm" className="wrapper fadeInDown">
          <form>
            <input type="text" id="login" className="fadeIn second" value={this.props.username} name="login" placeholder="login" onChange={this.props.handleChange}/>
            <input type="password" id="password" className="fadeIn third" value={this.props.password} name="login" placeholder="password" onChange={this.props.handleChange}/>
            <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.props.handleSubmit} />
          </form>
        </div>
      </div>
    )
  }
  
}

export default Loginpage;
