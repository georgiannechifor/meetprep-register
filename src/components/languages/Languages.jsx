import React, {Fragment, useEffect, useState} from 'react';
import './language-style.scss';

const Languages = ({ languages }) => {
  const [langs, setLangs] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [selectedLanguages, setselectedLanguages] = useState([]);
  
  useEffect(() => {
    localStorage.setItem("languages", JSON.stringify(selectedLanguages.map(lang => lang.id)));
  }, [selectedLanguages]);
  
  const addLanguage = (lang, id) => {
    setselectedLanguages(selectedLanguages.includes({id, lang}) ? selectedLanguages : [...selectedLanguages, {id, lang}]);
    setLangs([]);
    setInputvalue("");
    
  }
  
  const showLanguages = () => {
      if(langs.length === 0)
        setLangs(languages);
      else
        setLangs([]);
  }
  
  const filterLanguages = (value) => {
    setInputvalue(value);
    const langs = languages.filter(lang => lang.name.toLowerCase().includes(value.toLowerCase()));
    setLangs(langs);
  }
  
  const deleteItem = (value) => {
      const selected = selectedLanguages.filter(lang => lang !== value);
      setselectedLanguages(selected);
  }
  
  return (
    <React.Fragment>
      <div className="languages">
        <p> Add Language: </p>
        <input
          type="text"
          value={inputvalue}
          placeholder="Add language"
          onChange={(event) => filterLanguages(event.target.value) }
          onClick={ () => showLanguages() }
        />
        
        <div className="languageList">
          { langs.map(lang => <div key={lang.id} className="lang" onClick={() => addLanguage(lang.name, lang.id)}> { lang.name} </div>) }
        </div>
      </div>
    
      <div className="container">
        { selectedLanguages.map(lang => <div key={lang.id} className="selectedLang"> { lang.lang } <span onClick={() => deleteItem(lang)}> &#9932; </span> </div>) }
      </div>
      
    </React.Fragment>
  );
}

export default Languages;
