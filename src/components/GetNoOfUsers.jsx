import React, { useState } from "react";

/**
 * GetNoOfUsers Component
 * 
 * Allows players to set the number of participants for the game.
 * Validates input and transitions to the guessing phase.
 * 
 * @param {Function} onSetNumberOfUsers - Callback to set the number of users
 * @returns {JSX.Element} Form to input number of players
 */
const GetNoOfUsers = ({ onSetNumberOfUsers }) => {
  const [noOfUsers, setNoOfUsers] = useState(1);

  /**
   * Handles form submission and validates the number of users
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (noOfUsers > 0) {
      onSetNumberOfUsers(parseInt(noOfUsers));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 p-6 gap-4 rounded-md">
      <h2 className="text-xl font-bold">How many players?</h2>
      
      {/* Form to collect number of players */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <input
          type="number"
          min="1"
          max="10"
          placeholder="Enter number of players"
          value={noOfUsers}
          onChange={(e) => setNoOfUsers(e.target.value)}
          className="bg-white p-3 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default GetNoOfUsers;
