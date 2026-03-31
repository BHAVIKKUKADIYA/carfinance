import React, { useState } from 'react';
import StepLayout from '../layout/StepLayout';
import Button from '../ui/Button';

const ErrorIcon = () => (
  <div className="error-icon-wrapper">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#dc2626"/>
      <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const CheckmarkIcon = () => (
  <div className="checkmark-wrapper">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#00cba0" />
      <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function AddressDuration({ data, updateData, nextStep, prevStep, currentStep, totalSteps, totalMonths }) {
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (field, event) => {
    updateData('duration', {
      ...(data.duration || { years: '', months: '' }),
      [field]: event.target.value.replace(/\D/g, '')
    });
  };

  const years = data.duration?.years || '';
  const months = data.duration?.months || '';
  
  const yearsVal = parseInt(years || '0', 10);
  const monthsVal = parseInt(months || '0', 10);
  
  const isMonthsInvalid = monthsVal > 11;
  const isDurationZero = yearsVal === 0 && monthsVal === 0 && (years !== '' || months !== '');

  const handleContinue = () => {
    if (isValid) {
      nextStep();
    } else {
      setShowErrors(true);
    }
  };

  const isValid = !isMonthsInvalid && (yearsVal > 0 || monthsVal > 0) && (years !== '' || months !== '');

  return (
    <StepLayout
      title="How long have you lived at this address?"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      {data.address && (
        <p className="step-address-subtitle">{data.address}</p>
      )}

      <div className="input-grid-2-col">
        {/* Years input */}
        <div className="flex-1">
          <label className="form-label-premium">Years</label>
          <div className="relative">
            <input
              type="text"
              className={`form-input-premium ${(showErrors && isDurationZero) ? 'form-input-error' : ''}`}
              placeholder="0"
              value={years}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleChange('years', e)}
            />
            {years.length > 0 && !isDurationZero && !isMonthsInvalid && <CheckmarkIcon />}
            {showErrors && isDurationZero && <ErrorIcon />}
          </div>
        </div>

        {/* Months input */}
        <div className="flex-1">
          <label className="form-label-premium">Months</label>
          <div className="relative">
            <input
              type="text"
              className={`form-input-premium ${(showErrors && (isMonthsInvalid || isDurationZero)) ? 'form-input-error' : ''}`}
              placeholder="0"
              value={months}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleChange('months', e)}
            />
            {months.length > 0 && !isMonthsInvalid && !isDurationZero && <CheckmarkIcon />}
            {(isMonthsInvalid || (showErrors && isDurationZero)) && <ErrorIcon />}
          </div>
          {isMonthsInvalid && (
            <span className="form-error-text">Please enter a number between 0 and 11 months.</span>
          )}
          {showErrors && !isMonthsInvalid && isDurationZero && (
            <span className="form-error-text">Please tell us how long you've been here.</span>
          )}
        </div>
      </div>

      {totalMonths > 0 && totalMonths < 36 && (
        <div className="history-progress-premium">
          <div className="history-info">
            <span className="history-icon">ℹ</span>
            <span>You have provided <strong>{totalMonths} months</strong> of address history. We need at least <strong>36 months (3 years)</strong>.</span>
          </div>
        </div>
      )}

      {totalMonths === 0 && (
        <div className="history-requirement-alert mt-8 mb-6">
          <div className="flex items-start gap-3">
            <div className="alert-icon">!</div>
            <p className="text-sm font-medium" style={{ lineHeight: '1.4' }}>
              Lenders ask for 3 years' address history. We will keep asking for previous addresses until we reach a total of 3 years.
            </p>
          </div>
        </div>
      )}

      <Button
        onClick={handleContinue}
        disabled={!isValid}
      >
        Continue
      </Button>
    </StepLayout>
  );
}
