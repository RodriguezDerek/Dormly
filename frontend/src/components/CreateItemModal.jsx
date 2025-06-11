function CreateItemModal( {onClose} ) {

    // Will Call /api/v1/item/items
    function handleSubmit(event) {
        // Logic to handle item creation
        console.log("Item created", event.target.value);
    }

    return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl p-8 w-80 shadow-lg flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-center">Create Item</h2>
            <input type="text" placeholder="Item name" className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            <div className="flex justify-end gap-4">
                <button onClick={handleSubmit} className="bg-indigo-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
                Submit
                </button>
                <button onClick={onClose} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md font-semibold hover:bg-gray-300 transition">
                Cancel
                </button>
            </div>
        </div>
      </div>
      
    </>
  );
}
export default CreateItemModal;
