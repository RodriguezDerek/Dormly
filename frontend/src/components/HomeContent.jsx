
function HomeContent() {
  
  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center p-8 md:p-26 bg-gray-100 custom-bg-color gap-10 md:gap-0">
          <div className="w-full md:w-150 text-center md:text-left px-4 md:px-0 fade-scale-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-xl mx-auto md:mx-0" style={{ fontFamily: 'K2D, sans-serif' }}>Simplify your <span style={{ color: '#7E2F8C' }}>daily</span> <span style={{ color: '#F15A24' }}>routine</span> and stay connected on campus.</h1>
              <p className="text-gray-500 max-w-lg mx-auto md:mx-0 pt-2 pb-6 text-base sm:text-lg" style={{ fontFamily: 'K2D, sans-serif' }}>Dormly helps you stay on top of dorm life—from dining hall menus to roommate schedules and essentials. Whether you're new to campus or settling back in, Dormly keeps things simple, smart, and stress-free.</p>
              <a href="/checklists" className="get-started-btn inline-block mx-auto md:mx-0" style={{ fontFamily: 'K2D, sans-serif' }}>Get Started</a>
          </div>

          <img src="./school_items.png" alt="school items" className="w-full max-w-md h-auto object-contain fade-scale-in"/>
    </div>
  );
}
export default HomeContent;
