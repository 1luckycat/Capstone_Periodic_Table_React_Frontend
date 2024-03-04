import * as _React from 'react';
import './table.css';

// internal imports
import { useGetElementTable, ElementTableProps } from '../../customHooks';
import { NavBar } from '../sharedComponents';

export const Table = () => {

    const { elementTableData } = useGetElementTable()
    console.log(elementTableData)


    const handleClick = () => {
        console.log('Test test');
    }

    return (

        <div>
            <NavBar />
            <h1 className="title">Periodic Table</h1>
            <div className = "periodic-table">
                { elementTableData.map((element) => (
                <div className = "element" key={element.name} style={{
                    gridColumn: element.xpos, gridRow: element.ypos}} onClick={handleClick}
                    > 
                    <small className="number">{element.atomic_number}</small>
                    <strong className="symbol">{element.symbol}</strong>
                    <small className='name'>{element.name}</small>
                </div> 
                ))}
            </div>
        </div>
    )
}


