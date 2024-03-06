import * as _React from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { getDatabase, ref } from 'firebase/database';
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
    Stack,
    Typography,
    Snackbar,
    Alert,
    Divider,
    DialogActions,
} from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


// internal imports
import { useGetElement, ElementProps } from '../../customHooks';
import { NavBar, InputText } from '../sharedComponents';
import { theme } from '../../Theme/themes';
import { MessageType } from '../Auth';
import { serverCalls, PartialElementProps } from '../../api';
import { SubmitProps } from '../Table';


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
        width: '200px',
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


export interface AddProps {
    name: string,
    notes: string
}


const UpdateNotes = ( element: PartialElementProps ) => {
    const [ openAlert, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const { register, handleSubmit } = useForm<SubmitProps>({})
 

    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault();

        const updateData = {
            "notes": data.notes
        }

        console.log(element.element_id)

        const response = await serverCalls.updateElement(element.element_id as string, updateData)

        if ( response.status === 200){
            setMessage('Successfully updated notes!')
            setMessageType('success')
            setOpen(true)
            setTimeout(() => window.location.reload(), 1500)
        } else {
            setMessage(response.message)
            setMessageType('error')
            setOpen(true)
        }
    }

    return (
        <Box sx={{ padding: '20px'}}>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Box>
                    <label htmlFor='notes'>Update Notes Here</label>
                    <InputText {...register('notes')} name='notes' placeholder='Enter notes here' />
                </Box>
                <Button type='submit'>Update Notes</Button>
            </form>
        <Snackbar
            open={openAlert}
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




export const Study = () => {

    const { elementData } = useGetElement();
    // const [ currentElement, setCurrentElement ] = useState<ElementProps>();
    const [ notesOpen, setNotesOpen ] = useState(false);
    // const db = getDatabase();
    const [ open, setOpen] = useState(false);
    const [ message, setMessage ] = useState<string>();
    const [ messageType, setMessageType ] = useState<MessageType>();
    const [ element_id, setElementId ] = useState<string>();
    // const userId = localStorage.getItem('uuid');
    // const elementRef = ref(db, `study/${userId}/`);

    console.log(elementData)
    
    

    const deleteElement = async (elementId: string) => {
        console.log(elementId)

        const response = await serverCalls.deleteElement(elementId)

        if ( response.status === 200){
            setMessage('Successfully deleted element')
            setMessageType('success')
            setOpen(true)
            setTimeout(() => window.location.reload(), 1500)
        } else {
            setMessage(response.message)
            setMessageType('error')
            setOpen(true)
        }
    }

    return (
        <Box sx={ studyStyles.main }>
            <NavBar />
            <Typography variant='h4' sx={ studyStyles.typography }>
                Your Study Guide
            </Typography>
            <Grid className="container" container spacing={3} sx={ studyStyles.grid }>
                { elementData?.map(( element: ElementProps, index: number ) => (
                    <Grid item key={index} >
                        <Card sx={ studyStyles.card }>
                        <DeleteForeverIcon onClick = {() => deleteElement(element.element_id)} />
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
                                                <Divider />
                                                <Typography><strong>Symbol:</strong> {element.symbol}</Typography>
                                                <Typography><strong>Atomic Number:</strong> {element.atomic_number}</Typography>
                                                <Typography><strong>Phase:</strong> {element.phase}</Typography>
                                                <Typography><strong>Atomic Mass:</strong> {element.atomic_mass}</Typography>
                                                <Typography><strong>Boiling Point</strong>: {element.boil}</Typography>
                                                <Typography><strong>Melting Point:</strong> {element.melt}</Typography>
                                                <Typography><strong>Category:</strong> {element.category}</Typography>
                                                <Typography><strong>Summary:</strong> {element.summary}</Typography>
                                                <Divider />
                                                <Typography><strong>Notes:</strong> {element.notes}</Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Stack>
                                    <Button
                                        variant = 'contained'
                                        size = 'medium'
                                        sx={ studyStyles.button }
                                        endIcon = { <EditNoteIcon /> }
                                        onClick = { () => { setNotesOpen(true); setElementId(element.element_id)}}
                                    >
                                        Update Notes
                                    </Button>

                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                ))}
            </Grid>
            <Dialog open={notesOpen} onClose={() => setNotesOpen(false)}>
            <DialogContent>
                <UpdateNotes element_id = {element_id as string} />
            </DialogContent>
            <DialogActions>
                <Button onClick={ () => setNotesOpen(false) }>Cancel</Button>
            </DialogActions>
            </Dialog>
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

