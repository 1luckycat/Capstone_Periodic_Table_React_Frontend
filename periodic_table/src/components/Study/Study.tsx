import * as _React from 'react';
import './study.css'
import { useState, useEffect } from 'react';
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
                    <label htmlFor='notes'>Update Notes</label>
                    <InputText {...register('notes')} name='notes' placeholder='Enter notes here' />
                </Box>
                <Button type='submit'>Submit</Button>
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
    const [ loading, setLoading ] = useState(true)

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



    useEffect(() => {
        const fetchData = async () => {
            try {
                
                setLoading(true);
                
                const data = await serverCalls.getElement();

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

        <Box className='page' sx={ studyStyles.main }>
            <NavBar />
            <div className="rain">
                <div className="elementSymbol">
            <Typography className="studyTitle" variant='h4' sx={ studyStyles.typography }>
                Your Study Guide
            </Typography>
            <Grid className="container" container spacing={3} sx={ studyStyles.grid }>
            {loading ? (
                    <div className='studyLoader'>
                    <div>Loading Study Guide...</div>
                </div>
                ) : (
                <> 
                { elementData?.map(( element: ElementProps, index: number ) => (
                    <Grid item key={index} >
                        <Card className='card' sx={ studyStyles.card }>
                        <DeleteForeverIcon className='deleteIcon' onClick = {() => deleteElement(element.element_id)} />
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
                                        onClick = { () => { setNotesOpen(true); setElementId(element.element_id)}}
                                    >
                                        Update Notes
                                    </Button>

                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                ))}
                </>)} 
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
                <span>H</span><span>He</span><span>Li</span><span>Be</span><span>B</span><span>C</span><span>N</span>
                <span>O</span><span>F</span><span>Ne</span><span>Na</span><span>Mg</span><span>Al</span><span>Si</span>
                <span>P</span><span>S</span><span>Cl</span><span>Ar</span><span>K</span><span>Ca</span><span>Sc</span>
                <span>Ti</span><span>V</span><span>Cr</span><span>Mn</span><span>Fe</span><span>Co</span><span>Ni</span>
                <span>Cu</span><span>Zn</span><span>Ga</span><span>Ge</span><span>As</span><span>Se</span><span>Br</span>      
                <span>Kr</span><span>Rb</span><span>Sr</span><span>Y</span><span>Zr</span><span>Nb</span><span>Mo</span>
                <span>Tc</span><span>Ru</span><span>Rh</span><span>Pd</span><span>Ag</span><span>Cd</span><span>In</span>
                <span>Sn</span><span>Sb</span><span>Te</span><span>I</span><span>Xe</span><span>Cs</span><span>Ba</span>
                <span>La</span><span>Hf</span><span>Ta</span><span>W</span><span>Re</span><span>Os</span><span>Ir</span>
                <span>Pt</span><span>Au</span><span>Hg</span><span>Ti</span><span>Pb</span><span>Bi</span><span>Po</span>
                <span>At</span><span>Rn</span><span>Fr</span><span>Ra</span><span>Ac</span><span>Rf</span><span>Db</span>
                <span>Sg</span><span>Bh</span><span>Hs</span><span>Mt</span><span>Ds</span><span>Rg</span><span>Cn</span>
                <span>Nh</span><span>Fl</span><span>Mc</span><span>Lv</span><span>Ts</span><span>Og</span><span>Ce</span>
                <span>Pr</span><span>Nd</span><span>Pm</span><span>Sm</span><span>Eu</span><span>Gd</span><span>Tb</span>
                <span>Dy</span><span>Ho</span><span>Er</span><span>Tm</span><span>Yb</span><span>Lu</span><span>Th</span>
                <span>Pa</span><span>U</span><span>Np</span><span>Pu</span><span>Am</span><span>Cm</span><span>Bk</span>
                <span>Cf</span><span>Es</span><span>Fm</span><span>Md</span><span>No</span><span>Lr</span>
            </div>
            </div>
        </Box>  
    )
}

