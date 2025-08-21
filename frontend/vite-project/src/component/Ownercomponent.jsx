import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Paper, List, ListItem, ListItemText, Button, TextField, Box, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"
import CopyLinkButton from './CopyLinkButton';
import { useTheme } from '@mui/material/styles';

const Ownercomponent  = (props) => {
    const theme = useTheme();
    const pal = theme.palette.toy?.[props.link] || theme.palette.primary;
    const [wedding, setWedding] = useState(null);
    const [guestCount, setGuestCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://weddingproduct22-1.onrender.com/api/${props.link}/${props.id}`)
        .then(res => {
            setWedding(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });

        axios.get(`https://weddingproduct22-1.onrender.com/api/${props.link}/${props.id}/guest-count`)
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
                    background:`${pal.light}22`}}
            >
                <Typography variant="h6" sx={{ mt: 3, color: pal.dark, fontWeight: 'bold' }}>{`Қонақтар саны: ${guestCount}`}</Typography>

<Typography variant="h6" sx={{ mt: 3, color: pal.dark, fontWeight: 'bold' }}>{`Отбасылар мен қонақтар:`}</Typography>

{wedding.families.length === 0 ? (
    <Typography>Әлі ешкім жоқ</Typography>
) : (
    <List>
        {wedding.families.map((family, index) => (
            <Card elevation={4} sx={{ mt: 2, borderRadius: 3, bgcolor: `${pal.light}22` }} key={index}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: pal.main }}>{family.familyName}</Typography>
                    <List>
                        {family.guests.map((guest, i) => (
                            <ListItem key={i}>
                                <ListItemText primary={guest.name} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: pal.info || theme.palette.info.main}}>{family.wish}</Typography>
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