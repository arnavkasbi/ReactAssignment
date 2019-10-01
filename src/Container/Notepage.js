import React, {Component} from 'react';
import FormInput from '../Component/FormInput';
import Note from '../Component/Note';
import '../styles/css/Notepage.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {saveNote, deleteNote,updateNote} from '../Store/action';

class Notepage extends Component{
  constructor(props){
    super(props);
    this.state = {
      noteList : [],
      noteHeading: "",
      noteData: "",
      enablePost:false,
      enableEdit: true,
      updateIndex : null,
      inputFields : [
        { fieldClass:"", class: "row", title: "Title", type:"text", id:"noteHeading", name:"noteHeading", placeholder: "Enter Title", value:"", handleChange: this.handleChange },
        { fieldClass:"", class: "row", title: "Content", type:"text", id:"noteData", name:"noteData", placeholder: "Enter Content", value:"", handleChange: this.handleChange }   
      ]
    };
    
  }

  handleChange = (e) => {
    let target = "";
    try {
      if(e.target.id === "noteHeading"){
        target = "noteHeading";
      } else {
        target = "noteData";
      }
      //if(this.state[target] !== e.target.value){
        let updateFieldArr = [...this.state.inputFields];
        updateFieldArr.forEach((val)=>{
          if(val.id===e.target.id)
            val.value = e.target.value;
        });
        this.setState({ 
          [target] : e.target.value, 
          inputFields : updateFieldArr
        });
      //}
    } catch (e) {
      console.log(e);
    }
  };

  validateForm = () => {
    let validFlag = true;
    try {
      if(this.state.noteHeading === "" || this.state.noteData === ""){
        validFlag = false;
      }
      return validFlag;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  enablePost = () => {
    this.setState({ enablePost : true });
  }

  savePost = (e) =>{
    e.preventDefault();
    this.setState({ enableEdit : true });
    let isValid = this.validateForm();
    if(isValid){
      
      let stateCopy = {...this.state};
      let inputFieldArr = [...this.state.inputFields].map(val=>{
        val.value = "";
        return val;
      });
      if(stateCopy.updateIndex !== null){
        let noteListCopy = [...this.props.noteList];
        noteListCopy[stateCopy.updateIndex] = {header : stateCopy.noteHeading, content: stateCopy.noteData};
        this.props.updateNote(noteListCopy);
        this.setState({ updateIndex:null, enablePost : false , noteHeading : "", noteData : "", inputFields:inputFieldArr });
      } else {
        this.props.saveNote({header : stateCopy.noteHeading, content: stateCopy.noteData});
        this.setState({  enablePost : false , noteHeading : "" , noteData : "", inputFields:inputFieldArr });
      }
     
    }
  };

  editPost = (index) => {
    let inputFieldArr = [...this.state.inputFields];
    inputFieldArr[0].value = this.props.noteList[index].header;
    inputFieldArr[1].value = this.props.noteList[index].content;
    this.setState({ 
      updateIndex:index, 
      enableEdit: false, 
      enablePost : true, 
      noteHeading : this.props.noteList[index].header, 
      noteData : this.props.noteList[index].content,
      inputFields: inputFieldArr 
    })
  }

  deletePost = (index) => {
    let noteListCopy = [...this.props.noteList];
    if(index < noteListCopy.length){
      noteListCopy.splice(index, 1);
      this.props.deleteNote(noteListCopy);
    }
  }

  render(){
    return(
      <div id="noteForm" className="wrapper fadeInDown">
        <div>
          <h1>Note Page</h1>
          <label className="pull-right">Welcome {this.props.username}</label>
        </div>        
        <div id="viewport" className="row" style = {{width : "90%"}}>
        {/* Sidebar */}
          <div id="sidebar" className="col-md-5" >
            <Note 
              noteList = {this.props.noteList} 
              updatePost={this.editPost} 
              deletePost={this.deletePost}
              enableEdit={this.state.enableEdit}
              >
            </Note>
          </div>
          {/*Content*/ } 
          <div id="content" className="col-md-7">
            <div className="container-fluid">
              <button className="pull-right" onClick={this.enablePost}>Add Note</button>
            </div>
            {this.state.enablePost ? 
            <div style={{marginTop : "20px"}}>
              <form>
                <FormInput 
                  inputFields = {this.state.inputFields} 
                  onSubmit={this.savePost} 
                  submitBtnValue="Save Post"
                  submitBtnClass="button"
                ></FormInput>
              </form>
            </div> :
            <div style = {{ visibility : "hidden"}}>
              <form>
                <FormInput inputFields = {this.state.inputFields} savePost={this.savePost}></FormInput>
              </form>
            </div>}
          </div>
        </div>
      </div>
    )
  
  }
}

const mapStateToProps = (state) => {
  return {
    noteList : state.list.notes
  };
};


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveNote, deleteNote, updateNote
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Notepage);
