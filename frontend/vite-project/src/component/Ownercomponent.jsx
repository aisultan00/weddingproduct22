import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Paper, List, ListItem, ListItemText, Button, TextField, Box, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"
import CopyLinkButton from './CopyLinkButton';

const Ownercomponent  = (props) => {
    const [wedding, setWedding] = useState(null);
    const [guestCount, setGuestCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://weddingproduct22.onrender.com/api/${props.link}/${props.id}`)
        .then(res => {
            setWedding(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });

        axios.get(`https://weddingproduct22.onrender.com/api/${props.link}/${props.id}/guest-count`)
            .then(res => setGuestCount(res.data.guestCount))
            .catch(err => console.error(err));
    }, [props.id,props.link]);
    if (loading) {
        return <Typography>Жүктелуде...</Typography>;
    }
  return (
    <motion.div
                    className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
    <Container maxWidth="md" sx={{ padding: 3,}}>
            <Paper 
                elevation={3} 
                 className='paper'
                 sx={{p:4,
                    borderRadius:3,
                    background:"rgba(33,150,243,0.06)"}}
            >
                <Typography variant="h6" sx={{ mt: 3, color: '#1565c0', fontWeight: 'bold' }}>{`Қонақтар саны: ${guestCount}`}</Typography>

<Typography variant="h6" sx={{ mt: 3, color: '#1565c0', fontWeight: 'bold' }}>{`Отбасылар мен қонақтар:`}</Typography>

{wedding.families.length === 0 ? (
    <Typography>Әлі ешкім жоқ</Typography>
) : (
    <List>
        {wedding.families.map((family, index) => (
            <Card elevation={4} sx={{ mt: 2, borderRadius: 3, bgcolor: 'rgba(33,150,243,0.06)' }} key={index}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2196F3' }}>{family.familyName}</Typography>
                    <List>
                        {family.guests.map((guest, i) => (
                            <ListItem key={i}>
                                <ListItemText primary={guest.name} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#03A9F4'}}>{family.wish}</Typography>
                </CardContent>
            </Card>
        ))}
    </List>
)}
           </Paper>
        </Container>
        </motion.div>
  )
}

export default Ownercomponent 