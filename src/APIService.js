export default class APIService {
  
  service = (callback) => {
    fetch('http://meetprep.beta.bitstone.eu/api/v1/helpers', {
      headers: {
        'Content-Type': 'application/json',
        'security-token': 'test',
        'language': 'en'
      }
    })
      .then(response => response.json())
      .then(data => callback(data.data))
      .catch((error) => console.log(error));
  }
  
  
  requestForTopics = (industryID, keywords, callback) => {
    fetch('http://meetprep.beta.bitstone.eu/api/v1/search-topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'security-token': 'test',
        'language': 'en'
      },
      body: JSON.stringify({
        industryID: industryID,
        keywords: keywords
      })
    })
      .then(response => response.json())
      .then(data => callback(data.data.items))
      .catch((error) => console.log(error));
  }
  
  register = ({registerObject, callback}) => {
    console.log(registerObject);
    fetch('http://meetprep.beta.bitstone.eu/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'security-token': 'test',
        'language': 'en'
      },
      body: JSON.stringify(registerObject)
    })
      .then(response => response.json())
      .then(data => callback(data))
      .catch((error) => console.log(error));
  }
  
  
  updateUser = ({userID, languages, token, callback}) => {
    fetch('http://meetprep.beta.bitstone.eu/api/v1/user/' + userID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'security-token': 'test',
        'language': 'en',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(languages)
    })
      .then(resp => resp.json())
      .then(data => callback(data))
      .catch(error => console.log(error));
  }
}


