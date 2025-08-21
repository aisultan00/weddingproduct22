
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import kk from 'date-fns/locale/kk'; // или 'ru' для русского
import ToyPage from "../component/ToyPage";
import SEO from "../component/SEO";
import { useTheme } from '@mui/material/styles';
function Mereyspage() {
    const theme = useTheme();
    const pal = theme.palette.toy?.merey || theme.palette.warning;
    const [person, setPerson] = useState("");
    const [age , setAge] = useState("");
    const [date, setDate] = useState("");
    const [desire, setDesire] = useState("");
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState("");
    const [representatives, setRepresentatives] = useState("");
    const [errors, setErrors] = useState({});
    const [imageerror, setimageErrors] = useState(null);
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const navigate = useNavigate();

     const [showDemo, setShowDemo] = useState(false);
     const [demoMerey, setDemoMerey] = useState(null);
 

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
        if (!person) newErrors.person = "Қыздың аты қажет";
        if (!age) newErrors.age = "Жасы қажет";
        if (!date) newErrors.date = "Той уақыты қажет";
        if (!location) newErrors.location = "Той болатын жер қажет";
        if (!representatives) newErrors.representatives = "Той иелерін көрсетіңіз";
        if (!image) setimageErrors(true)
        if (!image) newErrors.image = "Сурет жоқ"
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setDemoMerey({
            person,
            age,
            desire,
            date,
            location,
            representatives,
            image: image ? image.preview : ""
        });
        setShowDemo(true);
    };
    const handleWhatsApp = () => {
        const message = `Сәлем! Мен мерей тойы жасағымы келеді:

🎂 Мерей той иесі: ${demoMerey.person}
🎈 Жасы: ${demoMerey.age} жас
💬 Шақырту сөзі: ${demoMerey.desire}
📅 Той уақыты: ${new Date(demoMerey.date).toLocaleDateString('kk-KZ')} ${new Date(demoMerey.date).toLocaleTimeString('kk-KZ', {hour: '2-digit', minute:'2-digit'})}
📍 Той жері: ${demoMerey.location}
👥 Той иелері: ${demoMerey.representatives}

Тойды жариялау үшін қанша төлеу керек?`;
        
        const whatsappUrl = `https://wa.me/77001234567?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Демо страница с оплатой Stripe
   if (showDemo && demoMerey) {
    return (
        <ToyPage
            {...demoMerey}
            demo={true}
            onWhatsApp={handleWhatsApp}
            toytype="merey"
        />
    );
}

 

    return (
        <>
            <SEO 
                title="Мерей тойы жасау"
                description="Мерей тойының онлайн шақыруын жасаңыз. Мерей той иесінің атын енгізіп, той уақытын белгілеңіз."
                keywords="мерей тойы, онлайн шақыру, мерей той иесі, той уақыты, той жері"
            />
            <motion.div
                className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper elevation={6} sx={{
                    background: `linear-gradient(135deg, ${pal.start || pal.light}55 0%, ${pal.end || pal.main}55 100%)`,
                    color: theme.palette.text.primary,
                    borderRadius: 4,
                    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.12)",
                    p: 4,
                    mb: 4
                }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom color="primary" align="center">
                        Той жасау
                    </Typography>

                    <TextField
                        label="Мерей той иесі"
                        fullWidth
                        margin="normal"
                        value={person}
                        onChange={e => setPerson(e.target.value)}
                        error={!!errors.person}
                        helperText={errors.person}
                    />

                    <TextField
                        label="Жасы"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        error={!!errors.age}
                        helperText={errors.age}
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
                       ampm={false} // ❌ отключает AM/PM (использует 24ч формат)
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
                                    background: `linear-gradient(90deg, ${pal.main} 0%, ${pal.dark} 100%)`,
                                    color: "white",
                                    "&:hover": { background: `linear-gradient(90deg, ${pal.dark} 0%, ${pal.main} 100%)` }
                                }}
                            >
                                📷 Суреті
                            </Button>
                            {imageerror && (
                     <Typography variant="body2" sx={{ mt: 1, color: "error.main" }}>
                        Суретті салуынызды сұраймыз
                 </Typography>
                    )}
                        </label>
                        {image && (
                            <Typography variant="body2" sx={{ mt: 1, color: theme.palette.secondary.dark }}>
                                Выбранный файл: {image.file?.name}
                            </Typography>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2, borderRadius: 3, boxShadow: 3, background: `linear-gradient(90deg, ${pal.light} 0%, ${pal.main} 100%)`, '&:hover': { background: `linear-gradient(90deg, ${pal.main} 0%, ${pal.dark} 100%)` } }}
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

export default Mereyspage