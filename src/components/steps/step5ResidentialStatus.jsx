import React from 'react';
import StepLayout from '../layout/StepLayout';
import OptionButton from '../ui/OptionButton';
import Button from '../ui/Button';

export default function ResidentialStatus({ data, updateData, nextStep, prevStep, currentStep, totalSteps }) {
  const options = [
    'Private Tenant',
    'Home Owner',
    'Council Tenant',
    'Living with Parents'
  ];

  const handleSelect = (option) => {
    updateData('residentialStatus', option);
    setTimeout(() => nextStep(), 300); // auto advance for consistency
  };

  return (
    <StepLayout
      title="What is your residential status?"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      {data.address && (
        <p className="step-address-subtitle">{data.address}</p>
      )}
      <div className="options-list-container">
        {options.map((opt) => (
          <OptionButton
            key={opt}
            label={opt}
            selected={data.residentialStatus === opt}
            onClick={() => handleSelect(opt)}
          />
        ))}
      </div>
    </StepLayout>
  );
}
