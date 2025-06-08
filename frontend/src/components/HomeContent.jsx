
function HomeContent() {
  return (
    <div className="flex justify-evenly items-center p-26 bg-gray-100 custom-bg-color">
        <div className="w-150 text-left">
            <h1 className="text-5xl font-bold w-120" style={{ fontFamily: 'K2D, sans-serif' }}>Simplify your <span style={{ color: '#7E2F8C' }}>daily</span> <span style={{ color: '#F15A24' }}>routine</span> and stay connected on campus.</h1>
            <p className="text-gray-500 w-118 pt-2 pb-6" style={{ fontFamily: 'K2D, sans-serif' }}>Dormly helps you stay on top of dorm life—from dining hall menus to roommate schedules and essentials. Whether you're new to campus or settling back in, Dormly keeps things simple, smart, and stress-free.</p>
            <a href="/checklists" className="get-started-btn" style={{ fontFamily: 'K2D, sans-serif' }}>Get Started</a>      
        </div>

      <img src="./school_items.png" alt="school items" className="w-120 h-75"/>
    </div>
  );
} export default HomeContent;