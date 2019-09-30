import React, {Component} from 'react';
import "../styles/css/Note.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class Note extends Component{
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
      if(currEl.id === "login"){
        target = "username";
      } else {
        target = "password";
      }

      if(this.state[target] !== e.target.value){
        this.setState({ [target] : e.target.value });
      }
    } catch (e) {
      console.log(e);
    }
  };

  renderNoteList = () => {
    let noteList = [];
    this.props.noteList.forEach((note, index)=>{
      noteList.push (
        <div key={"note_"+index} style={{ width : "100%"}}>
          <i 
            className='fa fa-pencil icon' 
            style={{ paddingLeft : "10px" }} 
            onClick = {() => this.props.updatePost(index)}
            aria-hidden="true">  
          </i>
          <i 
            className={this.props.enableEdit ? 'fa fa-remove icon' :'disable-edit fa fa-remove icon'} 
            aria-hidden="true" 
            onClick={() => this.props.deletePost(index)}>
          </i>
          
          <li>
              <label>{note.header}</label>
              <p>{note.content}</p>
          </li>
        </div>
      );
    })
    return noteList;
  }
  render(){
    //console.log(this);
    if(this.props.noteList.length > 0){
      return(
        <div>
          <ul>
            {this.renderNoteList()}
          </ul>
        </div>
      )
    } else {
      return(
        <label>No Data</label>
      )
    }
  }
}

export default Note;
