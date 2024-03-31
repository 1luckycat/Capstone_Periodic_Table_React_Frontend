import * as _React from 'react';
import './quiz.css';
import { NavBar } from '../sharedComponents';
import { useGetElementTable } from '../../customHooks';
import { useState, useEffect } from 'react';
import { serverCalls } from '../../api';
import { CircularProgress } from '@mui/material';


interface Element {
    symbol: string;
    name: string;
}

export const Quiz = () => {

    const { elementTableData } = useGetElementTable();
    const [ loading, setLoading ] = useState(true)
    const [ flippedIndex, setFlippedIndex ] = useState<number | null>(null)
    const [ displayRandom, setDisplayRandom ] = useState<Element[]>([]);

    console.log(elementTableData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                setLoading(true);
                
                const data: Element[] = await serverCalls.getElementTable();

                if (data) {
                    setLoading(false);
                    setDisplayRandom(shuffleArray(data));    // can add setDisplayRandom(shuffleArray(data).slice(0, 50)); here to only get random 50 elements to display
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); 
            }
        };

        fetchData(); 
    }, []);


    const handleFlip = (index: number) => {
        setFlippedIndex(index === flippedIndex ? null : index);
    };


    const shuffleArray = (array: any[]) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    };


    const handleRandom = () => {
        setDisplayRandom(shuffleArray(elementTableData));  // can add setDisplayRandom(shuffleArray(elementTableData).slice(0, 50)); here to only get random 50 elements to display
        setFlippedIndex(null);
    };


    return (
        <div className='mainPage'>
            <NavBar />
            <div className='top'>
            <h1 className='cardTitle'>Flashcards</h1>
            <button className='shuffle' onClick={handleRandom}>Shuffle Elements</button>
            </div>
            <div className="flashcard-container">
                {loading ? (
                    <div className='flashLoader'>
                    <CircularProgress className='flashProgress' />
                    <div>Loading Flashcards...</div>
                </div>
                ) : (
                <> 
                {displayRandom.map((flashcard: Element, index: number) => (
                    <div
                        className={`flashcard ${flippedIndex === index ? 'flip' : ''}`}
                        key={index}
                        onClick={() => handleFlip(index)}
                    >
                        <div className="front">
                            <div className="flashcards-symbol">{flashcard.symbol}</div>
                        </div>
                        <div className="back">
                            <div className="flashcards-name">{flashcard.name}</div>
                        </div>
                    </div>
                ))}
                </>)} 

            </div>
        </div>

    )
}