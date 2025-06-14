import React, { useState } from 'react';
import EditItemModal from './EditItemModal';

function Item({ itemName, itemID}) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  async function handleDeleteItem() {
    try{
      const response = await fetch(`http://localhost:8080/api/v1/item/items/${itemID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Item deleted successfully!");
        window.location.reload();
      } 

    } catch (error) {
      alert("Error deleting item: " + error.message);
    }
  }
  
  return (
    <>
    {isEditModalOpen && <EditItemModal onClose={() => setEditModalOpen(false)} itemID={itemID} />}
    
    <tr className="border-b">
      <td colSpan="2" className="px-4 py-2">
        <div className="flex items-center justify-between w-full">
          <span className="w-3 h-3 bg-orange-500 rounded mr-3"></span>

          <span className="flex-1 text-gray-900 text-sm">{itemName}</span>

          <div className="flex gap-2">
            <button onClick={() => setEditModalOpen(true)} className="bg-orange-500 p-2 rounded-lg cursor-pointer">
              <img src="/edit.png" alt="Edit" className="w-4 h-4" />
            </button>

            <button onClick={handleDeleteItem} className="bg-purple-700 p-2 rounded-lg cursor-pointer">
              <img src="/trash.png" alt="Delete" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </td>
    </tr>
    </>
  );
}

export default Item;
