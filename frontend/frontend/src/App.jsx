import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BrowseRecipes from './pages/BrowseRecipes';
import CreateRecipe from './pages/CreateRecipe';
import Inspire from './pages/Inspire';
import React from 'react';
import RecipeDetails from './pages/RecipeDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseRecipes />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/inspire" element={<Inspire />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;