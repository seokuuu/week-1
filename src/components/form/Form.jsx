//Form.jsx
//input 값을 넣음, list에게 주자.
import React from 'react';
import './style.css';
import List from '../list/List';
import { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';

function Form(){
const [list, setList] = useState([])
const [isDoneList, setIsDoneList] = useState([])
const [isNotDoneList, setIsNotDoneList] = useState([])
const [제목,제목변경] = useState('')
const [내용,내용변경] = useState('')

// console.log(제목)
//e.target.value = 특정 이벤트가 발생되는 태그를 의미.
//제목과 내용의 변화가 있느지에 따라, e값을 발생시켜준다. (스위치라고 생각)
const handleOnChange = (e, type)=>{
    if (type==="제목"){
        제목변경(e.target.value)
    } else if (type==="내용"){
        내용변경(e.target.value)
    }
}

//버튼을 눌러줬을 때 값을 전달하는 컴포넌트.
const handleOnClick = (e)=>{
    e.preventDefault()
    const card = {id: uuidv4(), title: 제목, content: 내용, isDone: false}
    setList([...list, card]) // list 뒤에다가 카드를 넣어준다
    //input 창을 공백으로 초기화시켜준다.
    제목변경("")
    내용변경("")
}

// filter 는 map 메서드와 같이 배열을 0-n 까지 탐색을 하는데 
// 둘의 차이는 사용용도가 다름
// filter 와 맵의 차이는 filter는 조건문을 사용해서 조건에 맞는 item 을 return 해서 새로운 배열을 만든다 
const handleDelete = (id)=>{
    const res = list.filter((item)=>{
        if (item.id !== id){
            return item
        }
    })
    setList(res)
}

const handleisDone = (target, id)=>{
    // 바꾸고자 하는 card 를 찾는다 (filter 사용)
    const result = list.filter((item)=>{
        return item.id === id
    })
    // 하지만 filter 는 본래 결과를 배열로 배출한다 
    // 필터된 (item.id === id) 는 하나이므로 
    // 우리가 찾는 카드는 무조건 result[0] 에 있다 (id 가 중복되지 않는한...)
    const selectedCard = result[0]
    // 우리가 찾는 카드 말고 나머지들을 rest 에 저장한다  
    const rest = list.filter((item)=>{
        return item.id !==id
    })
    // isDone을 true로 바꾸고 싶을때: 
    if (target === "done"){
        // spread 문법 : 객체 또는 배열에 사용할 수 있다. 
        // selectedCard 는 객체이고, spread 문법을 사용해서 
        // selectedCard 객체의 모든 key를 가져온다 
        // 그리고 isDone: true 를 추가한다 
        // 이때, 객체일 경우, 객체는 key 가 무조건 고유여야 하기 때문에 (중복 key는 애초에 있을 수 없다)
        // isDone과 같이 이미 존재하는 키를 추가 하게 되면 overwrite 되 버린다 (즉, 업데이트 된다)
        const changedCard = {...selectedCard, isDone: true}
        // 바꾼카드를 rest 배열 (즉, 우리가 selectedCard를 뺀 나머지 카드들을 담고있는 배열에)
        // push 로 추가해준다 
        rest.push(changedCard)
        // 마지막으로 원래의 list를 "업데이트" 된 rest 배열로 바꿔준다  
        setList(rest)
    } else if (target === "notDone"){
        const changedCard = {...selectedCard, isDone: false}
        rest.push(changedCard)
        setList(rest)
    }
}


// conditional-rendering 
    useEffect(()=>{
        const isDoneList = list.filter((item)=>{
            return item.isDone === true
        })
        const isNotDoneList = list.filter((item)=>{
            return item.isDone === false
        })
        setIsDoneList(isDoneList)
        setIsNotDoneList(isNotDoneList)
    },[list])

   



    return(
        <>
        <form className="add-form">
        <div className="input-group">
            <label className="form-label">제목</label>
            <input onChange={(e)=>handleOnChange(e, "제목")} type="text" name="title" value={제목} className="add-input input-body" />
            <label className="form-label">내용</label>
            <input onChange={(e)=>handleOnChange(e, "내용")} type="text" name="body" value={내용} className="add-input"/>
        </div>

        <button onClick={(e)=>handleOnClick(e)} className="add-button">추가하기</button>

        </form>
        {/* List.jsx로 list를 보내준다 */}
        {/* {list(키값): list(변수), hello: "hi"} = props */}
        <List list={list} handleDelete={handleDelete} isDoneList={isDoneList} isNotDoneList={isNotDoneList} handleisDone={handleisDone}/>  
        </>

// {id: 0, title: “”, body: “”, isDone: false} 

//     // 1. 제목과 내용을 한번에 묶어서 보내기
    // 2. 여러개니까, 배열에 순서대로 넣어주기
    
    
    
    )
    }

export default Form