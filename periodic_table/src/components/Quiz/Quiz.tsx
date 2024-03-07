import * as _React from 'react';
import './quiz.css';
import { NavBar } from '../sharedComponents';


export const Quiz = () => {
    return (
        <div>
            <NavBar />
            <h1 className="quizPage"style={{ marginTop: '50px'}}>The Quiz Page (Under construction...)
            <span className='quiz' id='q'>Q</span>
            <span className='quiz' id='u'>u</span>
            <span className='quiz' id='i'>i</span>
            <span className='quiz' id='z'>z</span></h1>
        </div>

    )
}