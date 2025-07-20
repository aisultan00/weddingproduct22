
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import kk from 'date-fns/locale/kk';
import ToyPage from "../component/ToyPage";
import SEO from "../component/SEO";
function Betasharspage() {
    const [groom, setGroom] = useState("");
    const [date, setDate] = useState("");
    const [desire, setDesire] = useState("");
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState("");
    const [representatives, setRepresentatives] = useState("");
    const [errors, setErrors] = useState({});
    const [imageerror, setimageErrors] = useState(null);
    const [wasSubmitted, setWasSubmitted] = useState(false);

    // Stripe demo/payment
    const [showDemo, setShowDemo] = useState(false);
    const [demoBetashar, setDemoBetashar] = useState(null);


    const navigate = useNavigate();


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const base64Image = reader.result;
            setImage({ file, preview: base64Image });
        };
        setimageErrors(null)
    };

    const addWedding = () => {
        setWasSubmitted(true);

        const newErrors = {};
        if (!groom) newErrors.groom = "Қыздың аты қажет";
        if (!date) newErrors.date = "Той уақыты қажет";
        if (!location) newErrors.location = "Той болатын жер қажет";
        if (!representatives) newErrors.representatives = "Той иелерін көрсетіңіз";
        if (!image) setimageErrors(true)
        if (!image) newErrors.image = "Сурет жоқ"
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setDemoBetashar({
            kelin: groom,
            desire,
            date,
            location,
            representatives,
            image: image ? image.preview : ""
        });
        setShowDemo(true);
    };




    const handleWhatsApp = () => {
        const message = `Сәлем! Мен беташар тойы жасағымы келеді:

👰 Қыздың аты: ${demoBetashar.kelin}
💬 Шақырту сөзі: ${demoBetashar.desire}
📅 Той уақыты: ${new Date(demoBetashar.date).toLocaleDateString('kk-KZ')} ${new Date(demoBetashar.date).toLocaleTimeString('kk-KZ', {hour: '2-digit', minute:'2-digit'})}
📍 Той жері: ${demoBetashar.location}
👥 Той иелері: ${demoBetashar.representatives}

Тойды жариялау үшін қанша төлеу керек?`;
        
        const whatsappUrl = `https://wa.me/77001234567?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Демо страница с оплатой Stripe
   if (showDemo && demoBetashar) {
    return (
        <ToyPage
            {...demoBetashar}
            demo={true}
            onWhatsApp={handleWhatsApp}
            toytype="betashar"
        />
    );
}

    return (
        <>
            <SEO 
                title="Беташар тойы жасау"
                description="Беташар тойының онлайн шақыруын жасаңыз. Қыздың атын енгізіп, той уақытын белгілеңіз."
                keywords="беташар тойы, онлайн шақыру, қыз аты, той уақыты, той жері"
            />
            <motion.div
                className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper elevation={6} sx={{
                    background: "linear-gradient(135deg, #e3f2fd 0%, #b3e5fc 100%)",
                    color: "#1565c0",
                    borderRadius: 4,
                    boxShadow: "0 4px 24px 0 rgba(33,150,243,0.10)",
                    p: 4,
                    mb: 4
                }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom color="primary" align="center">
                        Той жасау
                    </Typography>

                    <TextField
                        label="Қыздың аты"
                        fullWidth
                        margin="normal"
                        value={groom}
                        onChange={e => setGroom(e.target.value)}
                        error={!!errors.groom}
                        helperText={errors.groom}
                    />

                    <TextField
                        label="Шақырту сөзі"
                        fullWidth
                        margin="normal"
                        value={desire}
                        onChange={e => setDesire(e.target.value)}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={kk}>
                        <DateTimePicker
                            sx={{ width: "100%" }}
                            label="Тойдың уақыты"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            ampm={false}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.date}
                                    helperText={errors.date}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Той болатын жер"
                        fullWidth
                        margin="normal"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        error={!!errors.location}
                        helperText={errors.location}
                    />

                    <TextField
                        label="Той иелері"
                        fullWidth
                        margin="normal"
                        value={representatives}
                        onChange={e => setRepresentatives(e.target.value)}
                        error={!!errors.representatives}
                        helperText={errors.representatives}
                    />

                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <input
                            type="file"
                            accept="image/*"
                            id="file-upload"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="file-upload">
                            <Button
                                variant="contained"
                                component="span"
                                sx={{
                                    borderRadius: 3,
                                    backgroundColor: "#ff4081",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#e91e63" }
                                }}
                            >
                                📷 Қыздың суреті
                            </Button>
                            {imageerror && (
                                <Typography variant="body2" sx={{ mt: 1, color: "error.main" }}>
                                    Суретті салуынызды сұраймыз
                                </Typography>
                            )}
                        </label>
                        {image && (
                            <Typography variant="body2" sx={{ mt: 1, color: "#e91e63" }}>
                                Выбранный файл: {image.file?.name}
                            </Typography>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2, borderRadius: 3, boxShadow: 3 }}
                        onClick={addWedding}
                    >
                        ➕ Той жасау
                    </Button>
                </Paper>
            </Container>
        </motion.div>
        </>
    );
}

export default Betasharspage;