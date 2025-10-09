/**
 * JellybeanDisplay Component
 * 
 * Displays a visual representation of jellybeans using gradient circles.
 * Each circle has a unique gradient color and smooth animations.
 * 
 * @param {number} count - Number of jellybeans to display
 * @param {boolean} showNumber - Whether to show the count number below the display
 * @returns {JSX.Element} Visual display of jellybeans as gradient circles
 */
const JellybeanDisplay = ({ count, showNumber = false }) => {
  const jellybeans = [];
  
  // Array of beautiful gradient colors that cycle through
  const gradientColors = [
    'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-gradient-to-br from-purple-400 to-purple-600', 
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-red-400 to-red-600',
    'bg-gradient-to-br from-indigo-400 to-indigo-600',
    'bg-gradient-to-br from-teal-400 to-teal-600',
    'bg-gradient-to-br from-orange-400 to-orange-600',
    'bg-gradient-to-br from-cyan-400 to-cyan-600'
  ];

  // Create individual jellybean circles
  for (let i = 0; i < count; i++) {
    // Cycle through gradient colors
    const gradientClass = gradientColors[i % gradientColors.length];
    jellybeans.push(
      <div 
        key={i} 
        className={`w-8 h-8 rounded-full ${gradientClass} shadow-lg hover:scale-110 transition-transform duration-200 mx-1 gradient-circle`}
        style={{
          animationDelay: `${i * 0.1}s` // Staggered animation for wave effect
        }}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Container for jellybean circles with gradient background */}
      <div className="flex flex-wrap justify-center items-center min-h-[80px] p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 shadow-inner">
        {jellybeans}
      </div>
      
      {/* Optional count display */}
      {showNumber && (
        <p className="text-sm text-gray-600 font-mono bg-white px-3 py-1 rounded-full shadow-sm">
          Count: {count}
        </p>
      )}
    </div>
  );
};

export default JellybeanDisplay;
