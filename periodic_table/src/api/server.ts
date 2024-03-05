import { ElementProps } from "../customHooks";
import { AddElementProps } from "../components/Table";


let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTU3NjY1NywianRpIjoiMmQxZmE5YTYtMThhNS00ZTBiLTg3NjUtMzdkMmY2YWU1Yzc4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlBlcmlvZGljIFRhYmxlIDIwMjQiLCJuYmYiOjE3MDk1NzY2NTcsImNzcmYiOiIzYzc4MGI1Zi03MWQyLTRhYmYtYmI1Zi01OWM2ZWRiYjY4MDQiLCJleHAiOjE3NDExMTI2NTd9.NqtcLaJJyjGcGWDn80mvK08TesnlRVt7Ozcmnq4pSQo"
let userId = localStorage.getItem('uuid')

type PartialElementProps = Partial<ElementProps>


export const serverCalls = {
    getElement: async () => {
        const response = await fetch(`https://periodic-table-study-guide-capstone.onrender.com/api/study`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }
        return await response.json()
    },



// call for periodic table info
    getElementTable: async () => {
        const response = await fetch(`https://periodic-table-study-guide-capstone.onrender.com/api/periodictable`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }
        return await response.json()
    },


// call for adding element
    addElement: async (data: AddElementProps) => {
        const response = await fetch(`https://periodic-table-study-guide-capstone.onrender.com/api/study/create/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to create data'), response.status
        }
        return await response.json()
    },


// call to delete element
    deleteElement: async (elementId: string, data: PartialElementProps) => {
        const response = await fetch (`https://periodic-table-study-guide-capstone.onrender.com/api/study/delete/${elementId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to delete data'), response.status
        }
        return await response.json()
    },


// call to update notes in an element
    updateElement: async (elementId: string, data: PartialElementProps) => {
        const response = await fetch (`https://periodic-table-study-guide-capstone.onrender.com/api/study/update/${elementId}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update data'), response.status
        }
        return await response.json()
    }

}