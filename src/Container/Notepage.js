import React, {Component} from 'react';
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
      updateIndex : null
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
      if(this.state[target] !== e.target.value){
        this.setState({ [target] : e.target.value });
      }
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
    let isValid = this.validateForm();
    if(isValid){
      
      let stateCopy = {...this.state};

      if(stateCopy.updateIndex !== null){
        let noteListCopy = [...this.props.noteList];
        noteListCopy[stateCopy.updateIndex] = {header : stateCopy.noteHeading, content: stateCopy.noteData};
        this.props.updateNote(noteListCopy);
        this.setState({ updateIndex:null, enablePost : false , noteHeading : "" , noteData : "" });
      } else {
        this.props.saveNote({header : stateCopy.noteHeading, content: stateCopy.noteData});
        this.setState({  enablePost : false , noteHeading : "" , noteData : "" });
      }
     
    }
  };

  editPost = (index) => {
    this.setState({ updateIndex:index, enablePost : true, noteHeading : this.props.noteList[index].header, noteData : this.props.noteList[index].content })
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
          <div id="sidebar" className="col-md-5">
            <Note 
              noteList = {this.props.noteList} 
              updatePost={this.editPost} 
              deletePost={this.deletePost}>
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
                <div className="row">
                <label>Title</label>
                <input type="text" id="noteHeading" name="noteHeading" placeholder="Enter the heading" value={this.state.noteHeading} onChange={this.handleChange}/>
                </div>
                <div className="row">
                <label>Body</label>
                <input type="text" id="noteData" name="noteData" placeholder="Enter the content" value={this.state.noteData} onChange={this.handleChange}/>
                </div>
                <button type="submit" value="Save Post" onClick={this.savePost}> Save Post </button>
              </form>
            </div> :
            <div style = {{ visibility : "hidden"}}>
              <form>
                <input type="text" id="noteHeading" name="noteHeading" placeholder="Enter the heading" value={this.state.noteHeading} onChange={this.handleChange}/>
                <input type="text" id="noteData" name="noteData" placeholder="Enter the content" value={this.state.noteData} onChange={this.handleChange}/>
                <input type="submit" value="Save Post" />
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
