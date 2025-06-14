import React from 'react';
import { useState, useEffect } from 'react';

function CreateItemModal( {onClose, checklistTableId} ) {
    const [itemName, setItemName] = useState("");

    function handleInputChange(event) {
        setItemName(event.target.value);
    }

    async function createItem() {
        if(itemName.trim() === "") {
            alert("Item name cannot be empty");
            return;
        }

        try{
          const response = await fetch("http://localhost:8080/api/v1/item/items", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: itemName,
                checklistId: checklistTableId
            }),
          })

          if(response.ok){
            const data = await response.json();
            alert(data.message || "Item created successfully!");
            onClose(); 
            window.location.reload(); 
          }

        } catch(error){
          alert("Failed to create item. Please try again.");
          return;
        }
    }

    return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl p-8 w-60 h-50 shadow-lg flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-center">Create Item</h2>
            <input onChange={handleInputChange} type="text" placeholder="Item name" className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            <div className="flex justify-end gap-4">
              <button onClick={createItem} className="bg-indigo-600 text-white px-3 py-1.5 rounded-md font-semibold hover:bg-indigo-700 transition text-sm">Submit</button>
              <button onClick={onClose} className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md font-semibold hover:bg-gray-300 transition text-sm">Cancel</button>
            </div>
        </div>
      </div>
    </>
  );
}
export default CreateItemModal;
