import React from 'react';
import { CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function SuccessScreen() {
  return (
    <div className="card success-card-wrapper fade-in">
      <div className="success-icon-container">
        <CheckCircle size={80} color="#00cba0" />
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
      
      <p className="success-message">
        Thank you for applying. We have received your details and our team will get back to you shortly.
      </p>
      
      <Button onClick={() => window.location.reload()}>
        Start New Application
      </Button>
    </div>
  );
}
