import React, { useState } from "react";
import "./App.css";

function App() {

  const [numInputs, setNumInputs] = useState(0);
  const [inputValues, setInputValues] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [GPA, setGPA] = useState(0)

  const handleSelectChange = (event) => {
    const selectedNumber = parseInt(event.target.value);
    setNumInputs(selectedNumber);
    setInputValues(new Array(selectedNumber).fill(""));
  };

  const handleInputChange = (index, event) => {
    const newInputValues = [...inputValues];
    if (/^(\d+(\.\d*)?|\.\d+)?$/.test(event.target.value)) {
      newInputValues[index] = event.target.value
      setInputValues(newInputValues);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    while (inputValues.length < 24) {
      inputValues.push(-1)
    }
    const data = {
      features: inputValues
    }
    fetch('https://is353-be.onrender.com/predict', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => setGPA(result.prediction[0][0]))
    .catch(err => console.log(err))
    setModalVisible(true);

  };
   const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <div className="App">
      <h1>GPA Prediction Application</h1>
      <div>
        <label htmlFor="numInputs">Select Number of Semesters:</label>
        <select id="numInputs" onChange={handleSelectChange} value={numInputs}>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
          <option value={16}>16</option>
          <option value={17}>17</option>
          <option value={18}>18</option>
          <option value={19}>19</option>
          <option value={20}>20</option>
          <option value={21}>21</option>
          <option value={22}>22</option>
          <option value={23}>23</option>
          <option value={24}>24</option>
        </select>
      </div>

      {numInputs > 0 && (
        <form onSubmit={handleSubmit}>
          {Array.from({ length: numInputs }, (_, index) => (
            <div key={index}>
              <label>Semester {index + 1}:</label>
              <input
                type="text"
                value={inputValues[index]}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
          ))}

          <button type="submit">Submit</button>
        </form>
      )}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Successfully</h2>
            <p>Your GPA: {GPA}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
