import React from 'react';

function Item({ itemName }) {
  return (
    
    <tr className="border-b">
      <td colSpan="2" className="px-4 py-2">
        <div className="flex items-center justify-between w-full">
          <span className="w-3 h-3 bg-orange-500 rounded mr-3"></span>

          <span className="flex-1 text-gray-900 text-sm">{itemName}</span>

          <div className="flex gap-2">
            <button className="bg-orange-500 p-2 rounded-lg">
              <img src="/edit.png" alt="Edit" className="w-4 h-4" />
            </button>

            <button className="bg-purple-700 p-2 rounded-lg">
              <img src="/trash.png" alt="Delete" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Item;
