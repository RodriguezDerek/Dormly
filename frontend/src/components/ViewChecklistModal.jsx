import React from 'react';

function ViewChecklistModal({ onClose }) {

    function handleDownload() {
        // Logic to handle file download
        console.log("Download button clicked");
    }

    function handleDelete() {
        // Logic to handle file deletion
        console.log("Delete button clicked");
    }

    return (
       <div className="bg-white rounded-3xl border-2 border-gray-400 p-6 shadow-lg w-[400px]">
            <h1 className="font-bold text-xl mb-4 text-center" style={{ fontFamily: 'K2D, sans-serif' }}>View Uploaded Checklists</h1>

            <ul className="space-y-3">
                <li className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                    <span className="text-gray-800">Dorm_Essentials.pdf</span>
                    <div className="flex gap-3">
                        <button onClick={handleDownload} type="button"><img src="/download.png" className="w-5 h-5 cursor-pointer" alt="Download" /></button>
                        <button onClick={handleDelete} type="button"><img src="/trash.png" className="w-5 h-5 cursor-pointer" alt="Delete" /></button>
                    </div>
                </li>
            </ul>

            <div className="flex justify-center mt-6">
                <button onClick={onClose} className="cursor-pointer bg-purple-700 text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2 hover:bg-purple-800 transition" type="button">Cancel <span className="font-bold text-white">✕</span></button>
            </div>
        </div>
    );
} export default ViewChecklistModal;