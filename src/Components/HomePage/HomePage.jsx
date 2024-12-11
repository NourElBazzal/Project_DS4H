import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [data, setData] = useState(null); // Etat pour stocker les données récupérées
  const [loading, setLoading] = useState(true); // Etat pour gérer le chargement

  // Fonction pour récupérer les données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel à l'API pour récupérer les données du noeud courant
        const response = await axios.get('http://dronic.i3s.unice.fr:8080/?username=user&password=test');
        setData(response.data); // Stocke les données récupérées dans le state
        setLoading(false); // Le chargement est terminé
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false); // Le chargement est terminé, mais il y a une erreur
      }
    };

    fetchData();
  }, []); // Le tableau vide signifie que cet effet s'exécute une seule fois au chargement du composant

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (!data) {
    return <div>Erreur: Les données sont nulles.</div>;
  }

  return (
      <div className="home-page">
        <h1>Vue du Noeud Courant</h1>
        <h2>ID: {data.id}</h2>

        <h3>Vues Disponibles:</h3>
        <ul>
          {data.views.map((view, index) => (
              <li key={index}>
                <strong>{view.name}</strong>: {view.contentType}
                {view.content && (
                    <pre>{JSON.stringify(view.content, null, 2)}</pre> // Affiche le contenu de la vue si disponible
                )}
              </li>
          ))}
        </ul>
      </div>
  );
};

export default HomePage;