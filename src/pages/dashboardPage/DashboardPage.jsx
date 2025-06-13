import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../../components/titles/pageTitle/PageTitle';
import FlexSpacerContainer from '../../components/containers/flexSpacerContainer/FlexSpacerContainer';
import Autocomplete from "@mui/material/Autocomplete";
import {Button, TextField} from "@mui/material";
import dayjs from "../../utils/dayjsSetup.js"
import ChartData from "../../components/chartData/ChartData.jsx";
import HoursFilter from "../../components/hoursFilter/HoursFilter.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const groupByOptions = [
  { value: "day", label: "День" },
  { value: "week", label: "Неделя" },
  { value: "month", label: "Месяц" },
];

const indicatorOptions = [
  { value: "queue_length", label: "Длина очереди" },
  { value: "service_duration", label: "Скорость обслуживания" },
];

const aggregateOptions = [
  { value: "avg", label: "Среднее" },
  { value: "min", label: "Минимальное" },
  { value: "max", label: "Максимальное" },
];

const DashboardPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [outletOptions, setOutletOptions] = useState([]);
  const [cameraOptions, setCameraOptions] = useState([]);

  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedGroupBy, setSelectedGroupBy] = useState(groupByOptions[0].value);
  const [selectedIndicator, setSelectedIndicator] = useState(indicatorOptions[0].value);
  const [selectedAggregate, setSelectedAggregate] = useState(aggregateOptions[0].value);
  const [selectedHoursFilter, setSelectedHoursFilter] = useState({
    exclude: false,
    from: null,
    to: null,
  });
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(7, "day"),
    dayjs(),
  ]);

  // Загружаем список outlets
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const outletResponse = await axios.get(`${apiUrl}/outlets/`);
        setOutletOptions(outletResponse.data);
      } catch (err) {
        setError("Не удалось загрузить список магазинов");
      }
    };

    fetchOptions();
  }, []);

  //Загружаем список cameras в зависимости от быбранного outlet
  useEffect(() => {
    const fetchCameras = async () => {
      if (!selectedOutlet) {
        setCameraOptions([]); // Очищаем камеры, если магазин не выбран
        return;
      }

      try {
        const cameraResponse = await axios.get(`${apiUrl}/cameras/`, {
          params: { outlet: selectedOutlet.id },
        });
        setCameraOptions(cameraResponse.data);
      } catch (err) {
        setError("Не удалось загрузить список камер");
      }
    };

    fetchCameras();
  }, [selectedOutlet]);

  // Загружаем данные records с учётом фильтров
  useEffect(() => {
    const fetchRecords = async () => {
      if (!selectedOutlet || !selectedCamera) return;

      try {
        setLoading(true);

        const params = {
          outlet: selectedOutlet.id,
          camera: selectedCamera.id,
          group_by: selectedGroupBy,
          indicator: selectedIndicator,
          aggregate_type: selectedAggregate,
        };

        if (selectedHoursFilter.exclude) {
          params.exclude_hour_start = selectedHoursFilter.from;
          params.exclude_hour_end = selectedHoursFilter.to;
        }

        const response = await axios.get(`${apiUrl}/records/aggregates/`, { params });
        setRecords(response.data);
        setLoading(false);
      } catch (err) {
        setError("Не удалось загрузить записи");
        setLoading(false);
      }
    };

    fetchRecords();
  }, [selectedOutlet, selectedCamera, selectedGroupBy, selectedIndicator, selectedAggregate, selectedHoursFilter]);

  const chartData = Array.isArray(records?.values)
      ? records.values.map((record) => ({
        x: record.period, // Группированная дата
        y: record.value,  // Среднее значение параметра
      }))
      : [];

