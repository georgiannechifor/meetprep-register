import React from 'react';
import './reason-style.scss';

const Reason = ({item: {id, name, image}, checked, index, selectedReasons, handleOnCheck}) => {
  
  const handleCheck = () => {
    const div = document.getElementsByClassName("reasonItem")[id - 1];
    div.children[2].checked = !div.children[2].checked;
    if(div.classList.contains("checked"))
      div.classList.remove("checked");
    else
      div.classList.add("checked");
    handleOnCheck()
  }
 
  return (
    <div className={ selectedReasons.includes(index) ? "reasonItem checked" : "reasonItem"} onClick={() => handleCheck() }>
      <img src={image} alt={name}/>
      <p> { name } </p>
      <input className="reason-checkbox" value={checked} type="checkbox" readOnly={true} checked={selectedReasons.includes(index)}/>
    </div>
  );
}

export default Reason;
