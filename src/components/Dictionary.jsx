import React, { useState } from 'react';
import axios from 'axios';

function Dictionary() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setDefinition(response.data[0].meanings[0].definitions[0].definition);
    } catch (error) {
      setErrorMessage('ไม่พบคำศัพท์ในพจนานุกรม');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={word} onChange={handleInputChange} />
        <button type="submit">ค้นหา</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      {definition && <div>{definition}</div>}
    </div>
  );
}

export default Dictionary;
