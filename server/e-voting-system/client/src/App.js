import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState('');

    // Fetch candidates when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/candidates')
            .then(response => {
                setCandidates(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    // Handle voting
    const handleVote = () => {
        if (selectedCandidate) {
            axios.post('http://localhost:5000/vote', { candidate: selectedCandidate })
                .then(response => alert(response.data.message))
                .catch(error => alert(error.response.data.message));
        } else {
            alert('Please select a candidate to vote for.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>E-Voting System</h1>
            <div>
                {candidates.map((candidate, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={candidate.candidate}
                            name="candidate"
                            value={candidate.candidate}
                            onChange={(e) => setSelectedCandidate(e.target.value)}
                        />
                        <label htmlFor={candidate.candidate}>{candidate.candidate}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleVote}>Vote</button>
        </div>
    );
};

export default App;
