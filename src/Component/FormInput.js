import React from 'react';
//import "../styles/css/Note.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const FormInput = function(props){
  const renderFormInputs = () => {
    let formInputArr = [];
    props.inputFields.forEach((inputField, index) => {
      formInputArr.push (
        <div key={index} className={inputField.class}>
          <label>
            {inputField.title}
          </label>
          <input 
            type={inputField.type}
            id={inputField.id} 
            name={inputField.name} 
            placeholder={inputField.placeholder} 
            value={inputField.value} 
            onChange={(e) => inputField.handleChange(e)}/>
        </div>
      );
    })
    formInputArr.push(
      <button type="submit" value="Save Post" onClick={props.savePost}> Save Post </button>
    )
    return formInputArr;
  };
  
  return renderFormInputs();
  
}

export default FormInput;
