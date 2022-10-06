import React from 'react';
import Header from "../header/Header"
import Form from '../form/Form';
import './style.css';

function Layout(){
    return(
        <>
    <div className='total'>
        <div>
            <Header/>
            <Form/>
        </div>
        </div>
</>
    )
}


export default Layout