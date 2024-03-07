import * as _React from 'react';
import './quiz.css';
import { NavBar } from '../sharedComponents';


export const Quiz = () => {
    return (
        <div>
            <NavBar />
            <h1 className="quizPage"style={{ marginTop: '50px'}}>A
            <span className='quiz' id='q'>Q</span>
            <span className='quiz' id='u'>u</span>
            <span className='quiz' id='i'>i</span>
            <span className='quiz' id='z'>z</span>Page</h1>
        </div>

    )
}