let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTU3NjY1NywianRpIjoiMmQxZmE5YTYtMThhNS00ZTBiLTg3NjUtMzdkMmY2YWU1Yzc4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlBlcmlvZGljIFRhYmxlIDIwMjQiLCJuYmYiOjE3MDk1NzY2NTcsImNzcmYiOiIzYzc4MGI1Zi03MWQyLTRhYmYtYmI1Zi01OWM2ZWRiYjY4MDQiLCJleHAiOjE3NDExMTI2NTd9.NqtcLaJJyjGcGWDn80mvK08TesnlRVt7Ozcmnq4pSQo"
let userId = localStorage.getItem('uuid')


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
    }
}


// call for periodic table info
export const serverCalls2 = {

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
    }
}