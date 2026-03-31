import React, { useState, useEffect, useRef } from 'react';
import StepLayout from '../layout/StepLayout';
import Button from '../ui/Button';

// Static address data — replace with API call later
const STATIC_ADDRESSES = [
  { id: 1,  line1: '252 King Henrys Drive', line2: 'New Addington', town: 'Croydon', postcode: 'CR0 0AA' },
  { id: 2,  line1: '254 King Henrys Drive', line2: 'New Addington', town: 'Croydon', postcode: 'CR0 0AA' },
  { id: 3,  line1: '256 King Henrys Drive', line2: 'New Addington', town: 'Croydon', postcode: 'CR0 0AA' },
  { id: 4,  line1: '258 King Henrys Drive', line2: 'New Addington', town: 'Croydon', postcode: 'CR0 0AA' },
  { id: 5,  line1: '260 King Henrys Drive', line2: 'New Addington', town: 'Croydon', postcode: 'CR0 0AA' },
  { id: 6,  line1: '12 Addington Road',     line2: 'New Addington', town: 'Croydon', postcode: 'CR0 0AB' },
  { id: 7,  line1: '14 Addington Road',     line2: 'New Addington', town: 'Croydon', postcode: 'CR0 0AB' },
  { id: 8,  line1: '16 Addington Road',     line2: 'New Addington', town: 'Croydon', postcode: 'CR0 0AB' },
  { id: 9,  line1: '5 High Street',         line2: 'Croydon',       town: 'Croydon', postcode: 'CR0 1AA' },
  { id: 10, line1: '7 High Street',         line2: 'Croydon',       town: 'Croydon', postcode: 'CR0 1AA' },
];

const SHOW_LIMIT = 10;

function searchAddresses(query) {
  const q = query.toLowerCase().trim();
  return STATIC_ADDRESSES.filter(a =>
    a.line1.toLowerCase().includes(q) ||
    a.postcode.toLowerCase().includes(q) ||
    a.town.toLowerCase().includes(q)
  );
}

const SpinnerIcon = () => (
  <svg className="addr-spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" fill="#6905f2">
    <path d="M286.7 96.1C291.7 113 282.1 130.9 265.2 135.9C185.9 159.5 128.1 233 128.1 320C128.1 426 214.1 512 320.1 512C426.1 512 512.1 426 512.1 320C512.1 233.1 454.3 159.6 375 135.9C358.1 130.9 348.4 113 353.5 96.1C358.6 79.2 376.4 69.5 393.3 74.6C498.9 106.1 576 204 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 204 141.1 106.1 246.9 74.6C263.8 69.6 281.7 79.2 286.7 96.1z"/>
  </svg>
);

