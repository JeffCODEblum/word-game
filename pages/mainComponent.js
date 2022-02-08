import { useState } from 'react';
import axios from 'axios';
import Box from './box.js';

export default function MainComponent() {
    const style = {
        row: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "20px"
        }
    };

    const [input, setInput] = useState('');
    const [turnIndex, setTurnIndex] = useState(0);
    const [winState, setWinState] = useState(0);
    const [results, setResults] = useState([
        {
            value: '',
            results: [0, 0, 0, 0, 0]
        },
        {
            value: '',
            results: [0, 0, 0, 0, 0]
        },
        {
            value: '',
            results: [0, 0, 0, 0, 0]
        },
        {
            value: '',
            results: [0, 0, 0, 0, 0]
        },
        {
            value: '',
            results: [0, 0, 0, 0, 0]
        }
    ]);

    const handleChange = (e) => {
        if (turnIndex >= 0 && turnIndex < results.length) {
            setInput(e.target.value);
            const newResults = [...results];
            newResults[turnIndex].value = e.target.value;
        }
    };

    const handleSubmit = async () => {
        if (turnIndex >= 5 || !input || input.length !== 5) {
            return;
        }
        const response = await axios.post('api/check', { guess: input });
        setInput('');
        setTurnIndex(response.data.gameState.turnIndex + 1);
        setResults(response.data.gameState.results);

        console.log(response.data);

        if (response.data.gameState.state === 1) {
            setWinState(1);
        } else if (response.data.gameState.state === 2) {
            setWinState(2);
        }
    };

    return (
        <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '550px', marginTop: '20px', marginBottom: '20px' }}>
            {
                (winState === 1 || winState === 2) && (
                    <div style={{textAlign: 'center', backgroundColor: '#fff', height: '200px'}}>
                        <h1>YOU {winState === 2 ? 'WIN' : 'LOSE'}</h1>
                    </div>
                )
            }
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'space-around' }}>
                {
                    results.map((row, i) => (
                        <div key={`${i}-row`} style={style.row}>
                            {
                                row.results.map((result, j) => (
                                    <Box key={`${j}-box`} value={row.value[j]} result={result} />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <input maxLength={5} value={input} onChange={handleChange} style={{ marginRight: '10px', padding: '5px' }} />
                <button onClick={handleSubmit} style={{padding: '5px'}}>Enter</button>
            </div>
        </div>
    )
}
