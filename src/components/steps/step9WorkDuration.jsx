import React, { useState } from 'react';
import StepLayout from '../layout/StepLayout';
import Button from '../ui/Button';

export default function WorkDuration({ data, updateData, nextStep, prevStep, currentStep, totalSteps, totalEmploymentMonths }) {
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (field, value) => {
    updateData('workDuration', {
      ...data.workDuration,
      [field]: value.replace(/\D/g, '')
    });
  };

  const { years, months } = data.workDuration;

  // Validation logic
  const yearsVal = parseInt(years || '0', 10);
  const monthsVal = parseInt(months || '0', 10);

  const isMonthsInvalid = monthsVal > 11;
  const isDurationZero = yearsVal === 0 && monthsVal === 0 && (years !== '' || months !== '');

  const isValid = !isMonthsInvalid && (yearsVal > 0 || monthsVal > 0) && (years !== '' || months !== '');

  const handleContinue = () => {
    if (isValid) {
      nextStep();
    } else {
      setShowErrors(true);
    }
  };

  const getStepTitle = () => {
    const employer = data.employmentDetails?.employerName;
    const status = data.employmentStatus;

    switch (status) {
      case 'Retired':
        return "How long have you been retired?";
      case 'Disability':
        return "How long have you been on disability living allowance?";
      case 'Student':
        return "How long have you been a student?";
      case 'Family Carer':
        return "How long have you been a non professional carer?";
      case 'Homemaker':
        return "How long have you been a homemaker?";
      case 'Not Employed':
        return "How long have you been unemployed?";
      case 'Full-Time':
      case 'Part-Time':
      case 'Agency Worker':
      case 'Sub-Contractor':
        return employer ? `How long have you worked at ${employer}?` : `How long have you worked there?`;
      case 'Self-Employed':
        return "How long have you been self-employed?";
      case 'Armed Forces':
        return "How long have you been in the armed forces?";
      default:
        return "How long have you worked there?";
    }
  };

  return (
    <StepLayout
      title={getStepTitle()}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      <div className="input-grid-2-col">
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
              onChange={(e) => handleChange('years', e.target.value)}
            />
            {years.length > 0 && !isDurationZero && (
              <div className="checkmark-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#00cba0" />
                  <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            {showErrors && isDurationZero && (
              <div className="error-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#dc2626" />
                  <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        </div>

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
              onChange={(e) => handleChange('months', e.target.value)}
            />
            {months.length > 0 && !isMonthsInvalid && !isDurationZero && (
              <div className="checkmark-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#00cba0" />
                  <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            {showErrors && (isMonthsInvalid || isDurationZero) && (
              <div className="error-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#dc2626" />
                  <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
          {showErrors && isMonthsInvalid && (
            <span className="form-error-text">Please enter a number between 0 and 11 months.</span>
          )}
          {showErrors && isDurationZero && (
            <span className="form-error-text">Please tell us how long you've been here.</span>
          )}
        </div>
      </div>

      {totalEmploymentMonths > 0 && totalEmploymentMonths < 12 && (
        <div className="history-progress-premium">
          <div className="history-info">
            <span className="history-icon">ℹ</span>
            <span>You have provided <strong>{totalEmploymentMonths} months</strong> of history. We need at least <strong>12 months</strong>.</span>
          </div>
        </div>
      )}

      <Button onClick={handleContinue}>
        Continue
      </Button>
    </StepLayout>
  );
}
