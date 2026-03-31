import React, { useState } from 'react';
import StepLayout from '../layout/StepLayout';
import Button from '../ui/Button';

export default function MonthlyIncome({ data, updateData, nextStep, prevStep, currentStep, totalSteps }) {
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    updateData('monthlyIncome', e.target.value.replace(/\D/g, ''));
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const incomeVal = parseInt(data.monthlyIncome || '0', 10);
  const isInvalid = incomeVal === 0;
  const isValid = incomeVal > 0;

  const showsError = (showErrors && isInvalid) || (touched && isInvalid);

  const handleContinue = () => {
    if (isValid) {
      nextStep();
    } else {
      setShowErrors(true);
      setTouched(true);
    }
  };

  return (
    <StepLayout
      title="What is your monthly income (after tax)?"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      <div className="form-fields-container">
        <label className="form-label-premium">Monthly Income</label>
        <div className="relative">
          <span className="input-prefix">₹</span>
          <input
            type="text"
            className={`form-input-premium input-with-prefix ${showsError ? 'form-input-error' : ''}`}
            placeholder="e.g. 2000"
            value={data.monthlyIncome}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {showsError ? (
            <div className="error-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#dc2626" />
                <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ) : data.monthlyIncome.length > 0 && !isInvalid && (
            <div className="checkmark-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#00cba0" />
                <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
        {showsError && (
          <span className="form-error-text">Please enter a valid amount</span>
        )}
      </div>

      <Button onClick={handleContinue}>
        Continue
      </Button>
    </StepLayout>
  );
}
