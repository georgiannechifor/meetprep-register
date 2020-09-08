import React, { useState } from 'react';
import './details-style.scss';
import APIService from "../../APIService";


const Details = ({finishClick}) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const finishRegister = () => {
    localStorage.setItem("details", JSON.stringify({mail, pass, firstName, lastName}));
    
    const reasons = JSON.parse(localStorage.getItem("checkedReasons"));
    const industries = JSON.parse(localStorage.getItem("checkedIndustries"));
    const interests = JSON.parse(localStorage.getItem("interests"));
    const details = JSON.parse(localStorage.getItem("details"));
    //const languages = JSON.parse(localStorage.getItem("languages"));
    let result = {};
    industries.forEach((key, index) => result[key] = [interests[index]]);
    
    if(reasons && industries && interests && details) {
      const register = {
        attending_reasons: reasons,
        email: mail,
        first_name: firstName,
        last_name: lastName,
        linkedin: 0,
        other_topics: [],
        password: pass,
        preferred_industries: result,
        terms: true
      };
      
      new APIService().register({registerObject: {...register}, callback: (data) => {
        //dispatch(data)
        if(data.status === 'success') {
          localStorage.setItem("userID", JSON.stringify(data.data.user.id));
          localStorage.setItem("registerToken", JSON.stringify(data.data.access_token));
          finishClick();
        } else {
          alert(`Invalid request ${JSON.stringify(data.errors)}`);
        }
       
        }});
      
    }
    
  }
  
  return (
   <form onSubmit={(event) => event.preventDefault()} className="form">
     <input required value={mail} onChange={(event) => setMail(event.target.value) } type="email" placeholder="Email Address"/>
     <input required value={pass} onChange={(event) => setPass(event.target.value) } type="password" placeholder="Password"/>
     <input required value={firstName} onChange={(event) => setFirstName(event.target.value) } type="text" placeholder="First Name"/>
     <input required value={lastName} onChange={(event) => setLastName(event.target.value) } type="text" placeholder="Last Name"/>
     
     <div className="terms">
        <input type="checkbox" required />
        <p>By creating an account on this platform you agree to the <a href="#">Terms and Conditions.</a></p>
     </div>
  
     <button type="submit" onClick={ () => finishRegister() }> Finish </button>
    
   </form>
  );
}

export default Details;
