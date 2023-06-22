import React, { useState } from "react";
import axios from "axios";

function AssessmentForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [justification, setJustification] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assessmentData = {
      question,
      options,
      justification,
    };

    try {
      const response = await axios.post("/api/assessment", assessmentData);
      console.log(response.data);
      // Reset form fields
      setQuestion("");
      setOptions(["", "", "", ""]);
      setJustification("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Assessment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}
        </div>
        <div>
          <label>Justification:</label>
          <textarea
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AssessmentForm;
