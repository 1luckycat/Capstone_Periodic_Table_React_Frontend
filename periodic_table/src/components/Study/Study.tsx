import * as _React from 'react';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getDatabase, ref, push, onValue, off, remove, update } from 'firebase/database';
import {
    Accordion,
    AccordionSummary, 
    AccordionDetails,
    Card,
    CardContent,
    Grid,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Stack,
    Typography,
    Snackbar,
    Alert,
    TextField,
} from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


// internal imports
import { useGetElement, ElementProps } from '../../customHooks';
import { NavBar, InputText } from '../sharedComponents';
import { theme } from '../../Theme/themes';
import { MessageType } from '../Auth';
import { serverCalls } from '../../api';



export const studyStyles = {
    main: {
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'absolute',
        overflow: 'auto',
        paddingBottom: '100px'
    }, 
    grid: {
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    card: {
        width: '700px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
        boarder: '2px solid',
        borderColor: 'black',
        borderRadius: '10px',

    },
    button: {
        color: 'white',
        borderRadius: '10px',
        height: '45px',
        width: '250px',
        marginTop: '20px',
        backgroundColor: theme.palette.info.main
    }, 
    stack: {
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    typography: {
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}





export const Study = () => {

    const { elementData } = useGetElement();
    const [ currentElement, setCurrentElement ] = useState<ElementProps>();
    const [ studyOpen, setStudyOpen ] = useState(false);
    const db = getDatabase();
    const [ open, setOpen] = useState(false);
    const [ message, setMessage ] = useState<string>();
    const [ messageType, setMessageType ] = useState<MessageType>();
    const userId = localStorage.getItem('uuid');
    const elementRef = ref(db, `study/${userId}/`);

    console.log(elementData)

    // useEffect(() => {
    //     onValue(elementRef, (snapshot) => {
    //         const data = snapshot.val()
    //         console.log(data)
    //         let elementList = []

    //         if (data) {
    //             for (let [key, value] of Object.entries(data)) {
    //                 let elementItem = value as ElementProps
    //                 elementItem['element_id'] = key
    //                 elementList.push(elementItem)
    //             }
    //         }

    //         setCurrentElement(elementList as ElementProps[])
    //     })

    //     return () => {
    //         off(elementRef)
    //     }
    // }, [])
    // console.log(currentElement)




    const updateNotes = async ( elementItem: ElementProps ) => {
        const eleRef = ref(db, `study/${userId}/${elementItem.element_id}`)

        update(eleRef, {
            notes: elementItem.notes
        })
        .then(() => {
            setMessage(`Successfully updated your Study Guide.`)
            setMessageType('success')
            setOpen(true)
        })
        .then(() => { setTimeout(() => window.location.reload(), 1500)})
        .catch((error) => {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        })
    }



    const deleteElement = async ( elementItem: ElementProps ) => {
        const eleRef = ref(db, `study/${userId}/${elementItem.element_id}`)

        remove(eleRef)
        .then(() => {
            setMessage('Successfully deleted item from Study Guide')
            setMessageType('success')
            setOpen(true)
        })
        .then(() => { setTimeout( () => window.location.reload(), 1500)})
        .catch ((error) => {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        })

    }






    return (
        <Box sx={ studyStyles.main }>
            <NavBar />
            <Typography variant='h4' sx={ studyStyles.typography }>
                Your Study Guide
            </Typography>
            {/* container spacing={3} */}
            <Grid className="container" container spacing={3} sx={ studyStyles.grid }>
                { elementData?.map(( element: ElementProps, index: number ) => (
                    <Grid item key={index} >
                        <Card sx={ studyStyles.card }>
                            <DeleteForeverIcon onClick={() => deleteElement(element)}/>
                            <CardContent>
                                <Stack
                                    direction = 'column'
                                    justifyContent = 'center'
                                    alignItems = 'center'
                                >
                                    <Stack
                                        direction = 'row'
                                        justifyContent = 'center'
                                        alignItems = 'center'
                                    >
                                        <Accordion sx={{ color: 'black', width: '600px' }}>
                                            <AccordionSummary expandIcon={<KeyboardDoubleArrowDownIcon sx={{ color: theme.palette.primary.main }} /> }>
                                                <Typography><strong>{element.name}</strong></Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography><strong>Symbol:</strong> {element.symbol}</Typography>
                                                <Typography><strong>Atomic Number:</strong> {element.atomic_number}</Typography>
                                                <Typography><strong>Phase:</strong> {element.phase}</Typography>
                                                <Typography><strong>Atomic Mass:</strong> {element.atomic_mass}</Typography>
                                                <Typography><strong>Boiling Point</strong>: {element.boil}</Typography>
                                                <Typography><strong>Melting Point:</strong> {element.melt}</Typography>
                                                <Typography><strong>Category:</strong> {element.category}</Typography>
                                                <Typography><strong>Summary:</strong> {element.summary}</Typography>
                                                <TextField 
                                                variant='outlined' 
                                                multiline={true} 
                                                rows={3} 
                                                fullWidth
                                                label="Notes"
                                                ></TextField>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Stack>
                                    <Button
                                        variant = 'contained'
                                        size = 'medium'
                                        sx={ studyStyles.button }
                                        onClick = { () => updateNotes(element)}
                                        // onClick = { () => { setStudyOpen(true); setCurrentElement(element) }}
                                    >
                                        Update Notes
                                    </Button>

                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                ))}
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={1500}
                onClose = {() => setOpen(false)}
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

