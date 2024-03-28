import * as _React from 'react';
import './quiz.css';
import { NavBar } from '../sharedComponents';
import { useGetElementTable } from '../../customHooks';
import { useState } from 'react';


export const Quiz = () => {

    const { elementTableData } = useGetElementTable();
    const [ flip, setFlip ] = useState(false)

    console.log(elementTableData)

    return (
        <div>
            <NavBar />
            <div className={`card ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}
            >
                <div className='front'>
                    
                    { elementTableData.map((flashcard) => {
                        return <div className = 'flashcard-symbol'>{flashcard.symbol}</div>
                    })}
                </div>
                <div className='back'>
                    { elementTableData.map((flashcard) => {
                        return <div className = 'flashcard-name'>{flashcard.name}</div>
                    })}</div>

            {/*  THIS WORKS WITH FLIP, BUT FLIPS ALL ELEMENTS */}
            {/* { elementTableData.map((flashcard) => (
                <div className = "flashcard" key={flashcard.name}>
                    {flip ? flashcard.name : flashcard.symbol}
                    
                </div>
                    
            ))} */}
            </div>
        </div>

    )
}