import React from 'react';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';

const CheckboxGroup = ({ status, thresholds, labels, onChange }) => (
    <div className="flex flex-col space-y-2">
        {Object.keys(status).map(param => (
            <div key={param} className="flex flex-col">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!!status[param]}
                            onChange={e =>
                                onChange(param, 'indicators_status', e.target.checked)
                            }
                            name={param}
                        />
                    }
                    label={labels[param] || param}
                />


                <TextField
                    variant="outlined"
                    size="small"
                    label="Пороговое значение"
                    name={param}
                    value={thresholds[param]}
                    onChange={e =>
                        onChange(param, 'indicators_threshold', e.target.value)
                    }
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    disabled={!status[param]}
                    sx={{ width: '180px' }}
                />
            </div>
        ))}
    </div>
);

export default CheckboxGroup;
