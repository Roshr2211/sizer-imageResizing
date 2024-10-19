import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropBox({ setting_img_details }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png', // Allow only JPEG and PNG images
    multiple: false, // Accept only one image
    onDrop: (acceptedFiles) => {
      console.log("File Detected!", acceptedFiles[0]);
      setIsLoading(true); // Set loading to true before processing
      handleImageUpload(acceptedFiles);
    },
  });

  const handleImageUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return; // Make sure there is a file

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFile({
        dataUrl: e.target.result,
        name: file.name,
      });
      setIsLoading(false); // Set loading to false after data is ready
    };
    reader.readAsDataURL(file); // Ensure a File object is passed
  };

  return (
    <div {...getRootProps({ className: isDragActive ? 'dropzone-active' : 'dropzone' })}>
      {/* Only getInputProps, no need for onChange here */}
      <input {...getInputProps()} accept="image/*" />
      {isLoading ? (
        <div></div>
      ) : selectedFile ? (
        <div className="dropped-image-container border-dashed border-4 rounded-2xl p-8 border-cyan-300">
          <img
            src={selectedFile.dataUrl}
            alt={selectedFile.name}
            id="drop_img"
            className="dropped-image"
            onLoad={() => {
              const img = document.getElementById("drop_img");
              setting_img_details({
                FileName: selectedFile.name,
                dataURL: selectedFile.dataUrl,
                w: img.width,
                h: img.height,
              });
            }}
          />
        </div>
      ) : (
        <div className='border-dashed border-4 rounded-2xl p-8 border-cyan-300'>
          <svg
            className="mx-10 mt-12 mb-3"
            width="131"
            height="131"
            viewBox="0 0 131 131"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG content */}
          </svg>
          <h1 className="text-gray-300 mb-6">drop image file</h1>
        </div>
      )}
    </div>
  );
}
