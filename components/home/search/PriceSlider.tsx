import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';


const MIN_PRICE = 1;
const MAX_PRICE = 200;
const MIN_DISTANCE = 5;

export default function MinimumDistanceSlider({min, max, onChange}:{min:number, max:number, onChange: (min: number, max: number) => void;}) {

  function valuetext(value: number) {
    return `${value}₪`;
  }
const handleChange = (_event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;

    let [newMin, newMax] = newValue;

    if (newMax - newMin < MIN_DISTANCE) {
      if (activeThumb === 0) {
        newMin = Math.min(newMin, MAX_PRICE - MIN_DISTANCE);
        newMax = newMin + MIN_DISTANCE;
      } else {
        newMax = Math.max(newMax, MIN_PRICE + MIN_DISTANCE);
        newMin = newMax - MIN_DISTANCE;
      }
    }

    onChange(newMin, newMax);
  };

  return (
    <div className='flex flex-col mt-5 gap-4 px-5'>

      <Box sx={{ width: 200 }}>
        <Slider
        style={{color:"#329CCB"}}
          getAriaLabel={() => 'Minimum distance shift'}
          value={[min, max]}
          min={MIN_PRICE}
          max={MAX_PRICE}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
      />
    </Box>
    </div>
  );
}
