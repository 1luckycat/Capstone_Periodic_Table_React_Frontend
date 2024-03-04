import * as _React from 'react';
import { styled } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


// internal imports
import tableImage from '../../assets/images/imagebg.jpg';
import { NavBar } from '../sharedComponents';



interface Props {
    title: string
}


const Root = styled('div')({
    padding: 0,
    margin: 0
})

const Main = styled('main')({
    backgroundImage: `url(${tableImage});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
    marginTop: '10px'
})

const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})



export const Home = (props: Props) => {
    const myAuth = localStorage.getItem('auth')
    return (
        <Root>
            <NavBar />
            <Main>
                <MainText>
                    <Typography variant='h3'>{ props.title }</Typography>
                    <Button sx={{ marginTop: '30px' }} component={Link} to={ myAuth === 'true' ? '/table' : '/auth' } variant='contained'>Periodic Table</Button>
                </MainText>
            </Main>
        </Root>
    )
}


