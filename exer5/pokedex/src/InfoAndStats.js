import { useState } from 'react';

export const InfoAndStats = ({ data }) => {
    const[showInfo, setShowInfo] = useState(true);
    const[showMoves, setShowMoves] = useState(false);

    const renderInfoText = () => {
        const properties = ["height", "weight", "hp", "attack", "defense", "special-attack", "special-defense", "speed"];
        let values = [];
        if (data.height && data.weight) {
            values = [data.height / 10 + "m", data.weight / 10 + "kg"];
        }
        if (data.stats) {
            for (let i = 0; i < data.stats.length; i++) {
                values.push(data.stats[i].base_stat);
            }
        }
        const propertyAndValues = properties.map(((currentProperty, index) => {
            return (properties[index] + ": " + values[index]);
        }))
        return propertyAndValues.map((current, index) => (
            <div key={current} style={{ marginTop: index === 0 ? '20px' : '0' }}>
              <p className="statString">{current}</p>
            </div>
        ))
    }

    const renderInfo = (
            <div className="totalInfoMovesContainer">
                <p className="secondHalfTitle">Info</p>
                <div className="infoMovesBox">
                    { data && renderInfoText() }
                </div>
            </div>
    );

    const renderMovesText = () => {
        if (data && data.moves) {
            return (
                data.moves.map((currentMoveObject, index) => (
                <div key={index} style={{ marginTop: index === 0 ? '20px' : '0', marginBottom: index === (currentMoveObject.length - 1) ? '20px' : '0' }}>
                    <p className="statString">{currentMoveObject.move.name}</p>
                </div>
                ))
            );
        } else {
            return null;
        }
    };
    
    const renderMoves = (
        <div className="totalInfoMovesContainer">
            <p className="secondHalfTitle">Moves</p>
            <div className="infoMovesBox">
                { data && renderMovesText() }
            </div>
        </div>
    );

    return (
        <div id="secondHalf">
            {showInfo && renderInfo}
            {showMoves && renderMoves}
            <div id="infoMovesButtonsContainer">
                <button style={{ backgroundColor: !showInfo ? 'rgb(230, 230, 230)' : 'rgb(52, 235, 82)' }} id="infoButton" onClick={() => {setShowInfo(true); setShowMoves(false);} }>Info</button>
                <button style={{ backgroundColor: showInfo ? 'rgb(230, 230, 230)' : 'rgb(52, 235, 82)' }} id="movesButton" onClick={() => {setShowInfo(false); setShowMoves(true);} }>Moves</button>
            </div>
        </div>
    );
}