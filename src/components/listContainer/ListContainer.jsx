import React, { Component } from 'react';
import APIService from "../../APIService";
import Reason from '../reason/Reason';
import Industry from '../industry/Industry';
import map from 'lodash/map';
import './list-container-style.scss'
import Interest from "../interest/Interest";
import Details from "../details/Details";
import Languages from "../languages/Languages";

export default class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      checkedReasons: [], // Array of IDs of attending reasons
      checkedIndustries: [] //Array of IDs of industries
    }
  }
  
  componentWillMount() {
    new APIService().service(data => this.setState({data: data}));
    const reasons = localStorage.getItem("checkedReasons");
    const industries = localStorage.getItem("checkedIndustries")
    this.setState({
      checkedReasons: reasons ? Array.from(reasons).filter(x => !isNaN(x)).map(x => parseInt(x)) : [],
      checkedIndustries: industries ? Array.from(industries).filter(x => !isNaN(x)).map(x => parseInt(x)) : []
    });
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    localStorage.setItem("checkedReasons", JSON.stringify(this.state.checkedReasons));
    localStorage.setItem("checkedIndustries", JSON.stringify(this.state.checkedIndustries));
  }
  
  handleOnCheckReason = (reasonID) => {
    let newCheckedReasons = this.state.checkedReasons;
    if(newCheckedReasons.includes((reasonID)))
      newCheckedReasons = newCheckedReasons.filter(item => item !== reasonID);
    else
      newCheckedReasons.push(reasonID);
    this.setState({
      checkedReasons: newCheckedReasons
    })
  }
  
  handleOnCheckIndustry = (industryID) => {
    let newCheckedIndustries = this.state.checkedIndustries;
    if(newCheckedIndustries.includes(industryID))
      newCheckedIndustries = newCheckedIndustries.filter(item => item !== industryID);
    else
      newCheckedIndustries.push(industryID);
    this.setState({
      checkedIndustries: newCheckedIndustries
    })
  }
  
  deleteIndustry = (index) => {
    const industries = this.state.checkedIndustries.filter(item => item !== index);
    this.setState({
      checkedIndustries: industries
    });
  }
  
  getCurrentList() {
    const { currentListType: listType } = this.props;
    const { data, checkedReasons, checkedIndustries } = this.state
    const { languages, attending_reasons, industries } = data;
    switch (listType) {
      case 'Reasons': {
        return (
          <div className="reasonList">
            { map(attending_reasons, (item, index) => {
              return (
              <Reason
                key={item.id}
                item={item}
                selectedReasons={checkedReasons}
                index={index}
                handleOnCheck={() => this.handleOnCheckReason(index)}
              />)})
            }
          </div>
        );
      }
      case 'Industries': {
        return (
          <div className="industryList">
            { map(industries, (industry, index) => {
            return (
                <Industry
                  key={industry.id}
                  val={index}
                  item={industry}
                  selectedIndustries={checkedIndustries}
                  handleOnCheck={() => this.handleOnCheckIndustry(index)}
                />
            )
          }) }
          </div>
        );
      }
      case 'Interests': {
        return (
          <div className="interests">
            {
              map(checkedIndustries, industryID => {
                return map(industries, (industry, index) => {
                  if(index === industryID) {
                    return <Interest key={industry.id} deleteItem={() => this.deleteIndustry(industryID)} id={industry.id} name={ industry.name }/>
                  }
                })
              })
            }
          </div>
        );
      }
      case 'Details': {
        return <Details finishClick={this.props.finishClick}/>
      }
      case 'Language': {
        return <Languages languages={ languages } />
      }
      default: {
        return <h1 style={{ textAlign: "center", fontWeight: "200", fontSize: "20px"}}> Error in loading register. Please select a tab </h1>;
      }
    }
  }
  
  render() {
    return (
      this.getCurrentList()
    );
  }
}
