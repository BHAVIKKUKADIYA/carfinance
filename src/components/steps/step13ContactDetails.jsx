import React, { useState } from 'react';
import StepLayout from '../layout/StepLayout';
import Button from '../ui/Button';

export default function ContactDetails({ data, updateData, submitForm, prevStep, currentStep, totalSteps }) {
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState({ email: false, phone: false });

  const handleChange = (field, value) => {
    updateData('contactDetails', {
      ...data.contactDetails,
      [field]: value
    });
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const { email, phone } = data.contactDetails;
  
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = phone.length === 10;
  const isValid = isValidEmail && isValidPhone;

  const showEmailError = (showErrors || touched.email) && !isValidEmail;
  const showPhoneError = (showErrors || touched.phone) && !isValidPhone;

  const handleSubmit = () => {
    if (isValid) {
      submitForm();
    } else {
      setShowErrors(true);
      setTouched({ email: true, phone: true });
    }
  };

  return (
    <StepLayout
      title=" "
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      <div className="flex flex-col gap-4 mb-8">
        <div className="form-field-group-manual">
          <label className="form-label-premium">Email Address</label>
          <div className="relative">
            <input 
              type="email" 
              className={`form-input-premium ${showEmailError ? 'form-input-error' : ''}`} 
              placeholder="e.g. john.doe@example.com"
              value={email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
            />
            {showEmailError ? (
              <div className="error-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#dc2626"/>
                  <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ) : isValidEmail && (
              <div className="checkmark-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#00cba0"/>
                  <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
          {showEmailError && (
            <span className="form-error-text">Please enter a valid email address</span>
          )}
        </div>

        <div className="form-field-group-manual">
          <label className="form-label-premium">Mobile Number</label>
          <div className="relative">
            <input 
              type="tel" 
              className={`form-input-premium ${showPhoneError ? 'form-input-error' : ''}`}
              placeholder="e.g. 07123456789"
              value={phone}
              onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
              onBlur={() => handleBlur('phone')}
            />
            {showPhoneError ? (
              <div className="error-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#dc2626"/>
                  <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ) : isValidPhone && (
              <div className="checkmark-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#00cba0"/>
                  <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
          {showPhoneError && (
            <span className="form-error-text">Please enter a valid mobile number (10 digits)</span>
          )}
        </div>
      </div>
      
      <div className="text-center mb-6">
        <p className="footer-text-standard">
          By submitting this form, you agree to our <strong>Terms and Conditions</strong> and <strong>Privacy Policy</strong>.
        </p>
      </div>

      <Button onClick={handleSubmit}>
        Get My Quote
      </Button>
    </StepLayout>
  );
}