const handleCsvExport = async () => {
  if (!selectedOutlet || !selectedCamera) return;

  const params = {
    outlet: selectedOutlet.id,
    camera: selectedCamera.id,
    group_by: selectedGroupBy,
    indicator: selectedIndicator,
    aggregate_type: selectedAggregate,
  };
  if (selectedHoursFilter.exclude) {
    params.exclude_hour_start = selectedHoursFilter.from;
    params.exclude_hour_end   = selectedHoursFilter.to;
  }

  try {
    // корректный вызов GET с params и blob
    const response = await axios.get(
      `${apiUrl}/records/hours/aggregates/csv`,
      { params, responseType: 'blob' }
    );

    // извлекаем имя файла из заголовка Content-Disposition
    const cd = response.headers['content-disposition'];
    let filename = 'aggregates.csv';
    if (cd) {
      const match = cd.match(/filename\*?=(?:UTF-8''?)?\"?([^\";]+)\"?/);
      if (match && match[1]) {
        filename = decodeURIComponent(match[1]);
      }
    }

    // создаём blob и инициируем скачивание
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    const url  = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error('CSV export error', err);
    alert('Не удалось скачать CSV');
  }
};

  return (
    <>
      <FlexSpacerContainer>
        <PageTitle title="Показатели" />
      </FlexSpacerContainer>
      <FlexSpacerContainer>
        <Autocomplete
            options={outletOptions}
            getOptionLabel={(option) => option.address}
            value={selectedOutlet}
            onChange={(event, newValue) => {setSelectedOutlet(newValue); setSelectedCamera(null);}}
            renderInput={(params) => <TextField {...params} label="Адрес" />}
            className={"w-72"}
        />
        <Autocomplete
            options={cameraOptions}
            getOptionLabel={(option) => option.name}
            value={selectedCamera}
            onChange={(event, newValue) => setSelectedCamera(newValue)}
            renderInput={(params) => <TextField {...params} label="Камера" />}
            className={"w-72"}
            disabled={!selectedOutlet}
        />
        <Autocomplete
            options={groupByOptions}
            getOptionLabel={(option) => option.label}
            value={groupByOptions.find((option) => option.value === selectedGroupBy)}
            onChange={(event, newValue) => setSelectedGroupBy(newValue.value)}
            renderInput={(params) => <TextField {...params} label="Группировать по" />}
            className={"w-72"}
        />
        <Autocomplete
            options={indicatorOptions}
            getOptionLabel={(option) => option.label}
            value={indicatorOptions.find((option) => option.value === selectedIndicator)}
            onChange={(event, newValue) => setSelectedIndicator(newValue.value)}
            renderInput={(params) => <TextField {...params} label="Показатели" />}
            className={"w-72"}
        />
        <Autocomplete
            options={aggregateOptions}
            getOptionLabel={(option) => option.label}
            value={aggregateOptions.find((option) => option.value === selectedAggregate)}
            onChange={(event, newValue) => setSelectedAggregate(newValue.value)}
            renderInput={(params) => <TextField {...params} label="Тип агрегации" />}
            className={"w-72"}
        />
      </FlexSpacerContainer>
      <FlexSpacerContainer>
        <HoursFilter onChange={setSelectedHoursFilter}/>
        <Button
            onClick={handleCsvExport}
            disabled={!selectedOutlet || !selectedCamera}
            variant="contained"
            sx={{ whiteSpace: "nowrap", height: "fit-content", alignSelf: "center" }}
        >
          Выгрузить в .csv
        </Button>
      </FlexSpacerContainer>
      {(!selectedOutlet || !selectedCamera || !selectedGroupBy || !selectedIndicator) ? (
          <p>Пожалуйста, выберите все параметры для отображения данных.</p>
      ) : chartData.length > 0 ? (
          <ChartData
              data={chartData}
              dateRange={dateRange}
              setDateRange={setDateRange}
              groupBy={selectedGroupBy}
              indicatorLabel={indicatorOptions.find((opt) => opt.value === selectedIndicator)?.label}
          />
      ) : (
          <p>Нет данных для отображения. Проверьте параметры фильтрации.</p>
      )}
    </>
  );
};

export default DashboardPage;