import React from 'react';

function ViewChecklistModal({ onClose, files }) {

  // Will Call /api/v1/aws/download
  async function handleDownload(fileKey) {
    if(fileKey == "" || fileKey == null) {
      alert("File key is empty or null. Please select a valid file.");
      return;
    }

    try{
      const response = await fetch(`http://localhost:8080/api/v1/aws/download?key=${encodeURIComponent(fileKey)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error downloading file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; 
      a.download = fileKey; 
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); 
    } catch (error) {
      alert("Error downloading file: " + error.message);
    }
  }

  // Will Call /api/v1/aws/delete
  async function handleDelete(fileKey) {
    if(fileKey == "" || fileKey == null) {
      alert("File key is empty or null. Please select a valid file.");
      return;
    }

    try{
      const response = await fetch(`http://localhost:8080/api/v1/aws/delete?key=${encodeURIComponent(fileKey)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting file: ${response.statusText}`);
      }

      alert("File deleted successfully!");
      window.location.reload();
    } catch (error) {
      alert("Error downloading file: " + error.message);
    }
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-400 p-6 shadow-lg w-full max-w-2xl mx-4 sm:mx-auto" style={{ fontFamily: 'K2D, sans-serif' }}>
        <h1 className="font-bold text-xl mb-4 text-center">View Uploaded Checklists</h1>
        
        <ul className="space-y-3">
            {files && files.map((file, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                    <span className="text-gray-800 text-sm pr-4">{file}</span>
                    
                    <div className="flex gap-3">
                        <button onClick={() => handleDownload(file)} type="button">
                        <img src="/download.png" className="w-5 h-5 cursor-pointer" alt="Download" />
                        </button>
                        <button onClick={() => handleDelete(file)} type="button">
                        <img src="/trash.png" className="w-6 h-5 cursor-pointer" alt="Delete" />
                        </button>
                    </div>
                </li>
            ))}
            {(!files || files.length === 0) && (
                <li className="text-gray-500 text-center">No checklists uploaded yet.</li>
            )}
        </ul>

      <div className="flex justify-center mt-6">
        <button onClick={onClose} className="cursor-pointer bg-purple-700 text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2 hover:bg-purple-800 transition" type="button">Cancel <span className="font-bold text-white">✕</span></button>
      </div>

    </div>
  );
}

export default ViewChecklistModal;
