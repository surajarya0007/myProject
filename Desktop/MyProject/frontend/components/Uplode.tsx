'use client'
import React, { useState } from 'react';

function Uplode() {
  const [uploadMessage, setUploadMessage] = useState<string>('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadMessage('Successfully uploaded to drive');
        form.reset();
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setUploadMessage(`Upload failed: ${error}`);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.currentTarget;
    const fileInputLabel = document.getElementById('fileInputLabel');

    if (fileInput.files && fileInput.files.length > 0) {
      const fileName =
        fileInput.files.length === 1
          ? fileInput.files[0].name
          : `${fileInput.files.length} files selected`;
      fileInputLabel!.textContent = fileName;
    } else {
      fileInputLabel!.textContent = 'Select Files';
    }
  };

  return (
    <div className='px-10 mt-20 flex flex-col items-center'>
      <h1 className='mb-4 text-3xl font-extrabold font-serif md:text-5xl lg:text-6xl pb-5'>
        <span className='text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 '>
          Uplode your files here
        </span>
      </h1>
      <div>
        <div>
          <p style={{ display: 'none' }}>{uploadMessage}</p>
          <form onSubmit={handleFormSubmit} className='pb-10 space-y-5'>
            <div className='flex items-center'>
              <input
                id='fileInput'
                type='file'
                name='file'
                required
                multiple
                onChange={handleFileInputChange}
              />
              <label htmlFor='fileInput' id='fileInputLabel'>
                Select Files
              </label>
            </div>
            <div className='flex bg-red-100 rounded-full text-2xl font-mono'>
                <button id='myButton' type='submit' >
                Submit
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Uplode;
