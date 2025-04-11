import React, { useState } from 'react';
import './Inspire.css'; 
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';


//wyszukiwanie danych z api

export default function Inspire() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  //obsługa dodawania przepisu
  const handleAdd = (recipe) => {
    const newRecipe = {
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions   || "No directions",
      prepTime: recipe.prepTime,
      vegan: false
    };
  
    fetch('http://localhost:5139/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error with adding recipe');
        alert('The recipe has been added');
      })
      .catch(err => alert('Error: ' + err.message));
  };
  

//obsługa przeszukiwania danych z API
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`http://localhost:5139/api/externalrecipes?query=${query}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setResults(data);
        setLoading(false);
      })
      .catch(err => {
        alert('Error with downloading API data');
        setLoading(false);
      });
  };

  return (
    <div className="inspire-wrapper">
      <>
        <BackButton />
      </>
      <h1 className="inspire-title">Get inspired!</h1>
    
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          value={query}
          placeholder="Write dish name"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" type="submit">Search</button>
      </form>
    
      {loading && <p className="loading-text">⏳ Searching for recipes...</p>}
    
      <ul className="results-list">
        {results.map(recipe => (
          <li key={recipe.id} className="result-card">
            <h3>{recipe.name}</h3>
            {recipe.image && (
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            )}
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Directions:</strong> {recipe.instructions || 'Brak instrukcji'}</p>
            <p><strong>Preperation time (min):</strong> {recipe.prepTime} min</p>
            <p><strong>Vegan:</strong> {recipe.vegan ? 'Yes' : 'No'}</p>
            <button className="add-button" onClick={() => handleAdd(recipe)}>Add to my cookbook</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
