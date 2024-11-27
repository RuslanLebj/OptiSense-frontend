import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "../../utils/dayjsSetup.js";

const adjustDateToGroupBy = (date, groupBy) => {
    switch (groupBy) {
        case "week":
            return dayjs(date).startOf("week");
        case "month":
            return dayjs(date).startOf("month");
        default:
            return dayjs(date);
    }
};

const DateRangeSelector = ({ dateRange, setDateRange, groupBy }) => {
    const handleStartDateChange = (newValue) => {
        setDateRange([adjustDateToGroupBy(newValue, groupBy), dateRange[1]]);
    };

    const handleEndDateChange = (newValue) => {
        setDateRange([dateRange[0], adjustDateToGroupBy(newValue, groupBy)]);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <div className="flex items-center gap-2 mb-2 mt-2">
                <DatePicker
                    label="Начальная дата"
                    value={dateRange[0]}
                    onChange={handleStartDateChange}
                    maxDate={dateRange[1]}
                    slotProps={{ textField: { helperText: "Выберите начальную дату" } }}
                />
                <DatePicker
                    label="Конечная дата"
                    value={dateRange[1]}
                    onChange={handleEndDateChange}
                    minDate={dateRange[0]}
                    maxDate={dayjs()}
                    slotProps={{ textField: { helperText: "Выберите конечную дату" } }}
                />
            </div>
        </LocalizationProvider>
    );
};

export default DateRangeSelector;
