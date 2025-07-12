import axios from "axios";
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
function Sundetspage() {
    const [weddings, setWeddings] = useState([]);
    const [toddler, setToddler] = useState("");
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
     const [demoSundet, setDemoSundet] = useState(null);
     const [isPaying, setIsPaying] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/api/sundet")
            .then(res => setWeddings(res.data))
            .catch(err => console.error(err));
    }, []);

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
        if (!toddler) newErrors.toddler = "Бала аты қажет";
        if (!date) newErrors.date = "Той уақыты қажет";
        if (!location) newErrors.location = "Той болатын жер қажет";
        if (!representatives) newErrors.representatives = "Той иелерін көрсетіңіз";
        if (!image) setimageErrors(true)
        if (!image) newErrors.image = "Сурет жоқ"
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setDemoSundet({
            toddler,
            desire,
            date,
            location,
            representatives,
            image: image ? image.preview : ""
        });
        setShowDemo(true);
    };
    const handleStripePay = async () => {
        setIsPaying(true);
        try {
            const res = await axios.post("http://localhost:5000/api/sundet/create-checkout-session", {
                toddler: demoSundet.toddler,
                desire: demoSundet.desire,
                date: demoSundet.date,
                location: demoSundet.location,
                representatives: demoSundet.representatives,
                image: demoSundet.image
            });
            window.location.href = res.data.url;
        } catch (err) {
            setIsPaying(false);
            alert("Қате! Төлем сессиясын бастау мүмкін болмады.");
        }
    };

    // Демо страница с оплатой Stripe
   if (showDemo && demoSundet) {
    return (
        <ToyPage
            {...demoSundet}
            demo={true}
            onPay={handleStripePay}
            isPaying={isPaying}
            toytype="sundet"
        />
    );
}

    

    return (
        <>
            <SEO 
                title="Сүндет тойы жасау"
                description="Сүндет тойының онлайн шақыруын жасаңыз. Баланың атын енгізіп, той уақытын белгілеңіз."
                keywords="сүндет тойы, онлайн шақыру, бала аты, той уақыты, той жері"
            />
            <motion.div
                className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
            <Container maxWidth="md" sx={{
                mt: 4, display: "flex", flexDirection: "column", alignItems: "center",
                background: "linear-gradient(135deg, #FFDEE9 0%,#B5FFFC 100%)", borderRadius: 3, p: 4
            }}>
                <motion.div
                    className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Paper elevation={6} sx={{ p: 3, textAlign: "center", borderRadius: 6, background: "linear-gradient(135deg, #FFDEE9 0%,#B5FFFC 100%)" }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">Той жасау</Typography>

                        <TextField
                            label="Бала аты"
                            fullWidth
                            margin="normal"
                            value={toddler}
                            onChange={e => setToddler(e.target.value)}
                            error={!!errors.toddler}
                            helperText={errors.toddler}
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
                                        backgroundColor: "#ff4081",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#e91e63" }
                                    }}
                                >
                                    📷 Баланың суреті
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
                </motion.div>


            </Container>
        </motion.div>
        </>
    );
}

export default Sundetspage