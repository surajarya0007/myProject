"use client";
import React, { useRef, useState } from "react";

function Upload() {
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;
    if (files.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      try {
        const response = await fetch("http://localhost:5050/upload", {
          method: "POST",
          body: formData,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(prevState => ({
              ...prevState,
              [progressEvent.target.responseURL]: percentCompleted
            }));
          },
        });

        const data = await response.json();
        console.log("uploded files: ", data.files);
      } catch (error) {
        console.log("error");
      }
    }
  };

  return (
    <>
      <div className="px-10 mt-28 flex flex-col items-center">
        <h1 className="mb-4 text-3xl font-extrabold font-serif md:text-5xl lg:text-6xl pb-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 ">
            Upload your files here
          </span>
        </h1>
        <div className="flex flex-col items-center space-y-7 pb-7">
          <input type="file" multiple ref={fileInputRef} />
          <button className="bg-pink-700 px-6 py-2 text-white hover:bg-pink-900 gap-3 items-center justify-center rounded-full border" onClick={handleFileUpload}>Upload files</button>
          {Object.entries(uploadProgress).map(([key, value]) => (
            <div key={key}>
              <span>{key}</span>
              <progress value={value} max="100" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Upload;

