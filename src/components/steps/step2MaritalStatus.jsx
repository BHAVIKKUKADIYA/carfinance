import React from 'react';
import StepLayout from '../layout/StepLayout';
import OptionButton from '../ui/OptionButton';

export default function MaritalStatus({ data, updateData, nextStep, prevStep, currentStep, totalSteps }) {
  const options = ['Married', 'Single', 'Cohabiting', 'Divorced', 'Separated', 'Widowed', 'Civil Partnership'];

  const handleSelect = (value) => {
    updateData('maritalStatus', value);
    setTimeout(() => nextStep(), 300); // auto advance
  };

  return (
    <StepLayout
      title="What is your marital status?"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      <div className="options-list-container">
        {options.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={data.maritalStatus === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </StepLayout>
  );
}
