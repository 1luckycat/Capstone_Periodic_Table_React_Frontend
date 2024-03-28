import * as _React from 'react';
import './quiz.css';
import { NavBar } from '../sharedComponents';
import { ElementProps, useGetElementTable } from '../../customHooks';
import { Grid } from '@mui/material';
import { useState } from 'react';


export const Quiz = () => {

    const { elementTableData } = useGetElementTable();
    const [ flip, setFlip ] = useState(false)

    console.log(elementTableData)

    return (
        <div>
            <NavBar />
            <Grid className="card-grid">
            { elementTableData.map((flashcard) => (
                <div className = "flashcard" key={flashcard.name} onClick={() => setFlip(!flip)}>
                    {flip ? flashcard.name : flashcard.symbol}
                    
                </div>
                    
            ))}
            </Grid>
        </div>

    )
}