import React, { useState, useEffect } from "react";
import "./App.css";
import ScorersTable from "./components/ScorersTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function loadPlayers() {
            const querySnapshot = await getDocs(collection(db, "players"));
            const playersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(), // Extraire les champs 'goalNumber' et 'playerName' pour chaque document
            }));
            setPlayers(playersData);
        }

        loadPlayers();
    }, []);

    return (
        <div className="App">
            <h1>Bayern de Monique</h1>
            <h2>Saison 2024-2025</h2>
            <ScorersTable players={players} />
            <SpeedInsights />
        </div>
    );
}

export default App;
