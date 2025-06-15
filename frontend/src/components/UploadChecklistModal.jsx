import React, {useCallback, useState} from 'react';
import { useDropzone } from 'react-dropzone';

function UploadChecklistModal({ onClose }){
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const droppedFile = acceptedFiles[0];
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {},
        multiple: false,
    });

    async function handleUpload() {
        if(!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try{
            const response = await fetch('http://localhost:8080/api/v1/aws/upload', {
                method: 'POST',
                body: formData,
            });

            if(response.ok){
                const data = await response.text();
                alert("File uploaded successfully! File key: " + data);
                onClose(); 
                window.location.reload(); 
            }

        } catch (error) {
            alert("Error uploading file: " + error.message);
        }
    }

    return(
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto" style={{ fontFamily: 'K2D, sans-serif' }}>
        <h2 className="text-xl font-bold mb-4 text-center">Upload Checklist</h2>
        <div {...getRootProps()} className={`border-4 border-dashed rounded-xl p-4 cursor-pointer bg-gray-50 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center ${isDragActive ? 'border-purple-500 bg-purple-100' : 'border-gray-300'}`} style={{ width: 240, height: 240 }}>
            <input {...getInputProps()} />
            {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-md" />
            ) : (
            <p className="text-gray-500 text-center text-sm">{isDragActive ? 'Drop the file here...' : "Drag 'n' drop a file here, or click to select one"}</p>
            )}
        </div>
        <div className="mt-6 flex justify-between">
            <button onClick={onClose} className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-full hover:bg-gray-400 transition">Cancel ✕</button>
            <button onClick={handleUpload} className="bg-purple-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-purple-800 transition">Upload ↑</button>
        </div>
    </div>
    );
} export default UploadChecklistModal;