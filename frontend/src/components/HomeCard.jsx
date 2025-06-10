
function HomeCard() {
    return (
      <div className="bg-white w-full max-w-md h-auto grid grid-cols-[auto_1fr] gap-6 items-center p-4 rounded-lg fade-scale-in">
        
        <div className="bg-[#461ABF] p-4 rounded-lg flex items-center justify-center">
            <img src="/checklist.webp" alt="checklist icon" className="w-16 h-16 sm:w-32 sm:h-32" />
        </div>
        
        <div className="grid gap-2" style={{ fontFamily: 'K2D, sans-serif' }}>
            <h2 className="text-xl sm:text-2xl font-bold">Smart Dorm Checklist</h2>
            <p className="text-gray-500 text-xs sm:text-sm">Keep track of what to pack and what to do. Customize your checklist and check off tasks as you go. Never forget a dorm essential again—stay ready from day one.</p>
            <a href="/checklists" className="bg-[#F15A24] text-white text-sm sm:text-md font-semibold px-4 sm:px-5 py-2 rounded-full shadow-md transition-all duration-300 hover:bg-[#C64A4B] active:bg-[#7E2F8C] inline-block w-24 sm:w-30 h-8 sm:h-10 text-center">Start Now</a>
        </div>

      </div>
    );
  }
  export default HomeCard;
  