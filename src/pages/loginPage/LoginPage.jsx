import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../../services/Auth";
import {TextField, Button} from "@mui/material";
import PageTitle from "../../components/titles/pageTitle/PageTitle.jsx";
import logo from '../../assets/logo.png';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы
        setLoading(true); // Устанавливаем состояние загрузки
        try {
            await login(username, password); // Выполняем авторизацию
            navigate("/cameras"); // Перенаправляем на защищённую страницу
        } catch (error) {
            setError("Login failed. Check your credentials."); // Устанавливаем ошибку
        } finally {
            setLoading(false); // Сбрасываем состояние загрузки
        }
    };

    return (
        <div className="bg-gray-300 flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white text-black rounded-lg shadow-md p-8 max-w-sm w-full">
                <div className="text-center mb-4">
                    <img
                        src={logo} // Укажите путь к вашему изображению
                        alt="Logo"
                        className="mx-auto w-20 h-20"
                    />
                    <PageTitle title={"OptiSense"}/>
                </div>
                <div>
                    <TextField
                        label="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="flex justify-between items-center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        className={loading ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        {loading ? "Загрузка..." : "Войти"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
