import { useEffect, useState } from "react";
import ViewChecklistModal from "./ViewChecklistModal";
import UploadChecklistModal from "./UploadChecklistModal";
import CreateChecklistModal from "./CreateChecklistModal";
import ChecklistTable from "./ChecklistTable";

function ChecklistContent(){
    const [openModal, setOpenModal]  = useState(null);  // 'view' | 'upload' | 'add' | null
    const [checklists, setChecklists] = useState(null); 

    async function fetchChecklists() {
        try{
            const response = await fetch("http://localhost:8080/api/v1/checklist/checklists");
            if(response.ok){
                const data = await response.json();
                setChecklists(data.checklistList);
            }

        } catch (error) {
            console.error("Error fetching checklists:", error);
        }
    }

    useEffect(() => {
        fetchChecklists();
    }, []);

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
            
            {checklists && checklists.length > 0 ? (
                <div className="mt-8 space-y-4 fade-scale-in">
                    {checklists.map((checklist, index) => (
                        <ChecklistTable checklistID={checklist.id} checklistName={checklist.name} items={checklist.items} key={index}/>
                    ))}
                </div>
            ) : (
                <p className="mt-8 text-gray-500 fade-scale-in">No checklists available. Start by adding or uploading one!</p>
            )}

        </div>

    );
} export default ChecklistContent;