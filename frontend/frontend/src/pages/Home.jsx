import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


//stona główna


// wyświetlanie głównego panelu z przekierowaniami
export default function Home() {
  return (
    <div className="home">
      <div className="start">
        <h1>Cook Book</h1>
        <div className="veggies">
          <img src="/public/pumpkin.png" alt="kuchnia" className="home-image" id="pumpkin" />
          <img src="/public/tomato.png" alt="kuchnia" className="home-image" id="tomato"/>
          <img src="/public/eggplant.png" alt="kuchnia" className="home-image" id="eggplant"/>
        </div>
      </div>
      <div className="tiles">
        <Link className="tile" to="/browse">Your recipes 📖</Link>
        <Link className="tile" to="/create">Create recipe ➕</Link>
        <Link className="tile" to="/inspire">Get inspired ✨</Link>
      </div>
    </div>
  );
}
