import { useState, useEffect } from 'react';
import './index.css';

// Import all steps
import VehicleType from './components/steps/step0VehicleType';
import DrivingLicence from './components/steps/step1DrivingLicence';
import MaritalStatus from './components/steps/step2MaritalStatus';
import DateOfBirth from './components/steps/step3DateOfBirth';
import Address from './components/steps/step4Address';
import ResidentialStatus from './components/steps/step5ResidentialStatus';
import PreviousAddress from './components/steps/step5.5PreviousAddress';
import AddressDuration from './components/steps/step6AddressDuration6';
import EmploymentStatus from './components/steps/step7EmploymentStatus';
import EmploymentDetails from './components/steps/step8EmploymentDetails';
import WorkDuration from './components/steps/step9WorkDuration';
import MonthlyIncome from './components/steps/step10MonthlyIncome';
import LoanAmount from './components/steps/step11LoanAmount';
import PersonalDetails from './components/steps/step12PersonalDetails';
import ContactDetails from './components/steps/step13ContactDetails';
import SuccessScreen from './components/steps/SuccessScreen';

const TOTAL_STEPS = 13;

const WORKING_STATUSES = ['Full-Time', 'Part-Time', 'Self-Employed', 'Agency Worker', 'Armed Forces', 'Sub-Contractor'];

const INITIAL_FORM_DATA = {
  vehicleType: '',
  drivingLicence: '',
  maritalStatus: '',
  dateOfBirth: { day: '', month: '', year: '' },
  addresses: [
    {
      address: '',
      residentialStatus: '',
      duration: { years: '', months: '' }
    }
  ],
  currentIndex: 0,
  employments: [
    {
      employmentStatus: '',
      employmentDetails: { jobTitle: '', employerName: '', workLocation: '' },
      workDuration: { years: '', months: '' }
    }
  ],
  employmentIndex: 0,
  monthlyIncome: '',
  loanAmount: 0,
  loanAmountNotSure: false,
  personalDetails: { title: '', firstName: '', lastName: '' },
  contactDetails: { email: '', phone: '' }
};

