import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: 'absolute',      // 📌 absolutne pozycjonowanie
        top: '1rem',               // 📌 odległość od góry
        left: '1rem',              // 📌 odległość od lewej
        padding: '0.5rem 1rem',
        fontSize: '3rem',
        backgroundColor: 'rgb(255, 208, 177)',
        border: '1px solid rgb(255, 208, 177)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: '"Leckerli One", cursive',
        fontWeight: '400',
        fontStyle: 'normal',
        zIndex: 1000               // 🔝 żeby był ponad innymi elementami
      }}
    >
      back
    </button>
  );
}
