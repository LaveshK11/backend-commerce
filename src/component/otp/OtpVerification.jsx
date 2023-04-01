import React from 'react';

export default function OptVerification() {
  return (
    <div className="otp-container">
      <h1 className="otp-heading">Enter OTP to Verify</h1>
      <form className="otp-form">
        <label className="otp-label">OTP:</label>
        <input className="otp-input" type="text" placeholder="Enter OTP" required />
        <button className="otp-button" type="submit">Verify</button>
      </form>
    </div>
  );
}
