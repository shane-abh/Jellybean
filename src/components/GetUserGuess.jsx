import React, { useState } from 'react'

/**
 * GetUserGuess Component
 * 
 * Collects individual player guesses with name and number.
 * Handles form validation and submission for each player.
 * 
 * @param {Function} handleSubmit - Callback to submit the user's guess
 * @param {Function} handleReset - Callback to reset the entire game
 * @param {boolean} isLastUser - Whether this is the final player
 * @returns {JSX.Element} Form to collect player name and guess
 */
const GetUserGuess = ({handleSubmit, handleReset, isLastUser = false}) => {
    const [name, setName] = useState("");
    const [guessNumber, setGuessNumber] = useState(0);

    /**
     * Handles form submission with validation
     * @param {Event} e - Form submit event
     */
    const getUserGuess = (e) => {
        e.preventDefault();
        if (name.trim() && guessNumber > 0) {
            handleSubmit({name: name.trim(), guessNumber:parseInt(guessNumber)});
            // Clear form after successful submission
            setName("");
            setGuessNumber(0);
        }
    }

    /**
     * Handles game reset and clears the form
     */
    const handleResetClick = () => {
        handleReset();
        setName("");
        setGuessNumber(0);
    }
  return (
    <form className="flex flex-col justify-center items-center bg-gray-200 p-4 gap-2 rounded-md">
      {/* Player name input */}
      <input
        type="text"
        className="bg-white p-2 rounded-md"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      {/* Guess number input */}
      <input
        type="number"
        min="1"
        max="10"
        className="bg-white p-2 rounded-md"
        placeholder="Enter your Guess Number"
        value={guessNumber}
        onChange={(e) => setGuessNumber(e.target.value)}
      />
      
      {/* Submit button with dynamic text */}
      <input
        type="submit"
        onClick={(e) => {
          getUserGuess(e);
        }}
        value={isLastUser ? "Submit Final Guess" : "Submit Guess"}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
      />

      {/* Reset game button */}
      <button
        type="button"
        onClick={handleResetClick}
        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
      >
        Reset Game
      </button>
    </form>
  )
}

export default GetUserGuess