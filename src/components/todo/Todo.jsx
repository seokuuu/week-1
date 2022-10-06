import React from 'react';
import './style.css';
function Todo(props){
    console.log(props) // {item: {title: "", content: "", isDone: ""}}
    // const title = props.item.title 
    // const content = props.item.content
    // const isDone = props.item.isDone 

    const {id, title, content, isDone} = props.item 
    const handleDelete = props.handleDelete
    const handleisDone= props.handleisDone
    return(
        <div>
            <h1>{title}</h1>
            <p>{content}</p>

            {/* conditional rendering */}
            {isDone === false ?
            (
                <button onClick={() => handleisDone("done", id)}>완료하기</button>
            )
            :
            (
                <button onClick={() => handleisDone("notDone", id)}>진행중</button>
            )}
           
            <button onClick={()=>handleDelete(id)}>삭제하기</button>
           
        </div>
    )
}
export default Todo