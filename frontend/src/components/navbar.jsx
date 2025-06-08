
function Navbar() {
  return (
        <nav className="bg-[#E0ECEF] p-4 w-full h-20 flex items-center justify-between">
            <div className="flex items-center">
                <img src="/logo.png" alt="Logo" className="h-12 w-12 mr-4" />
                <h1 style={{ fontFamily: 'K2D, sans-serif' }} className="text-2xl font-bold text-gray-800">Dormly</h1>
            </div>

            <ul className="flex gap-20 absolute left-1/2 transform -translate-x-1/2">
                <li><a href="/home" style={{ fontFamily: 'K2D, sans-serif' }} className="text-gray-800 font-bold nav-link">Home</a></li>
                <li><a href="/checklists" style={{ fontFamily: 'K2D, sans-serif' }} className="text-gray-800 font-bold nav-link">Checklists</a></li>
            </ul>
        </nav>
  );
} export default Navbar;