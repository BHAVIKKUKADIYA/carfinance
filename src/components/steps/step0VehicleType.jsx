import React from 'react';
import StepLayout from '../layout/StepLayout';
import OptionButton from '../ui/OptionButton';

export default function VehicleType({ data, updateData, nextStep }) {
  const options = ['Car', 'Van', 'Bike'];

  const handleSelect = (value) => {
    updateData('vehicleType', value);
    // Directly go to next step for Step 0 as requested
    nextStep();
  };

  const footer = (
    <div className="footer-text-landing">
      <p style={{ marginBottom: '1rem' }}>
        By providing your information, you agree to our <button className="text-link">Privacy Policy</button>.
      </p>
      <p>
        Representative 19.8% APR. Car Finance 247 Limited is a credit broker, not a lender.
      </p>
    </div>
  );

  return (
    <StepLayout
      title="What would you like a finance quote for?"
      isLanding={true}
      footer={footer}
    >
      <div className="options-list-container">
        {options.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={data.vehicleType === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </StepLayout>
  );
}
