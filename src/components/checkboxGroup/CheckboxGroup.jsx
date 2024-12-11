import React from 'react';
import {FormControlLabel, Checkbox, TextField} from '@mui/material';

const CheckboxGroup = ({parameters, labels, onChange}) => {
    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        onChange(name, checked);
    };

    return (
        <div className="flex flex-col">
            {Object.entries(parameters).map(([param, value], index) => (
                <div key={param} className="flex flex-col space-y-1">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={typeof value === 'boolean' ? value : false} // Если значение undefined, ставим false
                                onChange={handleCheckboxChange}
                                name={param}
                                color="primary"
                            />
                        }
                        label={labels[param] || param} // Показываем расшифровку на русском или имя параметра, если нет перевода
                    />
                    {index > 0 && (
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Ограничение"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default CheckboxGroup;
