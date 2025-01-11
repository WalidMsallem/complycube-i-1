import React from 'react';
import ClientOnboarding from '../components/ClientOnboarding';
import { getCase1Config } from '../integration-configs/config-case-1';

const Case1 = () => {
  return (
    <div>
      <h1>Case 2: Identity Check -> Biometric Verification</h1>
      <ClientOnboarding config={getCase1Config} />
    </div>
  );
};

export default Case1;