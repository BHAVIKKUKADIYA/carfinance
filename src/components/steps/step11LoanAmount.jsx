import React, { useState } from 'react';
import StepLayout from '../layout/StepLayout';
import Button from '../ui/Button';

export default function LoanAmount({ data, updateData, nextStep, prevStep, currentStep, totalSteps }) {
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleSliderChange = (e) => {
    updateData('loanAmount', parseInt(e.target.value, 10));
    if (data.loanAmountNotSure) {
      updateData('loanAmountNotSure', false);
    }
  };

  const handleCheckboxChange = (e) => {
    updateData('loanAmountNotSure', e.target.checked);
  };

  const isAmountZero = (data.loanAmount === 0 || data.loanAmount === null) && !data.loanAmountNotSure;
  const isValid = (data.loanAmount > 0 && data.loanAmount !== null) || data.loanAmountNotSure;

  const showAmountError = (showErrors && isAmountZero) || (touched && isAmountZero);

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
      title="How much would you like to borrow?"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      <div className="loan-slider-section">
        <p className="loan-subtitle">
          Don't worry, you can change this later and it won't impact whether you're approved
        </p>

        <div className="form-fields-container">
          <label className="loan-amount-label">Amount</label>
          <div className="relative">
            <span className="input-prefix">₹</span>
            <input
              type="text"
              className={`form-input-premium input-with-prefix amount-input-premium ${showAmountError ? 'form-input-error' : ''}`}
              placeholder="e.g. 10,000"
              value={data.loanAmount > 0 ? Number(data.loanAmount).toLocaleString() : ''}
              onChange={(e) => {
                const numericValue = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;
                updateData('loanAmount', numericValue);
              }}
              onBlur={() => setTouched(true)}
              disabled={data.loanAmountNotSure}
            />
            {showAmountError ? (
              <div className="error-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#dc2626" />
                  <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : !data.loanAmountNotSure && data.loanAmount >= 1000 && (
              <div className="checkmark-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#00cba0" />
                  <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
          {showAmountError && (
            <span className="form-error-text">Please enter a valid amount</span>
          )}
        </div>

        <div className="checkbox-container" onClick={() => updateData('loanAmountNotSure', !data.loanAmountNotSure)}>
          <input
            type="checkbox"
            className="premium-checkbox"
            checked={data.loanAmountNotSure}
            onChange={handleCheckboxChange}
          />
          <span className="text-sm font-bold">I'm not sure</span>
        </div>
      </div>

      <Button onClick={handleContinue}>
        Continue
      </Button>
    </StepLayout>
  );
}
