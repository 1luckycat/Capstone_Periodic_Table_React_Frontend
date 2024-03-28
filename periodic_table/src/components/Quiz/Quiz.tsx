import * as _React from 'react';
import './quiz.css';
import { NavBar } from '../sharedComponents';
import { useGetElementTable } from '../../customHooks';
import { useState, useEffect } from 'react';
import { serverCalls } from '../../api';


export const Quiz = () => {

    const { elementTableData } = useGetElementTable();
    const [ flip, setFlip ] = useState(false)
    // const [ flashcards, setFlashcards ] = useState(elementTableData)
    const [ loading, setLoading ] = useState(true)

    console.log(elementTableData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                setLoading(true);
                
                const data = await serverCalls.getElementTable();

                if (data) {
                    setLoading(false);
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); 
            }
        };

        fetchData(); 
    }, []);


    return (
        <div>
            <NavBar />
            <div className={`flashcard-container ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}
            >
                {elementTableData.map((flashcard, index) => (
                    <div className='flashcard' key={index}>
                        <div className='front'>
                            <div className='flashcard-symbol'>{flashcard.symbol}</div>
                        </div>
                        <div className='back'>
                            <div className='flashcards-name'>{flashcard.name}</div>
                        </div>
                    </div>
                ))}


                {/* THIS WORKS BEST BUT STILL FLIPS ALL ELEMENTS */}
                {/* <div className='front'>
                    
                    { elementTableData.map((flashcards) => {
                        return <div className = 'flashcards-symbol'>{flashcards.symbol}</div>
                    })}
                </div>
                <div className='back'>
                    { elementTableData.map((flashcards) => {
                        return <div className = 'flashcards-name'>{flashcards.name}</div>
                    })}</div> */}



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