import React, { useState } from 'react';
import StepLayout from '../layout/StepLayout';
import OptionButton from '../ui/OptionButton';
import { Plus } from 'lucide-react';

export default function EmploymentStatus({ data, updateData, nextStep, prevStep, currentStep, totalSteps }) {
  const [showMore, setShowMore] = useState(false);

  const primaryOptions = [
    'Full-Time', 'Self-Employed', 'Part-Time', 'Disability', 'Retired'
  ];

  const remainingOptions = [
    'Student', 'Family Carer', 'Agency Worker', 'Sub-Contractor', 
    'Homemaker', 'Armed Forces', 'Not Employed'
  ];

  const handleSelect = (value) => {
    updateData('employmentStatus', value);
    setTimeout(() => nextStep(value), 300); // auto advance with immediate value
  };

  return (
    <StepLayout
      title="What is your employment status?"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      <div className="options-list-container">
        {primaryOptions.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={data.employmentStatus === option}
            onClick={() => handleSelect(option)}
          />
        ))}

        {!showMore && (
          <OptionButton
            label="Show more options"
            rightIcon={Plus}
            onClick={() => setShowMore(true)}
          />
        )}

        {showMore && remainingOptions.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={data.employmentStatus === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </StepLayout>
  );
}
