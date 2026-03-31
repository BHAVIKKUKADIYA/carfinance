import React, { useState, useEffect } from 'react';
import StepLayout from '../layout/StepLayout';
import Button from '../ui/Button';

export default function PreviousAddress({ data, updateData, nextStep, prevStep, currentStep, totalSteps }) {
  // Mode can be 'search', 'manual', or 'confirmed'
  const [mode, setMode] = useState(data.previousAddress ? 'confirmed' : 'search');
  const [whyOpen, setWhyOpen] = useState(false);
  
  // Local state for manual fields
  const [manualData, setManualData] = useState({
    flatNumber: '',
    buildingName: '',
    buildingNumber: '',
    street: '',
    townCity: '',
    postcode: ''
  });

  // Effect to populate manual fields if address already exists (e.g., going back)
  useEffect(() => {
    if (data.previousAddress && data.previousAddress.includes(',')) {
      const parts = data.previousAddress.split(',').map(s => s.trim());
      // basic mapping for demonstration
      setManualData({
        flatNumber: parts[0] || '',
        buildingName: parts[1] || '',
        buildingNumber: parts[2] || '',
        street: parts[3] || '',
        townCity: parts[4] || '',
        postcode: parts[5] || ''
      });
    }
  }, []);

  const handleUpdateManual = (field, value) => {
    setManualData(prev => ({ ...prev, [field]: value }));
  };

  const [showErrors, setShowErrors] = useState(false);

  const confirmManual = () => {
    // Combine fields into a single address string
    const fields = [
      manualData.flatNumber,
      manualData.buildingName,
      manualData.buildingNumber,
      manualData.street,
      manualData.townCity,
      manualData.postcode
    ].filter(f => f.trim() !== '');
    
    const combinedAddress = fields.join(', ');
    updateData('previousAddress', combinedAddress);
    setMode('confirmed');
  };

  const isManualValid = manualData.street && manualData.townCity && manualData.postcode;

  const handleAction = () => {
    if (mode === 'search') {
      if (data.previousAddress && data.previousAddress.trim().length > 3) {
        setMode('confirmed');
      } else {
        setShowErrors(true);
      }
    } else if (mode === 'manual') {
      if (isManualValid) {
        confirmManual();
      } else {
        setShowErrors(true);
      }
    } else {
      nextStep();
    }
  };

  const formatAddress = (addressStr) => {
    if (!addressStr) return "";
    return addressStr.split(',').map((part, index, array) => (
      <React.Fragment key={index}>
        {part.trim()}{index < array.length - 1 ? ',' : ''}<br/>
      </React.Fragment>
    ));
  };

  return (
    <StepLayout
      title="And what was your previous address?"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={prevStep}
    >
      {mode !== 'manual' && (
        <div className="why-accordion">
          <button type="button" className="why-link" onClick={() => setWhyOpen(prev => !prev)}>
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              className={`why-chevron ${whyOpen ? 'why-chevron-open' : ''}`}
            >
              <path d="M9 18l6-6-6-6"/>
            </svg>
            Why do we ask this?
          </button>
          <div className={`why-body-wrapper ${whyOpen ? 'why-body-open' : ''}`}>
            <p className="why-body">
              Providing your last 3 years of address history helps lenders securely check your details.
            </p>
          </div>
        </div>
      )}

      {mode === 'search' && (
        <div className="form-field-group">
          <label className="form-label-premium">Search for your address</label>
          <div className="relative">
            <input 
              type="text" 
              className="form-input-premium" 
              placeholder="e.g. 'CR0 3AG' or 'Factory Lane'"
              value={data.previousAddress || ''}
              onChange={(e) => updateData('previousAddress', e.target.value)}
              autoFocus
            />
            {data.previousAddress && data.previousAddress.length > 5 && (
              <div className="checkmark-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#00cba0"/>
                  <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button type="button" className="text-link" onClick={() => setMode('manual')}>
              Manually enter address details
            </button>
          </div>
        </div>
      )}

      {mode === 'manual' && (
        <div className="animate-fade-in">
          <div className="manual-title mb-2">Add Previous Address Manually</div>
          <button type="button" className="text-link mb-6 flex items-center gap-1" onClick={() => setMode('search')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search for an address
          </button>
          
          <div className="form-field-group-manual">
            <label className="form-label-premium">Flat or Unit Number</label>
            <div className="relative">
              <input type="text" className="form-input-premium" value={manualData.flatNumber} onChange={(e) => handleUpdateManual('flatNumber', e.target.value)} />
              {manualData.flatNumber.length > 0 && (
                <div className="checkmark-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#00cba0"/>
                    <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className="form-field-group-manual">
            <label className="form-label-premium">Building Name</label>
            <div className="relative">
              <input type="text" className="form-input-premium" value={manualData.buildingName} onChange={(e) => handleUpdateManual('buildingName', e.target.value)} />
              {manualData.buildingName.length > 0 && (
                <div className="checkmark-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#00cba0"/>
                    <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className="form-field-group-manual">
            <label className="form-label-premium">Building Number</label>
            <div className="relative">
              <input 
                type="text" 
                className={`form-input-premium ${(manualData.buildingNumber && !/^\d*$/.test(manualData.buildingNumber)) ? 'form-input-error' : ''}`} 
                value={manualData.buildingNumber} 
                onChange={(e) => handleUpdateManual('buildingNumber', e.target.value)} 
              />
              {manualData.buildingNumber.length > 0 && /^\d+$/.test(manualData.buildingNumber) && (
                <div className="checkmark-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#00cba0"/>
                    <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              {manualData.buildingNumber && !/^\d*$/.test(manualData.buildingNumber) && (
                <div className="checkmark-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#dc2626"/>
                    <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            {manualData.buildingNumber && !/^\d*$/.test(manualData.buildingNumber) && <span className="form-error-text">Please enter numbers only</span>}
          </div>
          <div className="form-field-group-manual">
            <label className="form-label-premium">Street</label>
            <div className="relative">
              <input type="text" className={`form-input-premium ${(showErrors && !manualData.street) ? 'form-input-error' : ''}`} value={manualData.street} onChange={(e) => handleUpdateManual('street', e.target.value)} />
              {manualData.street.length > 1 && (
                <div className="checkmark-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#00cba0"/>
                    <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              {showErrors && !manualData.street && (
                <div className="checkmark-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#dc2626"/>
                    <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            {showErrors && !manualData.street && <span className="form-error-text">Please enter your street name</span>}
          </div>
          <div className="form-field-group-manual">
            <label className="form-label-premium">Town/City</label>
            <div className="relative">
              <input type="text" className={`form-input-premium ${(showErrors && !manualData.townCity) ? 'form-input-error' : ''}`} value={manualData.townCity} onChange={(e) => handleUpdateManual('townCity', e.target.value)} />
              {manualData.townCity.length > 1 && (
                <div className="checkmark-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#00cba0"/>
                    <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              {showErrors && !manualData.townCity && (
                <div className="checkmark-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#dc2626"/>
                    <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            {showErrors && !manualData.townCity && <span className="form-error-text">Please enter your town/city</span>}
          </div>
          <div className="form-field-group-manual mb-6">
            <label className="form-label-premium">Postcode</label>
            <div className="relative">
              <input 
                type="text" 
                className={`form-input-premium ${(showErrors && !manualData.postcode) || (manualData.postcode && !/^\d*$/.test(manualData.postcode)) ? 'form-input-error' : ''}`} 
                value={manualData.postcode} 
                onChange={(e) => handleUpdateManual('postcode', e.target.value)} 
              />
              {manualData.postcode.length > 4 && /^\d+$/.test(manualData.postcode) && (
                <div className="checkmark-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#00cba0"/>
                    <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              {((showErrors && !manualData.postcode) || (manualData.postcode && !/^\d*$/.test(manualData.postcode))) && (
                <div className="checkmark-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#dc2626"/>
                    <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            {showErrors && !manualData.postcode && <span className="form-error-text">Please enter your postcode</span>}
            {manualData.postcode && !/^\d*$/.test(manualData.postcode) && <span className="form-error-text">Please enter numbers only</span>}
          </div>
        </div>
      )}

      {mode === 'confirmed' && (
        <div className="address-card">
          <div className="address-text">
            {formatAddress(data.previousAddress)}
          </div>
          <button type="button" className="btn-change-address" onClick={() => setMode('search')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            Change Address
          </button>
        </div>
      )}
      
      {(mode !== 'search' || (mode === 'search' && data.previousAddress?.trim().length > 4)) && (
        <Button onClick={handleAction}>Continue</Button>
      )}
    </StepLayout>
  );
}
