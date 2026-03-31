import React from 'react';

export default function StepLayout({ title, children, footer }) {
  return (
    <div className="layout-wrapper fade-in">
      <main className="main-content">
        <h1 className="step-title-premium">
          {title}
        </h1>

        <div className="form-content">
          {children}
        </div>

        {footer && (
          <div className="mt-8">
            {footer}
          </div>
        )}
      </main>
    </div>
  );
}
