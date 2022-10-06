import React from 'react';
import Todo from "../todo/Todo"
import './style.css';

function List(props){
     // {list: list, hello: "hi"}

    const list = props.list
    const handleDelete = props.handleDelete
    const isDoneList = props.isDoneList
    const isNotDoneList = props.isNotDoneList
    const handleisDone = props.handleisDone
    // 구조분해 => 주로 객체의 특정 키만 뽑아서 쓸때 사용함 (ES6 문법)
    // const {list} = props (7번째 줄이랑 같은 의미)
    return(
        <>
            <div>
                <h1>Working...</h1>
                {isNotDoneList.map((card)=>{
                // {title: "a", content: "b", isDone: false}
                    return <Todo item={card} handleDelete={handleDelete} handleisDone={handleisDone}/> // {item: card}
                })}
            </div>
            <div>
                <h1>Done</h1>
                {isDoneList.map((card)=>{
                // {title: "a", content: "b", isDone: false}
                       return <Todo item={card} handleDelete={handleDelete} handleisDone={handleisDone}/> // {item: card}
                })}
            </div>
        </>
        
    )
}
export default List