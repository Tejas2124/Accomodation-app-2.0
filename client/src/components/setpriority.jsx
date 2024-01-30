import React from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const values = [];
let i = parseFloat(0);
while (i < 1) {
    values.push(i.toFixed(1));
    i += parseFloat(0.1);
}

export const degree_packet = {
    "1": 0,
    "2": 0,
    "3": 0
};

function PrioritySetter({ label, id }) {
    const handleSliderChange = (value) => {
        value=value/10
        degree_packet[id] = parseFloat(value.toFixed(2));
        console.log(value);
        console.log(degree_packet);
    };

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center', // Horizontal center
            alignItems: 'center', // Vertical center
            // height: '100vh', // Full viewport height
            fontFamily: 'Arial, sans-serif'
        }}
        >
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f0f0',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '500px',
            height:'120px'
        }}>
            <label htmlFor="" style={{
                fontWeight: 'bold',
                color: '#555',
                marginBottom: '8px',
                display: 'block'
            }}>{label}</label>

            <Slider
                min={0}
                max={10}
                step={0.1}
                marks={{ 0: '0', 1: '0.1', 2: '0.2', 3: '0.3', 4: '0.4', 5: '0.5', 6: '0.6', 7: '0.7', 8: '0.8', 9: '0.9', 10: '1.0' }}
                defaultValue={0}
                onChange={handleSliderChange}
                style={{
                    width: '100%', // Adjust width of the slider
                    marginTop: '10px' // Adjust margin top for spacing
                    // Add more custom styles as needed
                }}
                railStyle={{ backgroundColor: '#ddd' }} // Customize rail color
                trackStyle={{ backgroundColor: '#00bcd4' }} // Customize track color
                handleStyle={{
                    borderColor: '#3A0CA3', // Customize handle border color
                    backgroundColor: '#fff', // Customize handle background color
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' // Customize handle shadow
                }}
            />
        </div>
        </div>
    );
}

export default PrioritySetter;