export default function Address({ data, updateData, nextStep }) {
  const [mode, setMode] = useState(data.address ? 'confirmed' : 'search');
  const [whyOpen, setWhyOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(SHOW_LIMIT);
  const [manualData, setManualData] = useState({ flatNumber: '', buildingName: '', buildingNumber: '', street: '', townCity: '', postcode: '' });
  const timerRef = useRef(null);
  const wrapperRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleQueryChange = (value) => {
    setQuery(value);
    setShowDropdown(false);
    setResults([]);
    setVisibleCount(SHOW_LIMIT);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (value.trim().length >= 3) {
      setLoading(true);
      // Simulate API delay
      timerRef.current = setTimeout(() => {
        const found = searchAddresses(value);
        setResults(found);
        setLoading(false);
        setShowDropdown(true);
      }, 600);
    } else {
      setLoading(false);
    }
  };

  const handleSelect = (addr) => {
    const full = `${addr.line1}, ${addr.line2}, ${addr.town}, ${addr.postcode}`;
    // Stored as: "252 King Henrys Drive, New Addington, Croydon, CR0 0AA"
    updateData('address', full);
    setShowDropdown(false);
    setMode('confirmed');
  };

  const formatAddress = (addressStr) => {
    if (!addressStr) return '';
    return addressStr.split(',').map((part, i, arr) => (
      <React.Fragment key={i}>
        {part.trim()}{i < arr.length - 1 ? ',' : ''}<br />
      </React.Fragment>
    ));
  };

  return (
    <StepLayout title="Next, where do you live?">
      <div className="why-accordion">
        <button type="button" className="why-link" onClick={() => setWhyOpen(prev => !prev)}>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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

      {mode === 'search' && (
        <div className="form-field-group" ref={wrapperRef}>
          <label className="form-label-premium">Search for your address</label>
          <div className="addr-input-wrap">
            <input
              type="text"
              className="form-input-premium"
              placeholder="e.g. 'CR0 3AG' or 'Factory Lane'"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              autoFocus
              autoComplete="off"
            />
            {loading && (
              <div className="addr-input-icon">
                <SpinnerIcon />
              </div>
            )}
          </div>

          {showDropdown && (
            <div className="addr-dropdown">
              <div className="addr-dropdown-count">
                Showing {Math.min(results.length, visibleCount)} of {results.length} addresses
              </div>
              {results.length === 0 ? (
                <div className="addr-dropdown-empty">No addresses found</div>
              ) : (
                results.slice(0, visibleCount).map(addr => (
                  <button
                    key={addr.id}
                    type="button"
                    className="addr-dropdown-item"
                    onClick={() => handleSelect(addr)}
                  >
                    {addr.postcode} {addr.line1}, {addr.line2}, {addr.town}
                  </button>
                ))
              )}
              {results.length > visibleCount && (
                <button
                  type="button"
                  className="addr-dropdown-item addr-dropdown-more"
                  onClick={() => setVisibleCount(prev => prev + SHOW_LIMIT)}
                >
                  Show more addresses
                </button>
              )}
              <div className="addr-dropdown-manual">
                <span>Can't see your address?</span>
                <button type="button" className="addr-dropdown-manual-btn" onClick={() => { setShowDropdown(false); setMode('manual'); }}>
                  Enter address manually
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: '1rem' }}>
            <button type="button" className="text-link" onClick={() => setMode('manual')}>
              Manually enter address details
            </button>
          </div>
        </div>
      )}

      {mode === 'manual' && (
        <div>
          <div className="manual-title mb-2">Add Address Manually</div>
          <button type="button" className="search-link" onClick={() => setMode('search')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search for an address
          </button>
          {[
            { field: 'flatNumber',     label: 'Flat or Unit Number', required: false },
            { field: 'buildingName',   label: 'Building Name',       required: false },
            { field: 'buildingNumber', label: 'Building Number',     required: false, isNumeric: true },
            { field: 'street',         label: 'Street',              required: true  },
            { field: 'townCity',       label: 'Town/City',           required: true  },
            { field: 'postcode',       label: 'Postcode',            required: true, isNumeric: true  },
          ].map(({ field, label, required, isNumeric }) => (
            <ManualField
              key={field}
              label={label}
              required={required}
              isNumeric={isNumeric}
              value={manualData[field]}
              onChange={(v) => setManualData(prev => ({ ...prev, [field]: v }))}
            />
          ))}
          <Button
            disabled={!manualData.street.trim() || !manualData.townCity.trim() || !manualData.postcode.trim() || 
                     (manualData.buildingNumber && !/^\d*$/.test(manualData.buildingNumber)) || 
                     (manualData.postcode && !/^\d*$/.test(manualData.postcode))}
            onClick={() => {
              const fields = [manualData.flatNumber, manualData.buildingName, manualData.buildingNumber, manualData.street, manualData.townCity, manualData.postcode].filter(f => f.trim());
              updateData('address', fields.join(', '));
              setMode('confirmed');
            }}
          >
            Continue
          </Button>
        </div>
      )}

      {mode === 'confirmed' && (
        <div className="address-card">
          <div className="address-text">
            {formatAddress(data.address)}
          </div>
          <button type="button" className="btn-change-address" onClick={() => { setMode('search'); setQuery(''); setResults([]); setShowDropdown(false); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            Change Address
          </button>
        </div>
      )}

      {mode === 'confirmed' && (
        <Button onClick={nextStep}>Continue</Button>
      )}
    </StepLayout>
  );
}

function ManualField({ label, required, value, onChange, isNumeric }) {
  const [touched, setTouched] = useState(false);
  
  const isInvalidNumeric = isNumeric && value.trim().length > 0 && !/^\d+$/.test(value);
  const isMissingRequired = required && touched && !value.trim();
  
  const isError = isMissingRequired || isInvalidNumeric;
  const isValid = !isError && (required ? value.trim().length > 1 : value.trim().length > 0);

  return (
    <div className="form-field-group-manual">
      <label className="form-label-premium">{label}</label>
      <div className="relative" style={{ position: 'relative' }}>
        <input
          type="text"
          className={`form-input-premium${isError ? ' form-input-error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        {isValid && (
          <div className="checkmark-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#00cba0"/>
              <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {isError && (
          <div className="checkmark-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#dc2626"/>
              <path d="M12 7V13M12 17H12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      {isMissingRequired && <span className="form-error-text">Please enter your {label.toLowerCase()}</span>}
      {isInvalidNumeric && !isMissingRequired && <span className="form-error-text">Please enter numbers only</span>}
    </div>
  );
}
