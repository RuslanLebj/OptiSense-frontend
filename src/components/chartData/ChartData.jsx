import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import DateRangeSelector from "../dateRangeSelector/DateRangeSelector";
import dayjs from "../../utils/dayjsSetup.js"
import MiddleTitle from "../titles/middleTitle/MiddleTitle.jsx";
import FlexSpacerContainer from "../containers/flexSpacerContainer/FlexSpacerContainer.jsx";

const ChartData = ({ data, dateRange, setDateRange, groupBy, indicatorLabel }) => {
    const formatDateLabel = (date) => {
        switch (groupBy) {
            case "week":
                return dayjs(date).format("W неделя YYYY");
            case "month":
                return dayjs(date).format("MMMM YYYY");
            default:
                return dayjs(date).format("DD MMMM YYYY");
        }
    };

    const filteredData = data
        .filter((item) => {
            const itemDate = dayjs(item.x);
            return itemDate.isAfter(dateRange[0]) && itemDate.isBefore(dateRange[1]);
        })
        .sort((a, b) => new Date(a.x) - new Date(b.x))
        .map((item) => ({
            time: formatDateLabel(item.x),
            value: item.y,
        }));

    return (
        <>
            <FlexSpacerContainer>
                <MiddleTitle title={`Диаграмма: ${indicatorLabel}`}/>
            </FlexSpacerContainer>
        <div className="flex flex-col items-center">
            <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} groupBy={groupBy} />
            {filteredData.length > 0 ? (
                <BarChart
                    xAxis={[{ dataKey: "time", scaleType: "band" }]}
                    series={[{ dataKey: "value", label: indicatorLabel }]}
                    dataset={filteredData}
                    width={1000}
                    height={400}
                />) : (
                <div className="text-center mt-8">
                    <p className="text-center font-bold mt-8">
                        Нет данных для выбранного диапазона дат.
                    </p>
                    <p className="text-center font-bold mt-8">
                        Попробуйте изменить параметры фильтрации или выбрать другой период.
                    </p>
                </div>
            )}
        </div>
        </>
    );
};

export default ChartData;
