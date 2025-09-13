import React, { useState, useEffect } from 'react';
import HeaderHome from '../component/HeaderHome';
import BackToHomeButton from '../component/BackToHomeButton';
import CelebrationIcon from '@mui/icons-material/Celebration';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarIcon from '@mui/icons-material/Star';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import '../App.css';
import axios from 'axios';

const typeColors = {
    wedding: "#F472B6",
    betashar: "#FBBF24",
    merey: "#34D399",
    sundet: "#38BDF8",
    tkeser: "#A78BFA",
    uzatu: "#818CF8",
};

const typeIcons = {
    wedding: <CelebrationIcon sx={{ color: '#fff', fontSize: 28 }} />,
    betashar: <StarIcon sx={{ color: '#fff', fontSize: 28 }} />,
    merey: <StarIcon sx={{ color: '#fff', fontSize: 28 }} />,
    sundet: <StarIcon sx={{ color: '#fff', fontSize: 28 }} />,
    tkeser: <StarIcon sx={{ color: '#fff', fontSize: 28 }} />,
    uzatu: <StarIcon sx={{ color: '#fff', fontSize: 28 }} />,
};

const medalColors = [
    { bg: "#FFD700", text: "#B8860B" }, // Gold
    { bg: "#C0C0C0", text: "#555" },    // Silver
    { bg: "#CD7F32", text: "#fff" },    // Bronze
];

const TopEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTopEvents();
        // eslint-disable-next-line
    }, []);

    const fetchTopEvents = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || "https://weddingproduct22-1.onrender.com";
            const response = await axios.get(`${apiUrl}/api/top-events`);
            const data = response.data;

            if (data.success) {
                setEvents(data.data);
            } else {
                setError(data.message || 'Ошибка при загрузке данных');
            }
        } catch (err) {
            setError('Ошибка соединения с сервером');
            console.error('Error fetching top events:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('kk-KZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: `linear-gradient(135deg, #F5F7FA 0%, #EDE9FE 100%)`,
                pb: { xs: 6, md: 0 },
            }}
        >
            <Box
                maxWidth="md"
                sx={{
                    mx: "auto",
                    py: { xs: 3, md: 6 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <BackToHomeButton />
                <Paper
                    elevation={10}
                    sx={{
                        width: "100%",
                        borderRadius: 5,
                        background: `linear-gradient(135deg, #E0E7FF 0%, #FDF2F8 100%)`,
                        boxShadow: "0 8px 32px 0 rgba(79,70,229,0.12)",
                        color: "#222",
                        textAlign: "center",
                        p: { xs: 2, sm: 4, md: 5 },
                        mb: { xs: 3, md: 6 },
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <CelebrationIcon sx={{ fontSize: { xs: 40, md: 56 }, color: "#6366F1", mb: 1 }} />
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                            mb: 1,
                            color: "#7C3AED",
                            letterSpacing: 1,
                        }}
                    >
                        ТОП 50 ТОЙ
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 1,
                            color: "#4F46E5",
                            fontWeight: 500,
                            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                        }}
                    >
                        Ең көп қонақ жинаған заманауи қазақша тойлар
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#A21CAF",
                            fontWeight: 500,
                            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                        }}
                    >
                        Барлығы: <b>{events.length}</b> мереке
                    </Typography>
                </Paper>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
                        <Typography color="primary" fontWeight="bold">Жүктелуде...</Typography>
                    </Box>
                ) : error ? (
                    <Box sx={{ textAlign: "center", py: 6 }}>
                        <Paper sx={{ p: 2, mb: 2, background: "#FEE2E2", color: "#B91C1C" }}>
                            <Typography>{error}</Typography>
                        </Paper>
                        <button
                            onClick={fetchTopEvents}
                            style={{
                                background: "#6366F1",
                                color: "#fff",
                                fontWeight: "bold",
                                borderRadius: 8,
                                padding: "8px 24px",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            Қайта жүктеу
                        </button>
                    </Box>
                ) : events.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 6 }}>
                        <Paper sx={{ p: 2, background: "#FEF9C3", color: "#92400E" }}>
                            <Typography>Мерекелер табылмады</Typography>
                        </Paper>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                    >
                        {events.map((event, index) => {
                            // Медали для топ-3
                            const isMedal = index < 3;
                            const medal = medalColors[index];

                            return (
                                <Paper
                                    key={`${event.type}-${event._id}`}
                                    elevation={6}
                                    sx={{
                                        borderRadius: 4,
                                        background: alpha(typeColors[event.type] || "#F472B6", 0.07),
                                        boxShadow: "0 4px 24px 0 rgba(124,58,237,0.10)",
                                        border: `2px solid ${alpha(typeColors[event.type] || "#F472B6", 0.18)}`,
                                        mb: 2,
                                        p: { xs: 2, sm: 3 },
                                        display: "flex",
                                        flexDirection: { xs: "column", sm: "row" },
                                        alignItems: "center",
                                        gap: 3,
                                        position: "relative",
                                    }}
                                >
                                    {/* Медаль или номер */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 16,
                                            left: 16,
                                            zIndex: 2,
                                            width: 38,
                                            height: 38,
                                            borderRadius: "50%",
                                            background: isMedal ? medal.bg : "#F3F4F6",
                                            color: isMedal ? medal.text : "#7C3AED",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                            fontSize: "1.3rem",
                                            boxShadow: isMedal ? "0 2px 8px 0 rgba(0,0,0,0.10)" : "none",
                                            border: isMedal ? `2px solid ${medal.text}` : "1.5px solid #E0E7FF",
                                        }}
                                    >
                                        {index + 1}
                                    </Box>
                                    <Box
                                        sx={{
                                            minWidth: 80,
                                            minHeight: 80,
                                            borderRadius: "50%",
                                            background: `linear-gradient(135deg, ${typeColors[event.type] || "#F472B6"} 60%, #fff 100%)`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 2px 12px 0 rgba(124,58,237,0.10)",
                                            mr: { sm: 2 },
                                            ml: { xs: 0, sm: 6 },
                                        }}
                                    >
                                        {typeIcons[event.type] || <CelebrationIcon sx={{ color: '#fff', fontSize: 32 }} />}
                                    </Box>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography variant="h6" fontWeight="bold" sx={{ color: "#7C3AED", mb: 0.5, fontSize: { xs: "1.1rem", sm: "1.25rem" }, letterSpacing: 1 }}>
                                            {event.mainPerson}
                                        </Typography>
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 1 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                <CalendarMonthIcon sx={{ fontSize: 18, color: "#6366F1" }} />
                                                <Typography variant="body2">{formatDate(event.date)}</Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                <LocationOnIcon sx={{ fontSize: 18, color: "#D946EF" }} />
                                                <Typography variant="body2">{event.location}</Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                <GroupsIcon sx={{ fontSize: 18, color: "#22D3EE" }} />
                                                <Typography variant="body2">Қонақтар: <b>{event.totalGuests}</b></Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 1 }}>
                                            <Typography variant="body2" sx={{ color: "#A21CAF" }}>
                                                Семей: {event.families?.length || 0}
                                            </Typography>
                                            {event.representatives && event.representatives.length > 0 && (
                                                <Typography variant="body2" sx={{ color: "#A21CAF" }}>
                                                    Өкілдер: {event.representatives.join(', ')}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Typography variant="body2" sx={{ color: "#4F46E5", fontWeight: 500 }}>
                                            {event.typeName}
                                        </Typography>
                                    </Box>
                                    {event.image && (
                                        <Box
                                            sx={{
                                                minWidth: 90,
                                                maxWidth: 120,
                                                ml: { sm: 2 },
                                                borderRadius: 3,
                                                overflow: "hidden",
                                                boxShadow: "0 2px 12px 0 rgba(124,58,237,0.10)",
                                            }}
                                        >
                                            <img
                                                src={event.image}
                                                alt={event.mainPerson}
                                                style={{
                                                    width: "100%",
                                                    height: 80,
                                                    objectFit: "cover",
                                                    borderRadius: 12,
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Paper>
                            );
                        })}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default TopEventsPage;