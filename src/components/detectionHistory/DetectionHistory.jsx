import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Paper,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import MiddleTitle from "../titles/middleTitle/MiddleTitle.jsx";
import FlexSpacerContainer from "../containers/flexSpacerContainer/FlexSpacerContainer.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

export default function DetectionHistory({ selectedCamera, indicator, label }) {
    const [entries, setEntries]   = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading,  setLoading]  = useState(false);

    const fetchHistory = useCallback(async () => {
        if (!selectedCamera || !indicator) return;
        setLoading(true);
        try {
            const { data } = await axios.get(`${apiUrl}/records/history`, {
                params: { camera: selectedCamera, indicator },
            });
            const items = data.results ?? data;
            setEntries(
                [...items].sort(
                    (a, b) => new Date(b.record_time) - new Date(a.record_time)
                )
            );
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [selectedCamera, indicator]);

    useEffect(() => {
        fetchHistory();
        const id = setInterval(fetchHistory, 60_000);
        return () => clearInterval(id);
    }, [fetchHistory]);

    const hhmm = (iso) =>
        new Date(iso).toLocaleTimeString("ru-RU", {
            hourCycle: "h24",
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <>
            <FlexSpacerContainer>
                <MiddleTitle title="История за последний час" />
            </FlexSpacerContainer>

            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    mx: "auto",
                    mb: 2,
                    ml: 1,
                    minHeight: 0,
                }}
            >
                <Box sx={{ display: "flex", flexGrow: 1, minHeight: 0, height: "70vh",}}>
                    <List
                        dense
                        disablePadding
                        sx={{
                            width: 240,
                            pr: 1,
                            height: "100%",
                            overflowY: "auto",
                            border: "1px solid",
                            borderColor: "divider",
                            bgcolor: "grey.50",
                            minHeight: 0,
                        }}
                    >
                        {loading ? (
                            <Box textAlign="center" py={2}>
                                <CircularProgress size={24} />
                            </Box>
                        ) : (
                            entries.map((e) => (
                                <ListItemButton
                                    key={e.id}
                                    selected={e.id === selected?.id}
                                    onClick={() => setSelected(e)}
                                >
                                    <ListItemText
                                        primary={hhmm(e.record_time)}
                                        secondary={
                                            e.indicators_value?.[indicator] !== undefined
                                                ? `${label}: ${e.indicators_value[indicator]}`
                                                : null
                                        }
                                    />
                                </ListItemButton>
                            ))
                        )}
                    </List>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "auto",
                            ml: 2,
                            minHeight: 0,
                        }}
                    >
                        {!selected ? (
                            <Typography color="text.secondary">
                                Выберите время
                            </Typography>
                        ) : selected.frame ? (
                            <img
                                src={selected.frame}
                                alt={selected.record_time}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "70vh",
                                    objectFit: "contain",
                                    borderRadius: 4,
                                }}
                            />
                        ) : (
                            <Typography color="text.secondary">Кадр недоступен</Typography>
                        )}
                    </Box>
                </Box>
            </Paper>
        </>
    );
}
