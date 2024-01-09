
'use client';

import FormComponent from "./components/formComponent";

export default function Home() {
  const handleButtonClick = () => {
    document.getElementById('form-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  return (
    <>
    <div className="fullHeight landingPage">
          <img src="/Airzyboy_Industries_Logo.gif" alt="Logo" />
        <button onClick={handleButtonClick} className="form-button">CLICK HERE TO RSVP</button>
    </div>
    <div className="formContainer" id="form-container">
      <FormComponent />
    </div>
    </>
  )
}
