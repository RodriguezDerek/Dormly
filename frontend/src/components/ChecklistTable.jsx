import React, { useState } from 'react';
import Item from './Item';
import CreateItemModal from './CreateItemModal';

function ChecklistTable ({ checklistID , checklistName, items }){
    const [isAddItemModalOpen, setAddItemModalOpen] = useState(false);
  
    async function handleDeleteChecklist() {
        console.log("Deleting checklist with ID:", checklistID);
        try {
            const response = await fetch(`http://localhost:8080/api/v1/checklist/checklists/${checklistID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(response.ok){
                const data = await response.json();
                alert(data.message || "Checklist deleted successfully!");
                window.location.reload();
            }

        } catch (error) {
            console.error("Error deleting checklist:", error);
        }
    }

    return (
        <>
        <div className="bg-[#e3eff1] p-6 rounded-3xl max-w-5xl w-full mx-auto fade-scale-in">
            {isAddItemModalOpen && <CreateItemModal onClose={() => setAddItemModalOpen(false)} checklistTableId = {checklistID}/>}
            <table className="w-[800px] border-collapse rounded-3xl overflow-hidden">
                <thead>
                    <tr className="bg-white border-b">
                        <th className="text-left font-semibold text-lg px-4 py-3">{checklistName}</th>
                        <th className="text-right px-4 py-3">
                        <button onClick={() => setAddItemModalOpen(true)} className="flex items-center text-black font-semibold cursor-pointer hover:text-blue-600 float-right">
                            <span className="text-xl mr-1">+</span> Add Item
                        </button>
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white h-64">
                    {items && items.length > 0 ? (
                        items.map((item) => (
                            <Item key={item.id} itemName={item.name} itemID={item.id}/>
                        )) 
                    ) : (
                        <tr className="border-b">
                            <td colSpan="2" className="text-center text-gray-500 py-4">No items in this checklist.</td>
                        </tr>
                    )}
                </tbody>

                <tfoot>
                    <tr className="bg-white border-t">
                        <td colSpan="2" className="text-right px-4 py-3">
                        <button onClick={handleDeleteChecklist} className="flex items-center text-black font-semibold cursor-pointer hover:text-red-600">
                            <img src="/trash.png" alt="Delete" className="w-4 h-4 mr-2" />
                            Delete Checklist
                        </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        </>
    );
} export default ChecklistTable;