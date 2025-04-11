import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';


//szczegóły przepisu i możliwość edycji



// wyświetla szczegóły przepisu i pozwala na edytowanie go
export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
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

// zatwierdza zmiany w przepisie i przesyła je
const handleSubmit = (e) => {
  e.preventDefault();

  fetch(`http://localhost:5139/api/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(res => {
      if (!res.ok) throw new Error('Saving error');
      alert('The recipe has been updated');
    })
    .catch(err => alert('Error: ' + err.message));
};

//synchronizacja z backendem
  useEffect(() => {
    fetch(`http://localhost:5139/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setFormData({
            name: data.name,
            ingredients: data.ingredients,
            instructions: data.instructions,
            prepTime: data.prepTime,
            vegan: data.vegan
          });
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>⏳ Loading...</p>;
  if (!recipe) return <p>No recipe</p>;

  return (
    <div className="recipe-details">
      <>
        <BackButton />
      </>

      <h1>{recipe.name}</h1>

      <div className="recipe-info">
        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
        <p><strong>Directions:</strong> {recipe.instructions}</p>
        <p><strong>Preperation time:</strong> {recipe.prepTime} min</p>
        <p><strong>Vegan:</strong> {recipe.vegan ? 'Yes' : 'No'}</p>
        <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
      </div>

      {editMode && (
        <div className="edit-form">
          <form onSubmit={handleSubmit}>
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
            <button className="submit-btn" type="submit">Save changes</button>
          </form>
        </div>
      )}
    </div>
  );
}
