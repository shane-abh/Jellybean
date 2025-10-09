import { useState } from "react";

import "./App.css";
import GetUserGuess from "./components/GetUserGuess";
import GetNoOfUsers from "./components/GetNoOfUsers";
import JellybeanDisplay from "./components/JellybeanDisplay";

/**
 * Multi-User Jellybean Guessing Game
 * 
 * A React game where multiple players guess how many jellybeans are displayed.
 * The player with the closest guess wins!
 * 
 * Game Flow:
 * 1. Setup: Players enter how many people will play
 * 2. Guessing: Each player takes turns guessing
 * 3. Results: Shows winner and all guesses
 */

/**
 * Generates a random number between 1 and 10 for the target jellybean count
 * @returns {number} Random number between 1-10
 */
const generateTargetRandomNumber = () => {
  return Math.floor(Math.random() * 10) + 1;
};

function App() {
  // State management for the game
  const [targetRandomNumber, setTargetRandomNumber] = useState(
    () => generateTargetRandomNumber()
  );
  const [gamePhase, setGamePhase] = useState('setup'); // 'setup', 'guessing', 'results'
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [userGuesses, setUserGuesses] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  /**
   * Handles setting the number of players and transitioning to guessing phase
   * @param {number} count - Number of players
   */
  const handleSetNumberOfUsers = (count) => {
    setNumberOfUsers(count);
    setGamePhase('guessing');
    setUserGuesses([]);
    setCurrentUserIndex(0);
  };

  /**
   * Handles a user's guess submission
   * @param {Object} userGuess - Object containing {name, guessNumber}
   */
  const handleUserGuess = (userGuess) => {
    const newGuesses = [...userGuesses, userGuess];
    setUserGuesses(newGuesses);
    
    if (currentUserIndex < numberOfUsers - 1) {
      // Move to next user
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      // All users have guessed, show results
      setGamePhase('results');
    }
  };

  /**
   * Finds the winner by calculating which guess is closest to the target number
   * @returns {Object|null} The winning guess object or null if no guesses
   */
  const findWinner = () => {
    if (userGuesses.length === 0) return null;
    
    let closestGuess = userGuesses[0];
    let minDifference = Math.abs(userGuesses[0].guessNumber - targetRandomNumber);
    
    // Compare each guess to find the closest one
    for (let i = 1; i < userGuesses.length; i++) {
      const difference = Math.abs(userGuesses[i].guessNumber - targetRandomNumber);
      if (difference < minDifference) {
        minDifference = difference;
        closestGuess = userGuesses[i];
      }
    }
    
    return closestGuess;
  };

  /**
   * Resets the game to initial state with a new target number
   */
  const handleReset = () => {
    setTargetRandomNumber(generateTargetRandomNumber());
    setGamePhase('setup');
    setNumberOfUsers(0);
    setUserGuesses([]);
    setCurrentUserIndex(0);
  };

  /**
   * Renders the appropriate UI based on the current game phase
   * @returns {JSX.Element} The UI for the current game phase
   */
  const renderGamePhase = () => {
    switch (gamePhase) {
      case 'setup':
        // Show player count setup form
        return <GetNoOfUsers onSetNumberOfUsers={handleSetNumberOfUsers} />;
      
      case 'guessing':
        // Show guessing form for current player
        return (
          <div className="flex flex-col items-center gap-4">
            <h2>User {currentUserIndex + 1} of {numberOfUsers}</h2>
            <GetUserGuess 
              handleSubmit={handleUserGuess} 
              handleReset={handleReset}
              isLastUser={currentUserIndex === numberOfUsers - 1}
            />
          </div>
        );
      
      case 'results': {
        // Show game results with winner and all guesses
        const winner = findWinner();
        return (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">Game Results</h2>
            
            {/* Target display and winner announcement */}
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="text-lg font-bold mb-2">Target Jellybeans:</h3>
              <JellybeanDisplay count={targetRandomNumber} showNumber={true} />
              <p className="text-lg font-bold text-green-600 mt-3">
                🏆 Winner: {winner ? winner.name : 'No winner'} 
                {winner && ` (Guessed: ${winner.guessNumber})`}
              </p>
            </div>
            
            {/* All player guesses with visual comparison */}
            <div className="bg-gray-50 p-4 rounded-md w-full max-w-md">
              <h3 className="font-bold mb-3 text-center">All Guesses:</h3>
              <div className="space-y-3">
                {userGuesses.map((guess, index) => (
                  <div key={index} className={`p-3 rounded-md border-2 ${
                    winner && guess.name === winner.name 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{guess.name}</span>
                      <span className="text-sm text-gray-600">
                        Difference: {Math.abs(guess.guessNumber - targetRandomNumber)}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <JellybeanDisplay count={guess.guessNumber} showNumber={false} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Play again button */}
            <button
              onClick={handleReset}
              className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        );
      }
      
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Jellybean Guessing Game</h1>
        
        {/* Show target jellybeans during guessing and results phases */}
        {gamePhase !== 'setup' && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-center">Target Jellybeans:</h2>
            <JellybeanDisplay count={targetRandomNumber} showNumber={false} />
          </div>
        )}
        
        {/* Render the current game phase UI */}
        {renderGamePhase()}
      </div>
    </>
  );
}

export default App;
