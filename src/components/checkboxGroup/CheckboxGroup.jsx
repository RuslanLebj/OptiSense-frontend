import React from 'react';
import {FormControlLabel, Checkbox} from '@mui/material';

const CheckboxGroup = ({parameters, labels, onChange}) => {
    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        onChange(name, checked);
    };

    return (
        <div className="flex flex-col">
            {Object.entries(parameters).map(([param, value]) => (
                <FormControlLabel
                    key={param}
                    control={
                        <Checkbox
                            checked={value || false}  // Если значение undefined, ставим false
                            onChange={handleCheckboxChange}
                            name={param}
                            color="primary"
                        />
                    }
                    label={labels[param] || param} // Показываем расшифровку на русском или имя параметра, если нет перевода
                />
            ))}
        </div>
    );
};

export default CheckboxGroup;
