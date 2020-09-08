import React, {Component} from 'react';
import './industry-style.scss'

class Industry extends Component {
  
  handleCheck = () => {
    const { val } = this.props;
    const div = document.getElementsByClassName("industry")[val];
    if(div.classList.contains("checked"))
      div.classList.remove("checked");
    else
      div.classList.add("checked");
    div.firstChild.checked = !div.firstChild.checked;
    this.props.handleOnCheck();
  }
  
  render() {
    const {item: {name, image}, val, selectedIndustries: industries} = this.props;
    return (
      <div className={ industries.includes(val) ? "industry checked" : "industry"} onClick={() => { this.handleCheck() }}>
        <input type="checkbox" readOnly={true} checked={industries.includes(val)}/>
        <img src={ image } alt={ name }/>
        <span> { name } </span>
      </div>
    );
  }
}

export default Industry;
