// form.js
import React, { useState, useEffect, useCallback } from "react";
import Sectors from "./sectors";
import "./form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sector: [],
    agreeToTerms: false,
  });
  const [editMode, setEditMode] = useState(false);

  const fetchInitialData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://form-test-2b693-default-rtdb.firebaseio.com/UserData.json"
      );
      const data = await response.json();

      // If data exists, update the form state
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  }, []);

  const fetchEditData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://form-test-2b693-default-rtdb.firebaseio.com/UserData.json"
      );
      const data = await response.json();
      if (data && editMode) {
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching edit data:", error);
    }
  }, [editMode]);

  // Fetch initial data when the component mounts
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Handler for form input changes
  // Handler for form input changes
const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  const inputValue = type === 'checkbox' ? checked : value;

  if (name === 'agreeToTerms') {
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  } else {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  }
};


  const handleSectorChange = (selectedOptions) => {
    if (!selectedOptions || !selectedOptions[0] || !selectedOptions[0].value) {
      console.error("Selected options structure is unexpected:", selectedOptions);
      return;
    }

    // Assuming the selectedOptions structure is { value: ..., label: ... }
    const selectedNodes = selectedOptions.map((option) => ({
      label: option.label,
      value: option.value,
    }));

    setFormData({
      ...formData,
      sector: selectedNodes,
    });
  };

  // Handler for form submission
  const submitData = async (e) => {
    e.preventDefault();

    const { name, email, sector, agreeToTerms } = formData;

    // Check if it's an edit (PATCH) or a new submission (POST)
    const method = editMode ? "PATCH" : "POST";

    // Send data to the database
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        sector,
        agreeToTerms,
      }),
    };

    const res = await fetch(
      "https://form-test-2b693-default-rtdb.firebaseio.com/UserData.json",
      options
    );

    console.log(res);

    if (res) {
      fetchEditData();
      setEditMode(true);
      alert(editMode ? "Data updated in Firebase" : "Data sent to Firebase");
    } else {
      alert("Data not sent to Firebase");
    }
  };
  console.log(formData);

  const goBackToForm = () => {
    setEditMode(false);
  };

  return (
    <div className="testbox">
      {editMode ? (
        // Display only the edit button
        <div className="btn-block">
          <button onClick={goBackToForm}>Edit</button>
        </div>
      ) : (
        // Display the form
        <form onSubmit={submitData}>
          <h1>Fill in the form</h1>
          <div className="input-field">
            <input
              required
              autoComplete="off"
              className="input"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label htmlFor="username">Full Name</label>
          </div>
          <div className="input-field">
            <input
              required
              autoComplete="off"
              type="email"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email</label>
          </div>

          {/* Sector Selector */}
          <Sectors
            value={formData.sector}
            onChange={handleSectorChange}
            className="dropdown-select"
            required
          />

          {/* Agree to Terms Checkbox */}
          <div className="checkbox-container">
            <label className="checkbox">
              <input
                id="okayToTerms"
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
              />
            </label>
            <label htmlFor="checkbox" className="checkbox-text">
              Agree to <span>terms</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="btn-block">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
