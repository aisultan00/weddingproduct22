import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Paper,
    TextField,
    Button,
    Box,
    Tabs,
    Tab,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    CircularProgress
} from "@mui/material";
import { motion } from "framer-motion";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { kk } from "date-fns/locale";
import axios from "axios";
import SEO from "../component/SEO";
import { useTheme } from '@mui/material/styles';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`admin-tabpanel-${index}`}
            aria-labelledby={`admin-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function AdminPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Проверяем аутентификацию при загрузке
    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        const authTime = localStorage.getItem('adminAuthTime');
        
        if (auth === 'true' && authTime) {
            const now = Date.now();
            const authDate = parseInt(authTime);
            // Сессия на 12 часов
            if (now - authDate < 12 * 60 * 60 * 1000) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('adminAuth');
                localStorage.removeItem('adminAuthTime');
            }
        }
    }, []);

    const handleLogin = async () => {
        setAuthLoading(true);
        setAuthError('');
        
        // Имитация проверки пароля
        setTimeout(() => {
            if (password === 'DTfsfeDEGLHNfsgghGqFAF27') { // Измените на нужный пароль
                setIsAuthenticated(true);
                localStorage.setItem('adminAuth', 'true');
                localStorage.setItem('adminAuthTime', Date.now().toString());
            } else {
                setAuthError('Қате пароль!');
            }
            setAuthLoading(false);
        }, 1000);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminAuthTime');
        navigate('/');
    };

    // Wedding form state
    const [weddingData, setWeddingData] = useState({
        groom: "",
        bride: "",
        desire: "",
        date: null,
        location: "",
        representatives: "",
        image: null
    });

    // Betashar form state
    const [betasharData, setBetasharData] = useState({
        kelin: "",
        desire: "",
        date: null,
        location: "",
        representatives: "",
        image: null
    });

    // Merey form state
    const [mereyData, setMereyData] = useState({
        person: "",
        age: "",
        desire: "",
        date: null,
        location: "",
        representatives: "",
        image: null
    });

    // Sundet form state
    const [sundetData, setSundetData] = useState({
        toddler: "",
        desire: "",
        date: null,
        location: "",
        representatives: "",
        image: null
    });

    // Tkeser form state
    const [tkeserData, setTkeserData] = useState({
        toddler: "",
        desire: "",
        date: null,
        location: "",
        representatives: "",
        image: null
    });

    // Uzatu form state
    const [uzatuData, setUzatuData] = useState({
        groom: "",
        desire: "",
        date: null,
        location: "",
        representatives: "",
        image: null
    });

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setSuccess("");
        setError("");
    };

    const handleImageUpload = (e, setData, data) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64Image = reader.result;
            setData({ ...data, image: base64Image });
        };
    };

    const createToy = async (toyType, data) => {
        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const endpoint = `https://weddingproduct22-1.onrender.com/api/${toyType}/create-checkout-session`;
            
            // Prepare data based on toy type
            let requestData = {
                desire: data.desire,
                date: data.date.toISOString(),
                location: data.location,
                representatives: data.representatives.split(",").map(r => r.trim()),
                image: data.image
            };

            // Add specific fields for each toy type
            switch (toyType) {
                case "wedding":
                    requestData.groom = data.groom;
                    requestData.bride = data.bride;
                    break;
                case "betashar":
                    requestData.kelin = data.kelin;
                    break;
                case "merey":
                    requestData.person = data.person;
                    requestData.age = parseInt(data.age);
                    break;
                case "sundet":
                case "tkesers":
                    requestData.toddler = data.toddler;
                    break;
                case "uzatus":
                    requestData.groom = data.groom;
                    break;
            }

            const response = await axios.post(endpoint, requestData);
            
            setSuccess(`Той сәтті жасалды! Сілтеме: ${response.data.url}`);
            window.open(response.data.url, '_blank');
            
            // Reset form
            setTimeout(() => {
                setSuccess("");
                // Reset the appropriate form based on active tab
                const resetData = {
                    desire: "",
                    date: null,
                    location: "",
                    representatives: "",
                    image: null
                };
                
                switch (activeTab) {
                    case 0: // Wedding
                        setWeddingData({ ...resetData, groom: "", bride: "" });
                        break;
                    case 1: // Betashar
                        setBetasharData({ ...resetData, kelin: "" });
                        break;
                    case 2: // Merey
                        setMereyData({ ...resetData, person: "", age: "" });
                        break;
                    case 3: // Sundet
                        setSundetData({ ...resetData, toddler: "" });
                        break;
                    case 4: // Tkeser
                        setTkeserData({ ...resetData, toddler: "" });
                        break;
                    case 5: // Uzatu
                        setUzatuData({ ...resetData, groom: "" });
                        break;
                }
            }, 3000);

        } catch (err) {
            setError(`Қате: ${err.response?.data?.error || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = (data, toyType) => {
        const errors = [];
        
        if (!data.desire) errors.push("Шақырту сөзі қажет");
        if (!data.date) errors.push("Той уақыты қажет");
        if (!data.location) errors.push("Той болатын жер қажет");
        if (!data.representatives) errors.push("Той иелері қажет");
        if (!data.image) errors.push("Сурет қажет");

        switch (toyType) {
            case "wedding":
                if (!data.groom) errors.push("Күйеу бала аты қажет");
                if (!data.bride) errors.push("Қыздың аты қажет");
                break;
            case "betashar":
                if (!data.kelin) errors.push("Қыздың аты қажет");
                break;
            case "merey":
                if (!data.person) errors.push("Мерей той иесі қажет");
                if (!data.age) errors.push("Жасы қажет");
                break;
            case "sundet":
            case "tkesers":
                if (!data.toddler) errors.push("Бала аты қажет");
                break;
            case "uzatus":
                if (!data.groom) errors.push("Қыздың аты қажет");
                break;
        }

        return errors;
    };

    const handleSubmit = (toyType, data) => {
        const errors = validateForm(data, toyType);
        if (errors.length > 0) {
            setError(errors.join(", "));
            return;
        }
        createToy(toyType, data);
    };

    // Если не аутентифицирован, показываем форму входа
    if (!isAuthenticated) {
        return (
            <>
                <SEO 
                    title="Кіру"
                    description="Кіру беті"
                    keywords="кіру"
                />
                <Container maxWidth="sm" sx={{ py: 8 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Paper elevation={6} sx={{ 
                            p: 4, 
                            textAlign: 'center',
                            background: `linear-gradient(135deg, ${theme.palette.primary.light}22 0%, ${theme.palette.secondary.light}22 100%)`,
                            borderRadius: 4
                        }}>
                            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.dark, fontWeight: "bold" }}>
                                🔐 Кіру
                            </Typography>
                            <TextField
                                type="password"
                                label="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                sx={{ mt: 2, mb: 2 }}
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                            />
                            {authError && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {authError}
                                </Alert>
                            )}
                            <Button 
                                variant="contained" 
                                onClick={handleLogin}
                                disabled={authLoading}
                                fullWidth
                                sx={{ 
                                    background: "linear-gradient(90deg, #6366F1 0%, #D946EF 100%)",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    borderRadius: 3,
                                    py: 1.5,
                                    '&:hover': {
                                        background: "linear-gradient(90deg, #4F46E5 0%, #C026D3 100%)",
                                    }
                                }}
                            >
                                {authLoading ? <CircularProgress size={24} color="inherit" /> : 'Кіру'}
                            </Button>
                        </Paper>
                    </motion.div>
                </Container>
            </>
        );
    }

    return (
        <>
            <SEO 
                title="Админ панель - Той жасау"
                description="Админ панель арқылы әртүрлі тойларды жасау"
                keywords="админ панель, той жасау, үйлену тойы, беташар, мерей"
            />
            
            {/* Кнопка выхода */}
            <Box sx={{ 
                position: 'fixed', 
                top: 16, 
                right: 16, 
                zIndex: 1300 
            }}>
                <Button 
                    onClick={handleLogout} 
                    variant="outlined" 
                    color="error"
                    sx={{ 
                        borderRadius: 3,
                        fontWeight: "bold"
                    }}
                >
                    Шығу
                </Button>
            </Box>

            <motion.div
                className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Paper elevation={6} sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.light}22 0%, ${theme.palette.secondary.light}22 100%)`,
                        color: theme.palette.text.primary,
                        borderRadius: 4,
                        boxShadow: "0 4px 24px 0 rgba(79,70,229,0.18)",
                        p: 4,
                        mb: 4
                    }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom color="primary" align="center" sx={{ mb: 3 }}>
                            🎉 Админ панель - Той жасау
                        </Typography>

                        {success && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {success}
                            </Alert>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                                <Tab label="💍 Үйлену тойы" />
                                <Tab label="👰 Беташар" />
                                <Tab label="🎂 Мерей тойы" />
                                <Tab label="👶 Сүндет тойы" />
                                <Tab label="🎈 Тұсаукесер" />
                                <Tab label="👋 Ұзату тойы" />
                            </Tabs>
                        </Box>

                        {/* Wedding Tab */}
                        <TabPanel value={activeTab} index={0}>
                            <Typography variant="h6" gutterBottom>Үйлену тойы жасау</Typography>
                            
                            <TextField
                                label="Күйеу бала"
                                fullWidth
                                margin="normal"
                                value={weddingData.groom}
                                onChange={e => setWeddingData({...weddingData, groom: e.target.value})}
                            />

                            <TextField
                                label="Қыздың аты"
                                fullWidth
                                margin="normal"
                                value={weddingData.bride}
                                onChange={e => setWeddingData({...weddingData, bride: e.target.value})}
                            />

                            <TextField
                                label="Шақырту сөзі"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                value={weddingData.desire}
                                onChange={e => setWeddingData({...weddingData, desire: e.target.value})}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={kk}>
                                <DateTimePicker
                                    sx={{ width: "100%", mt: 2 }}
                                    label="Тойдың уақыты"
                                    value={weddingData.date}
                                    onChange={(newValue) => setWeddingData({...weddingData, date: newValue})}
                                    ampm={false}
                                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                                />
                            </LocalizationProvider>

                            <TextField
                                label="Той болатын жер"
                                fullWidth
                                margin="normal"
                                value={weddingData.location}
                                onChange={e => setWeddingData({...weddingData, location: e.target.value})}
                            />

                            <TextField
                                label="Той иелері (үтір арқылы)"
                                fullWidth
                                margin="normal"
                                value={weddingData.representatives}
                                onChange={e => setWeddingData({...weddingData, representatives: e.target.value})}
                            />

                            <Box sx={{ mt: 2, textAlign: "center" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="wedding-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImageUpload(e, setWeddingData, weddingData)}
                                />
                                <label htmlFor="wedding-image">
                                    <Button variant="contained" component="span" sx={{ borderRadius: 3, background: "linear-gradient(90deg, #6366F1 0%, #D946EF 100%)", '&:hover': { background: "linear-gradient(90deg, #4F46E5 0%, #C026D3 100%)" } }}>
                                        📷 Жұптардың суреті
                                    </Button>
                                </label>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3, borderRadius: 3 }}
                                onClick={() => handleSubmit("wedding", weddingData)}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "💍 Үйлену тойы жасау"}
                            </Button>
                        </TabPanel>

                        {/* Betashar Tab */}
                        <TabPanel value={activeTab} index={1}>
                            <Typography variant="h6" gutterBottom>Беташар тойы жасау</Typography>
                            
                            <TextField
                                label="Қыздың аты"
                                fullWidth
                                margin="normal"
                                value={betasharData.kelin}
                                onChange={e => setBetasharData({...betasharData, kelin: e.target.value})}
                            />

                            <TextField
                                label="Шақырту сөзі"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                value={betasharData.desire}
                                onChange={e => setBetasharData({...betasharData, desire: e.target.value})}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={kk}>
                                <DateTimePicker
                                    sx={{ width: "100%", mt: 2 }}
                                    label="Тойдың уақыты"
                                    value={betasharData.date}
                                    onChange={(newValue) => setBetasharData({...betasharData, date: newValue})}
                                    ampm={false}
                                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                                />
                            </LocalizationProvider>

                            <TextField
                                label="Той болатын жер"
                                fullWidth
                                margin="normal"
                                value={betasharData.location}
                                onChange={e => setBetasharData({...betasharData, location: e.target.value})}
                            />

                            <TextField
                                label="Той иелері (үтір арқылы)"
                                fullWidth
                                margin="normal"
                                value={betasharData.representatives}
                                onChange={e => setBetasharData({...betasharData, representatives: e.target.value})}
                            />

                            <Box sx={{ mt: 2, textAlign: "center" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="betashar-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImageUpload(e, setBetasharData, betasharData)}
                                />
                                <label htmlFor="betashar-image">
                                    <Button variant="contained" component="span" sx={{ borderRadius: 3, background: "linear-gradient(90deg, #6366F1 0%, #D946EF 100%)", '&:hover': { background: "linear-gradient(90deg, #4F46E5 0%, #C026D3 100%)" } }}>
                                        📷 Қыздың суреті
                                    </Button>
                                </label>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3, borderRadius: 3 }}
                                onClick={() => handleSubmit("betashar", betasharData)}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "👰 Беташар тойы жасау"}
                            </Button>
                        </TabPanel>

                        {/* Merey Tab */}
                        <TabPanel value={activeTab} index={2}>
                            <Typography variant="h6" gutterBottom>Мерей тойы жасау</Typography>
                            
                            <TextField
                                label="Мерей той иесі"
                                fullWidth
                                margin="normal"
                                value={mereyData.person}
                                onChange={e => setMereyData({...mereyData, person: e.target.value})}
                            />

                            <TextField
                                label="Жасы"
                                fullWidth
                                margin="normal"
                                type="number"
                                value={mereyData.age}
                                onChange={e => setMereyData({...mereyData, age: e.target.value})}
                            />

                            <TextField
                                label="Шақырту сөзі"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                value={mereyData.desire}
                                onChange={e => setMereyData({...mereyData, desire: e.target.value})}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={kk}>
                                <DateTimePicker
                                    sx={{ width: "100%", mt: 2 }}
                                    label="Тойдың уақыты"
                                    value={mereyData.date}
                                    onChange={(newValue) => setMereyData({...mereyData, date: newValue})}
                                    ampm={false}
                                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                                />
                            </LocalizationProvider>

                            <TextField
                                label="Той болатын жер"
                                fullWidth
                                margin="normal"
                                value={mereyData.location}
                                onChange={e => setMereyData({...mereyData, location: e.target.value})}
                            />

                            <TextField
                                label="Той иелері (үтір арқылы)"
                                fullWidth
                                margin="normal"
                                value={mereyData.representatives}
                                onChange={e => setMereyData({...mereyData, representatives: e.target.value})}
                            />

                            <Box sx={{ mt: 2, textAlign: "center" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="merey-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImageUpload(e, setMereyData, mereyData)}
                                />
                                <label htmlFor="merey-image">
                                    <Button variant="contained" component="span" sx={{ borderRadius: 3, background: "linear-gradient(90deg, #6366F1 0%, #D946EF 100%)", '&:hover': { background: "linear-gradient(90deg, #4F46E5 0%, #C026D3 100%)" } }}>
                                        📷 Суреті
                                    </Button>
                                </label>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3, borderRadius: 3 }}
                                onClick={() => handleSubmit("merey", mereyData)}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "🎂 Мерей тойы жасау"}
                            </Button>
                        </TabPanel>

                        {/* Sundet Tab */}
                        <TabPanel value={activeTab} index={3}>
                            <Typography variant="h6" gutterBottom>Сүндет тойы жасау</Typography>
                            
                            <TextField
                                label="Бала аты"
                                fullWidth
                                margin="normal"
                                value={sundetData.toddler}
                                onChange={e => setSundetData({...sundetData, toddler: e.target.value})}
                            />

                            <TextField
                                label="Шақырту сөзі"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                value={sundetData.desire}
                                onChange={e => setSundetData({...sundetData, desire: e.target.value})}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={kk}>
                                <DateTimePicker
                                    sx={{ width: "100%", mt: 2 }}
                                    label="Тойдың уақыты"
                                    value={sundetData.date}
                                    onChange={(newValue) => setSundetData({...sundetData, date: newValue})}
                                    ampm={false}
                                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                                />
                            </LocalizationProvider>

                            <TextField
                                label="Той болатын жер"
                                fullWidth
                                margin="normal"
                                value={sundetData.location}
                                onChange={e => setSundetData({...sundetData, location: e.target.value})}
                            />

                            <TextField
                                label="Той иелері (үтір арқылы)"
                                fullWidth
                                margin="normal"
                                value={sundetData.representatives}
                                onChange={e => setSundetData({...sundetData, representatives: e.target.value})}
                            />

                            <Box sx={{ mt: 2, textAlign: "center" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="sundet-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImageUpload(e, setSundetData, sundetData)}
                                />
                                <label htmlFor="sundet-image">
                                    <Button variant="contained" component="span" sx={{ borderRadius: 3, background: "linear-gradient(90deg, #6366F1 0%, #D946EF 100%)", '&:hover': { background: "linear-gradient(90deg, #4F46E5 0%, #C026D3 100%)" } }}>
                                        📷 Баланың суреті
                                    </Button>
                                </label>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3, borderRadius: 3 }}
                                onClick={() => handleSubmit("sundet", sundetData)}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "👶 Сүндет тойы жасау"}
                            </Button>
                        </TabPanel>

                        {/* Tkeser Tab */}
                        <TabPanel value={activeTab} index={4}>
                            <Typography variant="h6" gutterBottom>Тұсаукесер тойы жасау</Typography>
                            
                            <TextField
                                label="Бала аты"
                                fullWidth
                                margin="normal"
                                value={tkeserData.toddler}
                                onChange={e => setTkeserData({...tkeserData, toddler: e.target.value})}
                            />

                            <TextField
                                label="Шақырту сөзі"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                value={tkeserData.desire}
                                onChange={e => setTkeserData({...tkeserData, desire: e.target.value})}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={kk}>
                                <DateTimePicker
                                    sx={{ width: "100%", mt: 2 }}
                                    label="Тойдың уақыты"
                                    value={tkeserData.date}
                                    onChange={(newValue) => setTkeserData({...tkeserData, date: newValue})}
                                    ampm={false}
                                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                                />
                            </LocalizationProvider>

                            <TextField
                                label="Той болатын жер"
                                fullWidth
                                margin="normal"
                                value={tkeserData.location}
                                onChange={e => setTkeserData({...tkeserData, location: e.target.value})}
                            />

                            <TextField
                                label="Той иелері (үтір арқылы)"
                                fullWidth
                                margin="normal"
                                value={tkeserData.representatives}
                                onChange={e => setTkeserData({...tkeserData, representatives: e.target.value})}
                            />

                            <Box sx={{ mt: 2, textAlign: "center" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="tkeser-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImageUpload(e, setTkeserData, tkeserData)}
                                />
                                <label htmlFor="tkeser-image">
                                    <Button variant="contained" component="span" sx={{ borderRadius: 3, background: "linear-gradient(90deg, #6366F1 0%, #D946EF 100%)", '&:hover': { background: "linear-gradient(90deg, #4F46E5 0%, #C026D3 100%)" } }}>
                                        📷 Баланың суреті
                                    </Button>
                                </label>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3, borderRadius: 3 }}
                                onClick={() => handleSubmit("tkesers", tkeserData)}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "🎈 Тұсаукесер тойы жасау"}
                            </Button>
                        </TabPanel>

                        {/* Uzatu Tab */}
                        <TabPanel value={activeTab} index={5}>
                            <Typography variant="h6" gutterBottom>Ұзату тойы жасау</Typography>
                            
                            <TextField
                                label="Қыздың аты"
                                fullWidth
                                margin="normal"
                                value={uzatuData.groom}
                                onChange={e => setUzatuData({...uzatuData, groom: e.target.value})}
                            />

                            <TextField
                                label="Шақырту сөзі"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                value={uzatuData.desire}
                                onChange={e => setUzatuData({...uzatuData, desire: e.target.value})}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={kk}>
                                <DateTimePicker
                                    sx={{ width: "100%", mt: 2 }}
                                    label="Тойдың уақыты"
                                    value={uzatuData.date}
                                    onChange={(newValue) => setUzatuData({...uzatuData, date: newValue})}
                                    ampm={false}
                                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                                />
                            </LocalizationProvider>

                            <TextField
                                label="Той болатын жер"
                                fullWidth
                                margin="normal"
                                value={uzatuData.location}
                                onChange={e => setUzatuData({...uzatuData, location: e.target.value})}
                            />

                            <TextField
                                label="Той иелері (үтір арқылы)"
                                fullWidth
                                margin="normal"
                                value={uzatuData.representatives}
                                onChange={e => setUzatuData({...uzatuData, representatives: e.target.value})}
                            />

                            <Box sx={{ mt: 2, textAlign: "center" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="uzatu-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImageUpload(e, setUzatuData, uzatuData)}
                                />
                                <label htmlFor="uzatu-image">
                                    <Button variant="contained" component="span" sx={{ borderRadius: 3, background: "linear-gradient(90deg, #6366F1 0%, #D946EF 100%)", '&:hover': { background: "linear-gradient(90deg, #4F46E5 0%, #C026D3 100%)" } }}>
                                        📷 Жұптардың суреті
                                    </Button>
                                </label>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3, borderRadius: 3 }}
                                onClick={() => handleSubmit("uzatus", uzatuData)}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "👋 Ұзату тойы жасау"}
                            </Button>
                        </TabPanel>
                    </Paper>
                </Container>
            </motion.div>
        </>
    );
}

export default AdminPage; 