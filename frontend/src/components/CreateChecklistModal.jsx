import React, { useState } from 'react';

function CreateChecklistModal({ onClose }) {
  const [checklistName, setChecklistName] = useState(""); 

  async function handleCreateChecklist() {
    try {
      if(checklistName.trim() === "") {
        alert("Please enter a checklist name.");
        return;
      }
    
    const response = await fetch("http://localhost:8080/api/v1/checklist/checklists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: checklistName }),
    });

    if(response.ok){
      const data = await response.json();
      console.log("Checklist created successfully:", data);
      alert(data.message || "Checklist created successfully!");
      window.location.reload();
    }

    } catch (error) {
      console.error("Error creating checklist:", error);
    }
  }
  
  function handleInputChange(event) {
    setChecklistName(event.target.value);
  }
  
  return (
    <div className="bg-white rounded-3xl border-2 border-gray-400 p-6 shadow-lg w-full max-w-md mx-4 sm:mx-auto">
        <h1 className="text-center text-xl font-bold mb-6 font-[K2D]">Create New Checklist</h1>
        
        <div className="mb-6">

            <h2 className="text-sm font-semibold text-gray-700 mb-2">Checklist Name</h2>
            <div className="flex gap-2">
                <input value={checklistName} onChange={handleInputChange} type="text" placeholder="Enter checklist name" className="border-2 border-gray-300 rounded-lg p-2 w-full"/>
            </div>
        
        </div>
        
        <div className="flex justify-between">
            <button onClick={handleCreateChecklist} type="button" className="bg-[#F15A24] text-white px-5 py-2 mr-4 rounded-full hover:bg-orange-700 transition cursor-pointer">Create →</button>
            <button onClick={onClose} type="button" className="bg-purple-700 text-white px-5 py-2 rounded-full hover:bg-purple-800 transition cursor-pointer">Cancel ✕</button>
        
        </div>
    </div>
  );
}

export default CreateChecklistModal;
