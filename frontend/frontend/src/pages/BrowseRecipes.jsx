import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BrowseRecipes.css';
import BackButton from '../components/BackButton';

//wyświetlanie spisu przepisów


export default function BrowseRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  //obsługa usuwania przepisu
  const handleDelete = (id) => {
    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
  
    fetch(`http://localhost:5139/api/recipes/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Error with removing recipe');
        
        // 🚫 NIE próbujemy .json() ani .text() przy 204 No Content
        setRecipes(prev => prev.filter(recipe => recipe.id !== id));
        setSuccessMessage('The recipe has been removed');
      })
      .catch(err => {
        console.error(err);
        alert('Somethings wrong with removing recipe');
      });
  };

  //synchronizacja z backendem
  useEffect(() => {
    fetch('http://localhost:5139/api/recipes')
      .then(res => {
        if (!res.ok) throw new Error('Data download error');
        return res.json();
      })
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>⏳ Ładowanie przepisów...</p>;
  if (error) return <p>❌ Błąd: {error}</p>;

  //filtrowanie i sortowanie przepisów
  const filteredRecipes = recipes
  .filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!maxTime || recipe.prepTime <= Number(maxTime))
  )
  .sort((a, b) => {
    if (sortOrder === 'az') return a.name.localeCompare(b.name);
    if (sortOrder === 'za') return b.name.localeCompare(a.name);
    if (sortOrder === 'timeAsc') return a.prepTime - b.prepTime;
    if (sortOrder === 'timeDesc') return b.prepTime - a.prepTime;
    return 0;
  });

  return (
    <div className="recipes">
      <>
        <BackButton />
        {/* reszta */}
      </>
      <h1 id="title" >Your recipes</h1>

          {recipes.length === 0 ? (
            <p>No recipes</p>
          ) : (
          <div>
          <div className="search-controls">
            <input
              type="text"
              placeholder="🔍 Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          
            <input
              type="number"
              placeholder="⏱ max prep time"
              value={maxTime}
              onChange={(e) => setMaxTime(e.target.value)}
            />
          
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="">Sort...</option>
              <option value="az">Name A-Z</option>
              <option value="za">Name Z-A</option>
              <option value="timeAsc">Time asc</option>
              <option value="timeDesc">Time desc</option>
            </select>
            </div>
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipes.map(recipe => (
                <tr key={recipe.id}>
                  <td>{recipe.name}</td>
                  <td className="action-cell">
                    <Link className="action-btn" id="details" to={`/recipe/${recipe.id}`}>Details</Link>
                    <button className="action-btn" id="delete" onClick={() => handleDelete(recipe.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          )}
    </div>
  );
}
