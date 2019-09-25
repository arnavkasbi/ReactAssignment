export const saveNote = note =>{
    return {
        type : "SAVE_NOTE",
        data : note
    }    
}


export const deleteNote = list =>{
    return {
        type : "DELETE_NOTE",
        data : list
    }    
}


export const updateNote = list =>{
    return {
        type : "UPDATE_NOTE",
        data : list
    }    
}
