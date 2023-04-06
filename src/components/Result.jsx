import React, { useState, useEffect } from "react";

function Result(props) {
  const [meanings, setMeanings] = useState([]);

  async function searchWord(word) {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    setMeanings(data[0].meanings);
  }

  useEffect(() => {
    if (props.word) {
      searchWord(props.word);
    }
  }, [props.word]);

  return (
    <div>
      {props.word && (
        <div className="Result">
          <h2>{props.word}</h2>
          {meanings.map((meaning, index) => (
            <div key={index}>
              {/* <h3>Definition:</h3>
              <p>{meaning.definitions[0].definition}</p> */}

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col"  style={{width: '16%'}}>Part of Speech</th>
                    <th scope="col"  style={{width: '64%'}}>Definition:</th>
                    <th scope="col"  style={{width: '20%'}}>Example:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>({meaning.partOfSpeech}.)</p>
                    </td>
                    <td>
                      {meaning.definitions.map(
                        (
                          definition,
                          defIndex //โค้ดส่วนนี้คือการ loop ข้อมูลทุกตัวของ definition
                        ) => (
                          <p key={defIndex}>{definition.definition}</p>
                        )
                      )}
                    </td>
                    <td>
                      <p>{meaning.definitions[0].example}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Result;
