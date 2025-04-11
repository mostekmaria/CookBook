import React, { useState } from 'react';
import './CreateRecipe.css';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';


//tworzenie nowego przepisu


export default function CreateRecipe() {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    prepTime: 0,
    vegan: false
  });

//przypisuje nowe wartości przepisu
const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  //obsługa zapisu nowego przepisu
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5139/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error with adding recipe');
        alert('The recipe has been added');
      })
      .catch(err => alert('Error: ' + err.message));
  };

  return (
    <div className="form-wrapper">
        <BackButton />
      <h1>Add recipe</h1>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <label>Recipe name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <label>Ingredients:</label>
        <textarea
          value={formData.ingredients}
          onChange={(e) => handleChange('ingredients', e.target.value)}
        />

        <label>Directions:</label>
        <textarea
          value={formData.instructions}
          onChange={(e) => handleChange('instructions', e.target.value)}
        />

        <label>Preperation time (min):</label>
        <input
          type="number"
          value={formData.prepTime}
          onChange={(e) => handleChange('prepTime', e.target.value)}
        />

        <label>Vegan:</label><br />
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="isVegan"
                  value="true"
                  checked={formData.vegan === true}
                  onChange={() => setFormData(prev => ({ ...prev, vegan: true }))}
                />
                Yes
              </label>

              <label style={{ marginLeft: '1rem' }}>
                <input
                  type="radio"
                  name="isVegan"
                  value="false"
                  checked={formData.vegan === false}
                  onChange={() => setFormData(prev => ({ ...prev, vegan: false }))}
                />
                No
              </label>
              </div>

        <button type="submit" className="submit-btn">Save recipe</button>
      </form>
    </div>
  );
}
