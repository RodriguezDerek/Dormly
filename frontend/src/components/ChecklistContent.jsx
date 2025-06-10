import { useState } from "react";
import ViewChecklistModal from "./ViewChecklistModal";
import UploadChecklistModal from "./UploadChecklistModal";
import CreateChecklistModal from "./CreateChecklistModal";

function ChecklistContent(){
    const [openModal, setOpenModal]  = useState(null);  // 'view' | 'upload' | 'add' | null


    return(
        <div className="custom-bg-color flex flex-col items-center justify-center min-h-screen p-8 space-y-6">
            
            <div className="text-center space-y-2 fade-scale-in">
                <h1 className="text-3xl font-bold">My Checklists</h1>
                <p className="text-lg text-gray-700">Organize tasks and check them off as you go.</p>    
            </div>

            <div className="flex space-x-6 fade-scale-in">
                <button onClick={() => setOpenModal('view')} type="button" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow cursor-pointer">+ View Checklists</button>

                <button onClick={() => setOpenModal('upload')} type="button" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow cursor-pointer">+ Upload Checklists</button>

                <button onClick={() => setOpenModal('add')} type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow cursor-pointer">+ Add Checklists</button>
            </div>

            <div>
                {openModal === 'view' && <ViewChecklistModal onClose={() => setOpenModal(null)} />}
                {openModal === 'upload' && <UploadChecklistModal onClose={() => setOpenModal(null)} />}
                {openModal === 'add' && <CreateChecklistModal onClose={() => setOpenModal(null)} />}
            </div>

        </div>

    );
} export default ChecklistContent;