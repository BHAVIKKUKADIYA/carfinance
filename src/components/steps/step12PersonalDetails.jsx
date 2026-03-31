import React, { useState } from 'react';
import StepLayout from '../layout/StepLayout';
import Button from '../ui/Button';

export default function PersonalDetails({ data, updateData, nextStep, prevStep, currentStep, totalSteps }) {
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState({ firstName: false, lastName: false });

  const handleChange = (field, value) => {
    updateData('personalDetails', {
      ...data.personalDetails,
      [field]: value
    });
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const { title, firstName, lastName } = data.personalDetails;

  const nameRegex = /^[a-zA-Z\s-]+$/;
  const isFirstNameEmpty = firstName.trim() === '';
  const isFirstNameInvalid = !isFirstNameEmpty && !nameRegex.test(firstName);
  const isFirstNameError = isFirstNameEmpty || isFirstNameInvalid;
  const showFirstNameError = (showErrors && isFirstNameEmpty) || (touched.firstName && isFirstNameInvalid);

  const isLastNameEmpty = lastName.trim() === '';
  const isLastNameInvalid = !isLastNameEmpty && !nameRegex.test(lastName);
  const isLastNameError = isLastNameEmpty || isLastNameInvalid;
  const showLastNameError = (showErrors && isLastNameEmpty) || (touched.lastName && isLastNameInvalid);

  const isTitleEmpty = title.trim() === '';
  const showTitleError = showErrors && isTitleEmpty;

  const isValid = !isTitleEmpty && !isFirstNameError && !isLastNameError;

  const handleContinue = () => {
    if (isValid) {
      nextStep();
    } else {
      setShowErrors(true);
      setTouched({ firstName: true, lastName: true });
    }
  };

  return (
    <StepLayout
      title="Almost done, let us know who you are"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      <div className="form-fields-container">
        <div>
          <label className="title-label">Your Title</label>
          <div className="title-button-group">
            {['Mr', 'Mrs', 'Miss', 'Ms'].map((t) => (
              <button
                key={t}
                type="button"
                className={`title-option-btn ${title === t ? 'active' : ''} ${showTitleError ? 'error' : ''}`}
                onClick={() => handleChange('title', t)}
              >
                {t}
              </button>
            ))}
          </div>
          {showTitleError && (
            <span className="form-error-text">Please select a title</span>
          )}
          <button type="button" className="title-link-btn">
            <span>›</span> My title isn't listed
          </button>
        </div>

        <div>
          <label className="form-label-premium">First Name</label>
          <div className="relative">
            <input
              type="text"
              className={`form-input-premium ${(showErrors && isFirstNameEmpty) || showFirstNameError ? 'form-input-error' : ''}`}
              placeholder="e.g. Bhavik"
              value={firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
            />
            {(showErrors && isFirstNameEmpty) || showFirstNameError ? (
              <div className="error-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#dc2626"/>
                  <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ) : firstName.trim().length > 1 && !isFirstNameError && (
              <div className="checkmark-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#00cba0" />
                  <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
          {showErrors && isFirstNameEmpty && (
            <span className="form-error-text">Please enter your first name</span>
          )}
          {showFirstNameError && !isFirstNameEmpty && (
            <span className="form-error-text">Please enter a valid first name</span>
          )}
        </div>

        <div>
          <label className="form-label-premium">Last Name</label>
          <div className="relative">
            <input
              type="text"
              className={`form-input-premium ${(showErrors && isLastNameEmpty) || showLastNameError ? 'form-input-error' : ''}`}
              placeholder="e.g. Kukadiya"
              value={lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
            />
            {(showErrors && isLastNameEmpty) || showLastNameError ? (
              <div className="error-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#dc2626"/>
                  <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ) : lastName.trim().length > 1 && !isLastNameError && (
              <div className="checkmark-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#00cba0" />
                  <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
          {showErrors && isLastNameEmpty && (
            <span className="form-error-text">Please enter your last name</span>
          )}
          {showLastNameError && !isLastNameEmpty && (
            <span className="form-error-text">Please enter a valid last name</span>
          )}
        </div>
      </div>

      <Button onClick={handleContinue}>
        Continue
      </Button>
    </StepLayout>
  );
}
