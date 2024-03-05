import * as _React from 'react';
import { useState, useEffect } from 'react';


// internal imports
import { serverCalls } from '../api';
import { serverCalls2 } from '../api';

export interface ElementProps {
    element_id: string,
    name: string,
    symbol: string,
    atomic_number: number,
    phase: string,
    atomic_mass: number,
    summary: string,
    boil: number,
    melt: number,
    category: string,
    notes: string,
    user_id: string

}

interface GetElementProps {
    elementData: ElementProps[]
    getData: () => void
}


export const useGetElement = (): GetElementProps => {
    const [ elementData, setElementData ] = useState<ElementProps[]>([])

    const handleDataFetch = async () => {
        const result = await serverCalls.getElement()

        setElementData(result)
    }

    useEffect( () => { handleDataFetch() }, [])

    return { elementData, getData: handleDataFetch }
}




//  TRY OUT CODE TO GET DATA FOR PERIODIC TABLE PAGE
export interface ElementTableProps {
    name: string,
    symbol: string,
    atomic_number: number,
    xpos: number,
    ypos: number,
    category: string
}

interface GetElementTableProps {
    elementTableData: ElementTableProps[]
    getData: () => void
}


export const useGetElementTable = (): GetElementTableProps => {
    const [ elementTableData, setElementTableData ] = useState<ElementTableProps[]>([])

    const handleDataFetch = async () => {
        const result = await serverCalls2.getElementTable()

        setElementTableData(result)
    }

    useEffect( () => { handleDataFetch() }, [])

    return { elementTableData, getData: handleDataFetch }
}