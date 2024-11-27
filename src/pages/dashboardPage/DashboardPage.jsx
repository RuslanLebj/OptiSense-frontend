import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../../components/titles/pageTitle/PageTitle';
import FlexSpacerContainer from '../../components/containers/flexSpacerContainer/FlexSpacerContainer';
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import dayjs from "../../utils/dayjsSetup.js"
import ChartData from "../../components/chartData/ChartData.jsx";

const baseUrl = import.meta.env.VITE_BASE_URL;

const groupByOptions = [
  { value: "day", label: "День" },
  { value: "week", label: "Неделя" },
  { value: "month", label: "Месяц" },
];

const parameterOptions = [
  { value: "queue_length", label: "Средняя длина очереди" },
  { value: "service_duration", label: "Средняя скорость обслуживания" },
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
  const [selectedParameter, setSelectedParameter] = useState(parameterOptions[0].value);
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(7, "day"),
    dayjs(),
  ]);

  // Загружаем список outlets
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const outletResponse = await axios.get(`${baseUrl}/outlets/`);
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
        const cameraResponse = await axios.get(`${baseUrl}/cameras/`, {
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

        const response = await axios.get(`${baseUrl}/records/averages/`, {
          params: {
            outlet: selectedOutlet.id,
            camera: selectedCamera.id,
            group_by: selectedGroupBy,
            parameter: selectedParameter,
          },
        });
        setRecords(response.data);
        setLoading(false);
      } catch (err) {
        setError("Не удалось загрузить записи");
        setLoading(false);
      }
    };

    fetchRecords();
  }, [selectedOutlet, selectedCamera, selectedGroupBy, selectedParameter]);

  const chartData = Array.isArray(records?.values)
      ? records.values.map((record) => ({
        x: record.period, // Группированная дата
        y: record.value,  // Среднее значение параметра
      }))
      : [];

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
            options={parameterOptions}
            getOptionLabel={(option) => option.label}
            value={parameterOptions.find((option) => option.value === selectedParameter)}
            onChange={(event, newValue) => setSelectedParameter(newValue.value)}
            renderInput={(params) => <TextField {...params} label="Параметр" />}
            className={"w-72"}
        />
      </FlexSpacerContainer>
      {(!selectedOutlet || !selectedCamera || !selectedGroupBy || !selectedParameter) ? (
          <p>Пожалуйста, выберите все параметры для отображения данных.</p>
      ) : chartData.length > 0 ? (
          <ChartData
              data={chartData}
              dateRange={dateRange}
              setDateRange={setDateRange}
              groupBy={selectedGroupBy}
              parameterLabel={parameterOptions.find((opt) => opt.value === selectedParameter)?.label}
          />
      ) : (
          <p>Нет данных для отображения. Проверьте параметры фильтрации.</p>
      )}
    </>
  );
};

export default DashboardPage;