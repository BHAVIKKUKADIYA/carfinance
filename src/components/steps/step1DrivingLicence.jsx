import React from 'react';
import StepLayout from '../layout/StepLayout';
import OptionButton from '../ui/OptionButton';

export default function DrivingLicence({ data, updateData, nextStep, prevStep, currentStep, totalSteps }) {
  const options = ['Full UK', 'Provisional UK', 'EU Licence', 'International', 'I don\'t have a licence'];

  const handleSelect = (value) => {
    updateData('drivingLicence', value);
    setTimeout(() => nextStep(), 300); // auto advance
  };

  return (
    <StepLayout
      title="What type of driving licence do you have?"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      <div className="options-list-container">
        {options.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={data.drivingLicence === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </StepLayout>
  );
}