function App() {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('formStep');
    return saved ? parseFloat(saved) : 0;
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('formData');
    try {
      return saved ? JSON.parse(saved) : INITIAL_FORM_DATA;
    } catch (e) {
      return INITIAL_FORM_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem('formStep', currentStep.toString());
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [currentStep, formData]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateAddressData = (field, value) => {
    setFormData((prev) => {
      const newAddresses = [...prev.addresses];
      newAddresses[prev.currentIndex] = {
        ...newAddresses[prev.currentIndex],
        [field]: value,
      };
      return {
        ...prev,
        addresses: newAddresses,
      };
    });
  };

  const calculateTotalMonths = (addrList) => {
    return addrList.reduce((total, addr) => {
      const y = parseInt(addr.duration.years) || 0;
      const m = parseInt(addr.duration.months) || 0;
      return total + (y * 12) + m;
    }, 0);
  };

  const calculateTotalEmploymentMonths = (empList) => {
    return empList.reduce((total, emp) => {
      const y = parseInt(emp.workDuration.years) || 0;
      const m = parseInt(emp.workDuration.months) || 0;
      return total + (y * 12) + m;
    }, 0);
  };

  const updateEmploymentData = (field, value) => {
    setFormData((prev) => {
      const newEmployments = [...prev.employments];
      newEmployments[prev.employmentIndex] = {
        ...newEmployments[prev.employmentIndex],
        [field]: value,
      };
      return {
        ...prev,
        employments: newEmployments,
      };
    });
  };

  const nextStep = (overrideStatus = null) => {
    const statusToCheck = overrideStatus || formData.employmentStatus;

    // Logic for Step 5 -> 6
    if (currentStep === 5) {
      setCurrentStep(6);
      return;
    }

    // Logic for Step 6 -> Check duration (36 months)
    if (currentStep === 6) {
      const totalMonths = calculateTotalMonths(formData.addresses);
      if (totalMonths < 36) {
        // We need more history. Add a new address and go to Step 5.5
        setFormData(prev => ({
          ...prev,
          addresses: [...prev.addresses, { address: '', residentialStatus: '', duration: { years: '', months: '' } }],
          currentIndex: prev.currentIndex + 1
        }));
        setCurrentStep(5.5);
        return;
      } else {
        // 3 years complete. Proceed to Step 7
        setCurrentStep(7);
        return;
      }
    }

    // Logistic for Step 5.5 -> 5
    if (currentStep === 5.5) {
      setCurrentStep(5);
      return;
    }

    // Conditional logic for skipping step 8
    if (currentStep === 7) {
      if (!WORKING_STATUSES.includes(statusToCheck)) {
        setCurrentStep(9);
        return;
      }
    }

    // Logic for Step 9 -> Check total duration (12 months)
    if (currentStep === 9) {
      const totalEmpMonths = calculateTotalEmploymentMonths(formData.employments);
      if (totalEmpMonths < 12) {
        // Need more history. Add new employment and loop back to Step 7
        setFormData(prev => ({
          ...prev,
          employments: [...prev.employments, {
            employmentStatus: '',
            employmentDetails: { jobTitle: '', employerName: '', workLocation: '' },
            workDuration: { years: '', months: '' }
          }],
          employmentIndex: prev.employmentIndex + 1
        }));
        setCurrentStep(7);
        return;
      } else {
        // 1 year complete. Proceed to Step 10
        setCurrentStep(10);
        return;
      }
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    // Going back from Step 5.5: Check if we are in a loop
    if (currentStep === 5.5) {
      if (formData.currentIndex > 0) {
        // Go back to the duration (Step 6) of the PREVIOUSLY entered address
        // But first, we might want to pop the current empty address if it's the latest one
        // and we haven't filled anything yet. Simplifying for now:
        setFormData(prev => ({
          ...prev,
          currentIndex: prev.currentIndex - 1
        }));
        setCurrentStep(6);
        return;
      } else {
        // Go back to Step 5 of current address
        setCurrentStep(5);
        return;
      }
    }

    // Going back from Step 5: If index > 0, we were in 5.5 loop
    if (currentStep === 5) {
      if (formData.currentIndex > 0) {
        setCurrentStep(5.5);
        return;
      } else {
        setCurrentStep(4);
        return;
      }
    }

    // Going back from Step 6: Go to Step 5 of current address
    if (currentStep === 6) {
      setCurrentStep(5);
      return;
    }

    // Going back from Step 7: 
    if (currentStep === 7) {
      if (formData.employmentIndex > 0) {
        // Go back to the duration (Step 9) of the PREVIOUS employment
        setFormData(prev => ({
          ...prev,
          employmentIndex: prev.employmentIndex - 1
        }));
        setCurrentStep(9);
        return;
      } else {
        // Go back to Step 6
        setCurrentStep(6);
        return;
      }
    }

    // Going back from Step 8: Go to Step 7
    if (currentStep === 8) {
      setCurrentStep(7);
      return;
    }

    // Going back from Step 9: 
    if (currentStep === 9) {
      const currentEmp = formData.employments[formData.employmentIndex];
      if (!WORKING_STATUSES.includes(currentEmp.employmentStatus)) {
        setCurrentStep(7);
        return;
      } else {
        setCurrentStep(8);
        return;
      }
    }

    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting form data:', formData);
    
    try {
      const response = await fetch('http://localhost/carfinance-02-main/backend/submit.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        console.log('Application submitted successfully:', result);
        setIsSubmitted(true);
        localStorage.removeItem('formStep');
        localStorage.removeItem('formData');
      } else {
        console.error('Submission failed:', result.message);
        alert('Submission failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error during submission:', error);
      alert('An error occurred during submission. Please try again.');
    }
  };

  if (isSubmitted) {
    return <SuccessScreen />;
  }

  // Render current step component
  const renderStep = () => {
    const sharedProps = {
      data: formData,
      updateData: updateFormData,
      updateAddressData,
      nextStep,
      prevStep,
      currentStep,
      totalSteps: TOTAL_STEPS,
      totalMonths: calculateTotalMonths(formData.addresses),
      totalEmploymentMonths: calculateTotalEmploymentMonths(formData.employments)
    };

    switch (currentStep) {
      case 0: return <VehicleType {...sharedProps} />;
      case 1: return <DrivingLicence {...sharedProps} />;
      case 2: return <MaritalStatus {...sharedProps} />;
      case 3: return <DateOfBirth {...sharedProps} />;
      case 4: return <Address {...sharedProps} data={formData.addresses[formData.currentIndex]} updateData={updateAddressData} />;
      case 5: return <ResidentialStatus {...sharedProps} data={formData.addresses[formData.currentIndex]} updateData={updateAddressData} />;
      case 5.5: return <PreviousAddress {...sharedProps} data={formData.addresses[formData.currentIndex]} updateData={updateAddressData} />;
      case 6: return <AddressDuration {...sharedProps} data={formData.addresses[formData.currentIndex]} updateData={updateAddressData} />;
      case 7: return <EmploymentStatus {...sharedProps} data={formData.employments[formData.employmentIndex]} updateData={updateEmploymentData} />;
      case 8: return <EmploymentDetails {...sharedProps} data={formData.employments[formData.employmentIndex]} updateData={updateEmploymentData} />;
      case 9: return <WorkDuration {...sharedProps} data={formData.employments[formData.employmentIndex]} updateData={updateEmploymentData} />;
      case 10: return <MonthlyIncome {...sharedProps} />;
      case 11: return <LoanAmount {...sharedProps} />;
      case 12: return <PersonalDetails {...sharedProps} />;
      case 13: return <ContactDetails {...sharedProps} submitForm={handleSubmit} />;
      default: return null;
    }
  };

  return (
    <div className="app-main">
      <header className="site-header">
        <div className="header-inner">
          <div className="logo-container">
            <div>Car</div>
            <div>Finance</div>
            <div className="logo-bottom">
              247 <span className="logo-smile">☻</span>
            </div>
          </div>
          <div className="trustpilot-container">
            <div className="trustpilot-title">
              <span className="trustpilot-star-big">★</span> Trustpilot
            </div>
            <div className="trustpilot-stars">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="trustpilot-star">★</div>
              ))}
            </div>
            <div className="trustpilot-score">
              <span>TrustScore </span>
              <strong className="tp-value">4.9</strong>
              <span>|</span>
              <strong className="tp-reviews-num">48,867</strong>
              <span> reviews</span>
            </div>
          </div>
        </div>
      </header>
      <div className="app-wrapper">
        <div className="progress-bar-block">
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            ></div>
          </div>
          {currentStep > 0 && (
            <button className="back-btn-premium" onClick={prevStep}>
              <span className="back-arrow">‹</span> Previous Step
            </button>
          )}
        </div>
        <div className="app-container">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default App;
