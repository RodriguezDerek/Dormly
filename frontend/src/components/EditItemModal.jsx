import React, { useState } from "react";

function EditItemModal({ onClose, itemID }) {
    const [newItemName, setNewItemName] = useState("");

    function handleUpdateItemName(event) {
        setNewItemName(event.target.value);
    }

    async function updateItem() {
        if(newItemName.trim() === "") {
            alert("Item name cannot be empty.");
            return;
        }
        try{
            const respone = await fetch(`http://localhost:8080/api/v1/item/items/${itemID}?name=${newItemName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: null,
            })

            if(respone.ok) {
                const data = await respone.json();
                alert(data.message || "Item updated successfully!");
                window.location.reload();
            }

        } catch (error) {
            alert("Error updating item: " + error.message);
        }
    }

    return (
        <tr className="fixed inset-0 flex justify-center items-center z-50">
            <td className="bg-white rounded-xl p-8 w-60 h-50 shadow-lg flex flex-col gap-6">
                <h2 className="text-xl font-semibold text-center">Edit Item</h2>
                <input value={newItemName} onChange={handleUpdateItemName} type="text" placeholder="Item name" className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                <div className="flex justify-end gap-4">
                <button onClick={updateItem} className="bg-indigo-600 text-white px-3 py-1.5 rounded-md font-semibold hover:bg-indigo-700 transition text-sm">Submit</button>
                <button onClick={onClose} className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md font-semibold hover:bg-gray-300 transition text-sm">Cancel</button>
                </div>
            </td>
        </tr>
    );
} export default EditItemModal;