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

    const [orderBy, setBy] = useState("interval");
    const [order, setOrd] = useState("asc");
    const handleSort = (col) => {
        const isAsc = orderBy === col && order === "asc";
        setBy(col);
        setOrd(isAsc ? "desc" : "asc");
    };
    const sorted = [...rows].sort((a, b) => {
        const x = a[orderBy], y = b[orderBy];
        return order === "asc" ? (x > y ? 1 : -1) : (x < y ? 1 : -1);
    });

    return (
        <Paper sx={{p: 2, maxWidth: 650, mx: "auto", mt: 4, mb: 4, boxShadow: 3,}}>
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
                                    {["interval", "avg", "max"].map((col) => (
                                        <TableCell
                                            key={col}
                                            align={col === "interval" ? "left" : "right"}
                                        >
                                            <TableSortLabel
                                                active={orderBy === col}
                                                direction={orderBy === col ? order : "asc"}
                                                onClick={() => handleSort(col)}
                                            >
                                                {col === "interval" ? "Интервал" :
                                                    col === "avg" ? "Среднее" : "Максимум"}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sorted.map((r) => (
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
