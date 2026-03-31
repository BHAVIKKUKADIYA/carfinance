import React, { useRef, useState } from 'react';
import StepLayout from '../layout/StepLayout';
import Button from '../ui/Button';

const Checkmark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#00cba0" />
    <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#e53e3e" />
    <path d="M12 7v6M12 17h.01" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

function validateDay(day, month, year) {
  const d = parseInt(day);
  const m = parseInt(month);
  const y = parseInt(year) || new Date().getFullYear();
  if (!day || isNaN(d) || d < 1) return false;
  const daysInMonth = new Date(y, m, 0).getDate(); // m not m-1, so Date auto-handles it
  return m >= 1 && m <= 12 ? d <= daysInMonth : d <= 31;
}

function validateMonth(month) {
  const m = parseInt(month);
  return m >= 1 && m <= 12;
}

function validateYear(year) {
  return year.length === 4;
}

function getAgeError(day, month, year) {
  const d = parseInt(day), m = parseInt(month), y = parseInt(year);
  const today = new Date();
  const dob = new Date(y, m - 1, d);
  const age = today.getFullYear() - dob.getFullYear() -
    (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

  if (age < 18) return "We can only arrange finance for over 18s. Come back in a few years - we'll be happy to help!";
  if (age > 100) return "You must be no older than 100 years old";
  return null;
}

export default function DateOfBirth({ data, updateData, nextStep, prevStep, currentStep, totalSteps }) {
  const { day, month, year } = data.dateOfBirth;
  const [touched, setTouched] = useState({ day: false, month: false, year: false });

  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const dayValid = validateDay(day, month, year);
  const monthValid = validateMonth(month);
  const yearValid = validateYear(year);

  const dayError = touched.day && !dayValid;
  const monthError = touched.month && !monthValid;
  const yearError = touched.year && !yearValid;

  const ageError = dayValid && monthValid && yearValid ? getAgeError(day, month, year) : null;
  const allValid = dayValid && monthValid && yearValid && !ageError;

  const handleChange = (field, value, nextRef) => {
    const clean = value.replace(/\D/g, '');
    updateData('dateOfBirth', { ...data.dateOfBirth, [field]: clean });

    const maxLen = field === 'year' ? 4 : 2;
    if (clean.length === maxLen && nextRef) {
      nextRef.current?.focus();
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const inputClass = (valid, error) =>
    `dob-input${error ? ' dob-input-error' : valid ? ' dob-input-valid' : ''}`;

  return (
    <StepLayout title="What is your date of birth?">
      <div className="dob-container">
        <div className="dob-field-small">
          <label className="dob-label">Day</label>
          <div className="relative">
            <input
              type="text"
              className={inputClass(dayValid, dayError)}
              placeholder="DD"
              maxLength={2}
              value={day}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleChange('day', e.target.value, monthRef)}
              onBlur={() => handleBlur('day')}
            />
            <div className="dob-checkmark">
              {dayError ? <ErrorIcon /> : dayValid ? <Checkmark /> : null}
            </div>
          </div>
        </div>

        <div className="dob-field-small">
          <label className="dob-label">Month</label>
          <div className="relative">
            <input
              ref={monthRef}
              type="text"
              className={inputClass(monthValid, monthError)}
              placeholder="MM"
              maxLength={2}
              value={month}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleChange('month', e.target.value, yearRef)}
              onBlur={() => handleBlur('month')}
            />
            <div className="dob-checkmark">
              {monthError ? <ErrorIcon /> : monthValid ? <Checkmark /> : null}
            </div>
          </div>
        </div>

        <div className="dob-field-large">
          <label className="dob-label">Year</label>
          <div className="relative">
            <input
              ref={yearRef}
              type="text"
              className={inputClass(yearValid && !ageError, yearError || (yearValid && !!ageError))}
              placeholder="YYYY"
              maxLength={4}
              value={year}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleChange('year', e.target.value, null)}
              onBlur={() => handleBlur('year')}
            />
            <div className="dob-checkmark">
              {(yearError || (yearValid && ageError)) ? <ErrorIcon /> : yearValid ? <Checkmark /> : null}
            </div>
          </div>
        </div>
      </div>

      {dayError && (
        <p className="dob-error">Please enter a valid day.</p>
      )}
      {monthError && month.length > 0 && parseInt(month) > 12 && (
        <p className="dob-error">Months cannot be greater than 12.</p>
      )}
      {monthError && (month.length === 0 || parseInt(month) < 1) && (
        <p className="dob-error">Please enter a valid month.</p>
      )}
      {yearError && !ageError && (
        <p className="dob-error">Please enter a valid year.</p>
      )}
      {ageError && (
        <p className="dob-error">{ageError}</p>
      )}

      <Button onClick={() => allValid && nextStep()} disabled={!allValid}>
        Continue
      </Button>
    </StepLayout>
  );
}
