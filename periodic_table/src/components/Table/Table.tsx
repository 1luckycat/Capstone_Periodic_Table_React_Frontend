import * as _React from 'react';
import './table.css';
import { useState, useEffect } from 'react';  
import { useForm, SubmitHandler } from 'react-hook-form';
import { MessageType } from '../Auth';
import { 
    Box,
    Button,
    Snackbar,
    Alert,
    Dialog,
    DialogContent,
    DialogContentText,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';



// internal imports
import { useGetElementTable, ElementProps } from '../../customHooks';
import { NavBar, InputText } from '../sharedComponents';
import { serverCalls } from '../../api';


export interface SubmitProps {
    notes: string
}

export interface AddElementProps {
    addElement: ElementProps
}


const AddToStudy = (study: AddElementProps) => {
    const [ open, setOpen ] = useState(false);
    const [ message, setMessage ] = useState<string>();
    const [ messageType, setMessageType ] = useState<MessageType>();
    const { register, handleSubmit } = useForm<SubmitProps>();
    let myElement = study.addElement


    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault();
        console.log(data)
        
        // sending off as body in servercalls
        const createElement = {
            "name": study.addElement.name,
            "notes": data.notes
        }

    serverCalls.addElement(createElement)
    .then((_newAddEle) => {
        setMessage(`Successfully added element ${myElement.name} to your study guide.`)
        setMessageType('success')
        setOpen(true)
    })
    // can add if wanting page to reload after submitting element to guid
    // .then(() => {
    //     setTimeout(() => window.location.reload(), 1000)
    // })
    .catch((error) => {
        setMessage(error.message)
        setMessageType('error')
        setOpen(true)
    })

    }


    return (
        <Box>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Box>
                    <label htmlFor='notes'>Adding {myElement.name} to your study guide!  Would you like to add notes as well?</label>
                    <InputText {...register('notes')} name='notes' placeholder='Enter notes here or press submit to add without notes'/>
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            
            <Snackbar
                open={open}
                autoHideDuration={1500}
                onClose={() => setOpen(false)}
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

// colors for different element category
export const colorMap: ColorMap = {
    "diatomic nonmetal": "#74BBFB",
    "noble gas": "#7B68EE",
    "alkaline earth metal": "#008000",
    "alkali metal": "#15F2FD",
    "transition metal": "#CC0002",
    "post-transition metal": "#A1ECA7",
    "polyatomic nonmetal": "#997B5E",
    "actinide": "#E73895",
    lanthanide: "#FEE502",
    metalloid: "#FF681F"
};

interface ColorMap {
    [key: string]: string
}



export const Table = () => {

    const { elementTableData } = useGetElementTable()
    console.log(elementTableData)
    const [ currentStudy, setCurrentStudy] = useState<ElementProps>();
    const [ studyOpen, setStudyOpen ] = useState(false)
    const [ loading, setLoading ] = useState(true);

// To display loading spinner until periodic table is displayed 
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
        <div className='bigContainer'>
        <div>
            <NavBar />
            <h1 className="title">Periodic Table</h1>
            <div className = "periodic-table">
                {loading ? (
                    <div className='loader'>
                    <CircularProgress className='progress' />
                    <div>Loading table...</div>
                </div>
                ) : (
                <> 
                { elementTableData.map((element) => (
                <div className = "element" key={element.name} style={{
                    gridColumn: element.xpos, gridRow: element.ypos, borderColor: colorMap[element.category], backgroundColor: colorMap[element.category]}} 
                    onClick={()=> {setStudyOpen(true); setCurrentStudy(element as ElementProps)}}
                    
                    > 
                    <small className="number">{element.atomic_number}</small>
                    <strong className="symbol">{element.symbol}</strong>
                    <small className='name'>{element.name}</small>
                    
                </div> 
                ))}
            </>)} 
                
            </div>
            <Dialog open={studyOpen} onClose={() => {setStudyOpen(false)}}>
                <DialogContent>
                    <DialogContentText>Add to Study Guide</DialogContentText>
                    <AddToStudy addElement = { currentStudy as ElementProps }/>
                    
                </DialogContent>
            </Dialog>
        </div>
        
        </div>
    )
}







// CODE IF I WAS ADDING TO FIREBASE DATABASE
// const AddToStudy = (study: AddElementProps) => {
//     const db = getDatabase();
//     const [ open, setOpen ] = useState(false);
//     const [ message, setMessage ] = useState<string>();
//     const [ messageType, setMessageType ] = useState<MessageType>();
//     const { register, handleSubmit } = useForm<SubmitProps>();
//     let myElement = study.addElement


//     const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
//         if (event) event.preventDefault();

//         const userId = localStorage.getItem('uuid')
//         const addEle = ref(db, `study/${userId}/`)

//         myElement.notes ? myElement.notes = data.notes : ""

//     push(addEle, myElement)
//         .then((_newAddEle) => {
//             setMessage(`Successfully added element ${myElement.name} to your study guide.`)
//             setMessageType('success')
//             setOpen(true)
//         })
//         .then(() => {
//             setTimeout(() => window.location.reload(), 1500)
//         })
//         .catch((error) => {
//             setMessage(error.message)
//             setMessageType('error')
//             setOpen(true)
//         })


