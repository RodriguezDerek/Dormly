import React, { useState } from 'react';
import Item from './Item';
import CreateItemModal from './CreateItemModal';

function ChecklistTable ({ checklistName, items }){
    const [isAddItemModalOpen, setAddItemModalOpen] = useState(false);

    function handleAddItem() {
        // Logic to add a new item to the checklist
        setAddItemModalOpen(true);
        console.log("Add Item clicked");
    }
 
    function handleDeleteChecklist() {
        // Logic to delete the checklist
        console.log("Delete Checklist clicked");
    }

    return (
        <>
        {isAddItemModalOpen && <CreateItemModal onClose={() => setAddItemModalOpen(false)} />}

        <div className="bg-[#e3eff1] p-6 rounded-3xl max-w-5xl w-full mx-auto fade-scale-in">
            <table className="w-full border-collapse rounded-3xl overflow-hidden">
                <thead>
                    <tr className="bg-white border-b">
                        <th className="text-left font-semibold text-lg px-4 py-3">{checklistName}</th>
                        <th className="text-right px-4 py-3">
                        <button onClick={handleAddItem} className="flex items-center text-black font-semibold cursor-pointer hover:text-blue-600 float-right">
                            <span className="text-xl mr-1">+</span> Add Item
                        </button>
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white h-64">
                    {items && items.length > 0 ? (
                        items.map((item, index) => (
                            <Item key={index} itemName={item} />
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