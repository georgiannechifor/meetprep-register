import React, {Component } from 'react';
import './details-style.scss';
// import APIService from "../../APIService";
import {getSelectedReasons, getSelectedIndustries, getInterests, getDetails} from "../../store/selectors";
import { connect } from 'react-redux';
import { addInfoToDetails, fetchRegister } from "../../store/actions";

class Details extends Component {
  finishRegister = () => {
    const { industries, interests, reasons, details, fetchRegister} = this.props;
    let result = {};
    industries.forEach((key, index) => result[key] = [interests[index]]);
    let register = {
        attending_reasons: reasons,
        linkedin: 0,
        other_topics: [],
        preferred_industries: result,
        terms: true
    };
    register = {...register, ...details};
    fetchRegister(register);
    
    this.props.finishClick();
  }
  
  handleSetInfo = (info) => {
    this.props.addInfoToDetails({...info});
  }
  
  render() {
    return (
      <form onSubmit={(event) => event.preventDefault()} className="form">
        <input required onChange={(event) => this.handleSetInfo({email: (event.target.value)})} type="email"
               placeholder="Email Address"/>
        <input required  onChange={(event) => this.handleSetInfo( {password: (event.target.value)})} type="password"
               placeholder="Password"/>
        <input required  onChange={(event) => this.handleSetInfo({first_name: event.target.value})} type="text"
               placeholder="First Name"/>
        <input required  onChange={(event) => this.handleSetInfo({last_name: event.target.value})} type="text"
               placeholder="Last Name"/>
      
        <div className="terms">
          <input type="checkbox" required/>
          <p>By creating an account on this platform you agree to the <a href="https://www.google.com">Terms and
            Conditions.</a></p>
        </div>
      
        <button type="submit" onClick={() => this.finishRegister()}> Finish</button>
    
      </form>
    );
  }
  
}

export default connect(
  (state) => ({
    reasons: getSelectedReasons(state),
    industries: getSelectedIndustries(state),
    interests: getInterests(state),
    details: getDetails(state)
  }),
  { addInfoToDetails, fetchRegister }
)(Details);
