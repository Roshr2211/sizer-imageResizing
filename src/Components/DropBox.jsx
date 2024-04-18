import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropBox({setting_img_details}){
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png', // Allow only JPEG and PNG images
    multiple: false, // Accept only one image
    onDrop: (acceptedFiles) => {
        console.log("File Detected!", acceptedFiles[0])
        setIsLoading(true); // Set loading to true before processing
        handleImageUpload(acceptedFiles);
    },
  });

  const handleImageUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFile({
        dataUrl: e.target.result,
        name: file.name,
      });
      setIsLoading(false); // Set loading to false after data is ready
    };
    reader.readAsDataURL(file);
  };



  return (
    <div {...getRootProps({ className: isDragActive ? 'dropzone-active' : 'dropzone' })}>
      <input {...getInputProps()} onChange={handleImageUpload} accept="image/*" />
      {isLoading ?(<div></div>):selectedFile ? (
        <div className="dropped-image-container border-dashed border-4 rounded-2xl p-8 border-cyan-300">
            <img src={selectedFile.dataUrl} alt={selectedFile.name} id="drop_img" className="dropped-image" onLoad={()=>{
              const img = document.getElementById("drop_img");
              setting_img_details({
                FileName : selectedFile.name,
                dataURL : selectedFile.dataUrl,
                w : img.width,
                h : img.height
              })
            }} />
        </div>
    ) : (
      <div className='border-dashed border-4 rounded-2xl p-8 border-cyan-300'>
      
        <svg className="mx-10 mt-12 mb-3" width="131" height="131" viewBox="0 0 131 131" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M115.06 82.3539L89.748 57.0416C87.1935 54.4864 83.0513 54.4864 80.4967 57.0416L31.9075 105.63C20.4513 96.0306 13.1666 81.616 13.1666 65.5C13.1666 36.5971 36.5971 13.1666 65.5 13.1666C94.403 13.1666 117.833 36.5971 117.833 65.5C117.833 71.3966 116.858 77.065 115.06 82.3539ZM43.1881 112.852L85.1224 70.9184L108.923 94.719C99.5114 108.677 83.5635 117.832 65.4974 117.832C57.5093 117.832 49.9534 116.046 43.1881 112.852ZM65.5 130.917C101.628 130.917 130.917 101.628 130.917 65.5C130.917 29.3713 101.628 0.083313 65.5 0.083313C29.3713 0.083313 0.083313 29.3713 0.083313 65.5C0.083313 101.628 29.3713 130.917 65.5 130.917ZM58.9583 52.4166C58.9583 59.6426 53.1009 65.5 45.875 65.5C38.6493 65.5 32.7916 59.6426 32.7916 52.4166C32.7916 45.1909 38.6493 39.3333 45.875 39.3333C53.1009 39.3333 58.9583 45.1909 58.9583 52.4166Z" fill="#7E7E7E"/>
        </svg>

        <h1 className="text-gray-300 mb-6">drop image file</h1>
      </div>
    )}
  </div>
    )
}