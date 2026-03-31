import React, { useState } from 'react';
import StepLayout from '../layout/StepLayout';
import Button from '../ui/Button';

export default function EmploymentDetails({ data, updateData, nextStep, prevStep, currentStep, totalSteps }) {
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState({ jobTitle: false, employerName: false, workLocation: false });

  const handleChange = (field, value) => {
    updateData('employmentDetails', {
      ...data.employmentDetails,
      [field]: value
    });
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const { jobTitle, employerName, workLocation } = data.employmentDetails;

  const isSelfOrArmed = data.employmentStatus === 'Self-Employed' || data.employmentStatus === 'Armed Forces';

  const jobTitleValid = jobTitle.trim().length >= 2;
  const employerNameValid = isSelfOrArmed || employerName.trim().length >= 2;
  const workLocationValid = workLocation.trim().length >= 2;

  const isValid = jobTitleValid && employerNameValid && workLocationValid;

  const handleContinue = () => {
    if (isValid) {
      nextStep();
    } else {
      setShowErrors(true);
      setTouched({ jobTitle: true, employerName: true, workLocation: true });
    }
  };

  return (
    <StepLayout
      title={isSelfOrArmed ? "What's your current job title?" : "Tell us about your current employment"}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      {!isSelfOrArmed && <p className="employer-notice-text">We won't contact your employer</p>}
      <button type="button" className="title-link-btn">
        <span>›</span> Why do we ask this?
      </button>

      <div className="form-fields-container">
        <div className="form-field-group-manual">
          <label className="form-label-premium">Job Title</label>
          <div className="relative">
            <input
              type="text"
              className={`form-input-premium ${(touched.jobTitle && !jobTitleValid) || (showErrors && !jobTitleValid) ? 'form-input-error' : ''}`}
              placeholder="e.g. Software Engineer"
              value={jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              onBlur={() => handleBlur('jobTitle')}
            />
            {(touched.jobTitle && !jobTitleValid) || (showErrors && !jobTitleValid) ? (
              <div className="error-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#dc2626" />
                  <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : jobTitleValid && (
              <div className="checkmark-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#00cba0" />
                  <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
          {((touched.jobTitle && !jobTitleValid) || (showErrors && !jobTitleValid)) && (
            <span className="form-error-text">Please enter your job title</span>
          )}
        </div>

        {!isSelfOrArmed && (
          <div className="form-field-group-manual">
            <label className="form-label-premium">Employer Name</label>
            <div className="relative">
              <input
                type="text"
                className={`form-input-premium ${(touched.employerName && !employerNameValid) || (showErrors && !employerNameValid) ? 'form-input-error' : ''}`}
                placeholder="e.g. Tech Corp Ltd"
                value={employerName}
                onChange={(e) => handleChange('employerName', e.target.value)}
                onBlur={() => handleBlur('employerName')}
              />
              {(touched.employerName && !employerNameValid) || (showErrors && !employerNameValid) ? (
                <div className="error-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#dc2626" />
                    <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : employerNameValid && (
                <div className="checkmark-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#00cba0" />
                    <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
            {((touched.employerName && !employerNameValid) || (showErrors && !employerNameValid)) && (
              <span className="form-error-text">Please enter your employer name</span>
            )}
          </div>
        )}

        <div className="form-field-group-manual">
          <label className="form-label-premium">
            {isSelfOrArmed ? "City/Town of Workplace" : "Where is your workplace based? "}
          </label>
          <div className="relative">
            <input
              type="text"
              className={`form-input-premium ${(touched.workLocation && !workLocationValid) || (showErrors && !workLocationValid) ? 'form-input-error' : ''}`}
              placeholder={isSelfOrArmed ? "" : "e.g. London"}
              value={workLocation}
              onChange={(e) => handleChange('workLocation', e.target.value)}
              onBlur={() => handleBlur('workLocation')}
            />
            {(touched.workLocation && !workLocationValid) || (showErrors && !workLocationValid) ? (
              <div className="error-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#dc2626" />
                  <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : workLocationValid && (
              <div className="checkmark-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#00cba0" />
                  <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
          {((touched.workLocation && !workLocationValid) || (showErrors && !workLocationValid)) && (
            <span className="form-error-text">Please enter your workplace location</span>
          )}
          <span className="form-helper-text">e.g. Manchester</span>
        </div>
      </div>

      <Button onClick={handleContinue}>
        Continue
      </Button>
    </StepLayout>
  );
}
