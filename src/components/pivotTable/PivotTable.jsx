import {useState, useEffect, useCallback} from "react";
import {
    Paper, TableContainer, Table, TableHead, TableRow,
    TableCell, TableBody, TableSortLabel, CircularProgress,
    Box
} from "@mui/material";
import axios from "axios";
import dayjs from "../../utils/dayjsSetup.js";
import DateRangeSelector from "../dateRangeSelector/DateRangeSelector.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

export default function PivotTable({cameraId, indicator}) {
    const [dateRange, setDateRange] = useState([
        dayjs().subtract(7, "day"),
        dayjs()
    ]);

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!cameraId || !indicator) return;
        setLoading(true);
        try {
            const {data} = await axios.get(`${apiUrl}/records/hours/aggregates`, {
                params: {
                    camera: cameraId,
                    indicator,
                    start_date: dateRange[0].format("YYYY-MM-DD"),
                    end_date: dateRange[1].format("YYYY-MM-DD")
                }
            });
            setRows(data.values ?? []);
        } finally {
            setLoading(false);
        }
    }, [cameraId, indicator, dateRange]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Paper sx={{p: 2, maxWidth: 650, mx: "auto", mt: 4, mb: 4, boxShadow: 3}}>
            <div className="flex flex-col items-center">
                <DateRangeSelector
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    groupBy="day"
                />

                {loading ? (
                    <Box textAlign="center" py={3}><CircularProgress/></Box>
                ) : (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Интервал</TableCell>
                                    <TableCell align="right">Среднее</TableCell>
                                    <TableCell align="right">Максимум</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((r) => (
                                    <TableRow key={r.interval}>
                                        <TableCell>{r.interval}</TableCell>
                                        <TableCell align="right">
                                            {r.avg != null ? Number(r.avg).toFixed(2) : "—"}
                                        </TableCell>
                                        <TableCell align="right">
                                            {r.max != null ? Number(r.max).toFixed(1) : "—"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </Paper>
    );
}
