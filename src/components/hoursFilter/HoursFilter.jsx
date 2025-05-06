import React, { useState } from "react";
import {
    Box,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
} from "@mui/material";

const HoursFilter = ({ onChange }) => {
    const [enabled, setEnabled] = useState(false);
    const [fromHour, setFromHour] = useState("");
    const [toHour, setToHour] = useState("");
    const [error, setError] = useState("");

    const handleApply = () => {
        const from = Number(fromHour);
        const to = Number(toHour);

        if (!enabled) return;

        if (
            fromHour === "" ||
            toHour === "" ||
            isNaN(from) ||
            isNaN(to) ||
            from < 0 ||
            to > 23 ||
            from >= to
        ) {
            setError("Введите корректный диапазон от 0 до 23 (от < до)");
            return;
        }

        setError("");
        onChange({
            exclude: true,
            from,
            to,
        });
    };

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setEnabled(checked);
        if (!checked) {
            setFromHour("");
            setToHour("");
            setError("");
            onChange({ exclude: false });
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <FormControlLabel
                control={<Checkbox checked={enabled} onChange={handleCheckboxChange} />}
                label="Исключить часы"
            />

            {enabled && (
                <Box display="flex" gap={2}>
                    <TextField
                        required
                        label="От (часы)"
                        type="number"
                        value={fromHour}
                        onChange={(e) => setFromHour(e.target.value)}
                        inputProps={{ min: 0, max: 23 }}
                    />
                    <TextField
                        required
                        label="До (часы)"
                        type="number"
                        value={toHour}
                        onChange={(e) => setToHour(e.target.value)}
                        inputProps={{ min: 0, max: 23 }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleApply}
                        sx={{ whiteSpace: "nowrap", height: "fit-content", alignSelf: "center" }}
                    >
                        OK
                    </Button>
                </Box>
            )}

            {error && <Typography color="error">{error}</Typography>}
        </Box>
    );
};

export default HoursFilter;
