import React, { useEffect, useState } from 'react';
import './RegistrationDetails.css';
import './common.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const RegistrationDetails = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [stateName, setStateName] = useState("")
  const [selectedState, setSelectedState] = useState('')
  const [districtName, setDistrictName] = useState("");
  const [collegeName, setCollegeName] = useState('');
  const [collegeEmail, setCollegeEmail] = useState('');
  const [collegeCode, setCollegeCode] = useState('');
  const [collegeAddress, setCollegeAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminContact, setAdminContact] = useState('');
  const [collegeWebsite, setCollegeWebsite] = useState('');
  const [collegeAffiliation, setCollegeAffiliation] = useState('');
  const [accreditation, setAccreditation] = useState('');
  const [image64,setImage64] = useState("");
  const Navigate = useNavigate();
  const location = useLocation();
  const collegeUid = location.state?.uid || "";  

  useEffect(() => {
    fetch("http://localhost:5000/api/states")
      .then((res) => res.json())
      .then((data) => setStates(data.states || []))
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  const handleStateChange = (e) => {
    const stateId = Number(e.target.value);
    setSelectedState(stateId)
    const selectedStateObj = states.find(state => state.state_id === stateId);
    console.log(selectedStateObj)

    if (!selectedStateObj) return;

    setStateName(selectedStateObj.state_name); // Store state name instead of ID
    setDistricts([]);  // Reset districts when state changes

    fetch(`http://localhost:5000/api/districts/${stateId}`)
      .then((res) => res.json())
      .then((data) => setDistricts(data.districts || []))
      .catch((error) => console.error("Error fetching districts:", error));
  };


  const handleDistrictChange = (e) => {
    const districtId = Number(e.target.value);
    const selectedDistrictObj = districts.find(district => district.district_id === districtId);
    console.log(selectedDistrictObj)
    setDistrictName(selectedDistrictObj.district_name)
  };

  const handleImageChange = async (e)=>{
    const file = e.target.files[0]
    if(file)
    {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () =>{
        setImage64(reader.result.split(",")[1])
      }
    }
  }
   
  const submitCollegeDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/college/details', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          "uid":collegeUid,
          "name": collegeName,
          "collegeEmail": collegeEmail,
          "collegeCode": collegeCode,
          "address": collegeAddress,
          "state": stateName, // Sending state name
          "district": districtName, // Sending district name
          "city": city,
          "pincode": pincode,
          "adminName": adminName,
          "adminEmail": adminEmail,
          "adminContact": adminContact,
          "website": collegeWebsite,
          "affiliation": collegeAffiliation,
          "accreditation": accreditation,
          "collegeLogo":image64,
        })
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if(response.ok)
      {
        Navigate('/EventPage',{ state: { uid: data.uid } })
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="details-page , blurbg  , common-input-style">
      <div className="wrapper-class">
        <div className='college-details'>
          <div className="common-inner-blur , innerDetails">
            <h3 className='give-Margin'>College Details</h3>
            <input type="text" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} placeholder='Name' required /><br />
            <input type='email' value={collegeEmail} onChange={(e) => setCollegeEmail(e.target.value)} placeholder='Email' required /> <br />
            <input type="text" value={collegeCode} onChange={(e) => setCollegeCode(e.target.value)} placeholder='College Code' required /><br />
            <textarea value={collegeAddress} onChange={(e) => setCollegeAddress(e.target.value)} placeholder='Address' required></textarea><br />

            <label htmlFor="accreditation" style={{fontSize:'15px',fontWeight:'bold',}}>State:</label>

            <select onChange={handleStateChange} value={selectedState} required>
              <option value="">-- Select State --</option>
              {states.map((state) => (
                <option key={state.state_id} value={state.state_id}>
                  {state.state_name}
                </option>
              ))}
            </select><br />

            <label htmlFor="accreditation" style={{fontSize:'15px',fontWeight:'bold',}}>District: </label>

            <select onChange={handleDistrictChange} disabled={!selectedState} required>
              <option value="">-- Select District --</option>
              {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select><br />

            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' required /><br />
            <input type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder='Pincode' required /><br />
          </div>
        </div>
              <div className="other-details">

              <div className="other-details-inner">

              
        <div className="admin-details">
          <div className="common-inner-blur , innerDetails">
            <h3 className='give-Margin'>Admin Details</h3>
            <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} placeholder='Admin Name' required /><br />
            <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder='Email' required /><br />
            <input type="text" value={adminContact} onChange={(e) => setAdminContact(e.target.value)} placeholder='Contact No' required /><br />
          </div>
        </div>

        <div className="verification-details">
          <div className="common-inner-blur , innerDetails">
            <h3 className='give-Margin'>Verification Details</h3>
            <input type="url" value={collegeWebsite} onChange={(e) => setCollegeWebsite(e.target.value)} placeholder='College Website' required /><br />
            <input type="text" value={collegeAffiliation} onChange={(e) => setCollegeAffiliation(e.target.value)} placeholder='Affiliated University' required /><br />

            <label htmlFor="accreditation" style={{fontSize:'15px',fontWeight:'bold',}}>Accreditation Status:</label>
            <select value={accreditation} onChange={(e) => setAccreditation(e.target.value)} required>
              <option value="">-- Select --</option>
              <optgroup label="NAAC Accreditation">
                <option value="A++">A++</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B++">B++</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="not_accredited">Not Accredited</option>
              </optgroup>
              <optgroup label="NBA Accreditation">
                <option value="nba_accredited">Accredited</option>
                <option value="nba_not_accredited">Not Accredited</option>
              </optgroup>
            </select>
          </div>
        </div>
        </div>
        <div className="logo-upload">
         <div className="common-inner-blur , innerDetails">
         <label htmlFor="accreditation" style={{fontSize:'15px',fontWeight:'bold',}}>College Logo: </label>

          <input type="file" name="collegeLogo" accept='image/*' id="collegeLogo" onChange={handleImageChange}/>
         </div>
        </div>
        </div>
      </div>

      <div className="next-button">
        <button className='common-button-style' onClick={submitCollegeDetails}>Next</button>
      </div>
    </div>
  );
}

export default RegistrationDetails;
