import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Paper, List, ListItem, ListItemText, Button, TextField, Box } from '@mui/material';
import { motion } from "framer-motion";
import { QRCodeSVG } from 'qrcode.react';
import CopyLinkButton from "./CopyLinkButton";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
const kazakhPattern = "url('https://svgshare.com/i/14uG.svg')";

function ToyPage(props) {
    // Если демо-режим, wedding берём из props, иначе с сервера
    const [wedding, setWedding] = useState(props.demo ? props : null);
    const [familyName, setFamilyName] = useState('');
    const [guestName, setGuestName] = useState('');
    const [guests, setGuests] = useState([]);
    const [guestCount, setGuestCount] = useState(0);
    const [wish, setWish] = useState('');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const location = useLocation();
    const Navigate = useNavigate();

    useEffect(() => {
        if (props.demo) return;
        axios.get(`http://localhost:5000/api/${props.toytype}/${props.id}`)
            .then(res => setWedding(res.data))
            .catch(err => console.error(err));

        axios.get(`http://localhost:5000/api/${props.toytype}/${props.id}/guest-count`)
            .then(res => setGuestCount(res.data.guestCount))
            .catch(err => console.error(err));
    }, [props.id, props.toytype, props.demo]);

    // Countdown logic
    useEffect(() => {
        if (!wedding?.date) return;
        const updateCountdown = () => {
            const eventDate = new Date(wedding.date);
            const now = new Date();
            const diff = eventDate - now;
            let days = 0, hours = 0, minutes = 0, seconds = 0;
            if (diff > 0) {
                days = Math.floor(diff / (1000 * 60 * 60 * 24));
                hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                minutes = Math.floor((diff / (1000 * 60)) % 60);
                seconds = Math.floor((diff / 1000) % 60);
            }
            setTimeLeft({ days, hours, minutes, seconds });
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [wedding]);

    const addGuest = () => {
        if (guestName) {
            setGuests([...guests, { name: guestName }]);
            setGuestName('');
        }
    };

    const addFamily = () => {
        if (!familyName || guests.length === 0) {
            alert("Введите фамилию семьи и хотя бы одного гостя!");
            return;
        }
        if (props.demo) {
            setFamilyName('');
            setGuests([]);
            setWish('');
            return;
        }
        axios.post(`http://localhost:5000/api/${props.toytype}/${props.id}/add-family`, { familyName, guests, wish })
            .then(res => {
                setWedding(res.data);
                setFamilyName('');
                setGuests([]);
                setGuestCount(prevCount => prevCount + guests.length);
                setWish('');
            })
            .catch(err => console.error(err));
    };

    const navtoowner = () => {
        Navigate(`/${props.toytype}/${props.id}/Ownerpage`);
    };

    if (!wedding) {
        return <Typography align="center">Загрузка...</Typography>;
    }

    const removeGuest = (indexToRemove) => {
    setGuests(prevGuests => prevGuests.filter((_, i) => i !== indexToRemove));
    }

    // Формат даты и времени
    const dateObj = new Date(wedding.date);
    const dateStr = dateObj.toLocaleDateString('kk-KZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' });

    return (
        <motion.div
            className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <Container maxWidth="md" sx={{ p: { xs: 1, sm: 3 }, position: "relative" }}>
                <Paper
                    elevation={8}
                    sx={{
                        p: { xs: 2, sm: 4 },
                        borderRadius: 5,
                        background: "linear-gradient(135deg, #fff8e1 0%, #b388ff 100%)",
                        boxShadow: "0 8px 32px 0 rgba(124,77,255,0.15)",
                        color: "#5e35b1",
                        position: "relative",
                        overflow: "hidden",
                        border: "6px solid #7C4DFF",
                        backgroundImage: `${kazakhPattern}, linear-gradient(135deg, #fff8e1 0%, #b388ff 100%)`,
                        backgroundRepeat: "repeat, no-repeat",
                        backgroundSize: "120px, cover",
                    }}
                >
                    {/* Верхний национальный орнамент */}
                    <Box sx={{
                        width: "100%",
                        height: 32,
                        background: "#7C4DFF",
                        backgroundImage: kazakhPattern,
                        backgroundRepeat: "repeat-x",
                        backgroundSize: "120px",
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        mb: 2
                    }} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            align="center"
                            sx={{
                                fontFamily: "Edu QLD Hand, cursive",
                                color: "#7C4DFF",
                                mb: 2,
                                letterSpacing: 2,
                                textShadow: "0 2px 8px #fff8",
                            }}
                        >
                            {props.toytype === "wedding" && `💍 ${wedding.groom?.toUpperCase()} & ${wedding.bride?.toUpperCase()}`}
                            {props.toytype === "merey" && `${wedding.person} ${wedding.age} жасқа толу тойы`}
                            {props.toytype === "betashar" && wedding.kelin}
                            {props.toytype === "sundet" && wedding.toddler}
                            {props.toytype === "tkesers" && wedding.toddler}
                            {props.toytype === "uzatus" && wedding.groom}
                        </Typography>
                        {wedding.image && (
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 2,
                            }}>
                                <img
                                    src={wedding.image}
                                    alt="Той суреті"
                                    style={{
                                        border: "5px solid #7C4DFF",
                                        boxShadow: "0 4px 24px #b388ff55"
                                    }}
                                    className='image'
                                />
                            </Box>
                        )}
                        <Typography variant="h6" fontWeight="bold" mt={2} sx={{ color: "#8e24aa" }}>
                            Шақырту сөзі: <br />{wedding.desire}
                        </Typography>
                        {/* Countdown */}
                        <Box sx={{ mb: 3, textAlign: "center" }}>
                            <Typography
                                sx={{
                                    fontFamily: "Georgia, serif",
                                    fontWeight: 500,
                                    fontSize: { xs: "1.1rem", sm: "1.3rem" },
                                    color: "#3f51b5"
                                }}
                            >
                                Тойдың басталу уақыты:
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Georgia, serif",
                                    fontWeight: 500,
                                    fontSize: { xs: "1.1rem", sm: "1.3rem" },
                                    color: "#222",
                                    mb: 1
                                }}
                            >
                                {dateStr} / сағат {timeStr}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Georgia, serif",
                                    fontWeight: 500,
                                    fontSize: { xs: "1.05rem", sm: "1.15rem" },
                                    color: "#3f51b5",
                                    mb: 1
                                }}
                            >
                                Тойдың басталуына қалды:
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 1,
                                flexWrap: "wrap"
                            }}>
                                {[
                                    { value: timeLeft.days, label: "күн" },
                                    { value: timeLeft.hours, label: "сағат" },
                                    { value: timeLeft.minutes, label: "минут" },
                                    { value: timeLeft.seconds, label: "секунд" }
                                ].map((item, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: "50%",
                                            border: "2px solid #00bcd4",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "#fff",
                                            mx: 0.5,
                                            mb: { xs: 1, sm: 0 }
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: "bold", color: "#00bcd4", fontSize: "1.1rem" }}>
                                            {String(item.value).padStart(2, "0")}
                                        </Typography>
                                        <Typography sx={{ fontSize: "0.85rem", color: "#222" }}>
                                            {item.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        <Typography variant="h6" sx={{ color: "#d84315", fontWeight: "bold", mt: 1 }}>
                            📍 Орны: <span style={{ color: "#7C4DFF" }}>{wedding.location}</span>
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <Typography variant="h6" fontWeight="bold" mt={3} sx={{ color: "#5e35b1" }}>
                            🤵‍♂️ Той иелері
                        </Typography>
                        <List>
                                <ListItem>
                                    <ListItemText primary={wedding.representatives} />
                                </ListItem>
                        </List>
                        <Typography variant="h6" sx={{ mt: 3, color: "#d84315", fontWeight: 'bold' }}>Отбасыны қосу</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                            <TextField label="Отбасы аты" fullWidth InputProps={{
                                style: { color: "#7C4DFF" },
                            }}
                                InputLabelProps={{
                                    style: { color: "#8e24aa" },
                                }} value={familyName} onChange={e => setFamilyName(e.target.value)} />
                            <TextField label="Қонақтың аты" fullWidth InputProps={{
                                style: { color: "#7C4DFF" },
                            }}
                                InputLabelProps={{
                                    style: { color: "#8e24aa" },
                                }} value={guestName} onChange={e => setGuestName(e.target.value)} />
                            <Button variant="contained" color="primary" onClick={addGuest} sx={{
                                borderRadius: 3,
                                background: "linear-gradient(90deg, #7C4DFF 0%, #B388FF 100%)",
                                color: "#fff",
                                fontWeight: "bold",
                                "&:hover": {
                                    background: "linear-gradient(90deg, #B388FF 0%, #7C4DFF 100%)",
                                },
                            }}>
                                Қонақты қосу
                            </Button>
                        </Box>
                        <List>
                            <List>
                        {guests.map((guest, index) => (
                            <ListItem 
                                key={index} 
                                sx={{ bgcolor: '#f3e5f5', borderRadius: 2, mb: 1 }}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => removeGuest(index)}>
                                        <DeleteIcon sx={{ color: 'linear-gradient(90deg, #7C4DFF 0%, #B388FF 100%)' }} />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={guest.name} />
                            </ListItem>
                        ))}
                    </List>
                        </List>
                        <TextField label="Тілек" fullWidth InputProps={{
                            style: { color: "#7C4DFF" },
                        }}
                            InputLabelProps={{
                                style: { color: "#8e24aa" },
                            }} value={wish} onChange={e => setWish(e.target.value)} />
                        <Button variant="contained" color="secondary" fullWidth onClick={addFamily} sx={{
                            mt: 2, borderRadius: 3,
                            background: "linear-gradient(90deg, #B388FF 0%, #7C4DFF 100%)",
                            color: "#fff",
                            fontWeight: "bold",
                            "&:hover": {
                                background: "linear-gradient(90deg, #7C4DFF 0%, #B388FF 100%)",
                            },
                        }}>
                            Отбасыны қосу
                        </Button>
                    </motion.div>
                    <Button variant="contained" color="secondary" fullWidth onClick={navtoowner} sx={{
                        mt: 2, borderRadius: 3,
                        background: "linear-gradient(90deg, #B388FF 0%, #7C4DFF 100%)",
                        color: "#fff",
                        fontWeight: "bold",
                        "&:hover": {
                            background: "linear-gradient(90deg, #7C4DFF 0%, #B388FF 100%)",
                        },
                    }}>
                        Той қонақтары мен тілектерін көру {props.demo ? " (Демо режимде жасамайды)" : ""}
                    </Button>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                    >
                        <Typography fontWeight="bold" mt={5} fontSize={20} sx={{ color: "#7C4DFF" }}>
                            Cілтеме жіберу үшін ➡
                        </Typography>
                        <CopyLinkButton />
                        <Box sx={{ display: 'flex', mt: 2, flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <Typography fontWeight="bold" mt={5} fontSize={20} sx={{ color: "#7C4DFF" }}>
                                Немесе
                            </Typography>
                            <QRCodeSVG value={window.location.href} size={128} />
                        </Box>
                        {props.demo && (
                            <Box sx={{ mt: 3, textAlign: "center" }}>
                                <Typography color="warning.main" sx={{ mb: 2 }}>
                                    Бұл демо-нұсқа. Тойды жариялау үшін төлем жасаңыз.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={props.onPay}
                                    disabled={props.isPaying}
                                    sx={{ fontWeight: "bold", fontSize: "1.1rem", px: 4, py: 1.5 }}
                                >
                                    {props.isPaying ? "Төлем өңделуде..." : "Тойды төлеу және жариялау"}
                                </Button>
                            </Box>
                        )}
                    </motion.div>
                    {/* Нижний национальный орнамент */}
                    <Box sx={{
                        width: "100%",
                        height: 32,
                        background: "#7C4DFF",
                        backgroundImage: kazakhPattern,
                        backgroundRepeat: "repeat-x",
                        backgroundSize: "120px",
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 18,
                        mt: 4
                    }} />
                </Paper>
            </Container>
        </motion.div>
    );
}

export default ToyPage;