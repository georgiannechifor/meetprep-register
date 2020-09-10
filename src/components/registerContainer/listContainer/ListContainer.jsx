import React, { Component } from 'react';
import APIService from "../../APIService";
import Reason from '../reason/Reason';
import Industry from '../industry/Industry';
import map from 'lodash/map';
import './list-container-style.scss'
import Interest from "../interest/Interest";
import Details from "../details/Details";
import Languages from "../languages/Languages";
import { connect } from 'react-redux';
import {getSelectedIndustries, getSelectedReasons} from "../../store/selectors";
import { removeIndustry } from "../../store/actions";

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIdata: {}
    }
  }
  
  UNSAFE_componentWillMount() {
    new APIService().service(data => this.setState({APIdata: data}));
  }
  
  getCurrentList() {
    const { currentListType: listType } = this.props;
    const { APIdata } = this.state
    const { languages, attending_reasons, industries } = APIdata;
    switch (listType) {
      case 'Reasons': {
        return (
          <div className="reasonList">
            { map(attending_reasons, item => {
              return (
              <Reason
                key={item.id}
                item={item}
              />)})
            }
          </div>
        );
      }
      case 'Industries': {
        return (
          <div className="industryList">
            { map(industries, industry => {
            return (
                <Industry
                  key={industry.id}
                  item={industry}
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
              map(this.props.selectedIndustries, industryID => {
                return map(industries, industry => {
                  if(industry.id === industryID) {
                    return <Interest key={industry.id} deleteItem={() => this.props.removeIndustry(industryID)} item={ industry }/>
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

export default connect(
  (state) => ({
    selectedReasons: getSelectedReasons(state),
    selectedIndustries: getSelectedIndustries(state)
  }),
  { removeIndustry }
)(ListContainer);
