'use client'
import React, { useState } from "react";
import {Button , Progress, Space, Typography, Upload} from "antd";
import axios from "axios";

function Upload3() {
  const [files, setFiles] = useState({})

  const handleFileUpload = ({file}) => {
    console.log(file)
    setFiles(pre => {
      return{...pre,[file.uid]:file}
    })

    const formData = new FormData();
    formData.append("files", file);

    axios.post("http://localhost:5050/upload", formData)
    .then(response => {
      console.log("uploded files: ", response.data.files);
      setFiles(pre => {
        return {...pre, [file.uid]: {...file, progress: 100}}
      })
    })
    .catch(error => {
      console.log("error", error);
    });
  };

  return (
    <>
      <div className="px-10 mt-28 flex flex-col items-center">
        <h1 className="mb-4 text-3xl font-extrabold font-serif md:text-5xl lg:text-6xl pb-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 ">
            Upload your files here
          </span>
        </h1>
        <Space direction="vertical" className="mb-10">
          <Upload.Dragger multiple customRequest={handleFileUpload} showUploadList={false}>
            Drag files here OR <Button>Click to Upload</Button>
          </Upload.Dragger>
          {Object.values(files).map((file,index)=>{
            return (
              <Space direction="vertical" key={index} className="flex ">
                <Space>
                  <Typography>{file.name}</Typography>
                  {file.progress === 100 ? <Typography.Text type="secondary"> is Uploaded Successfully </Typography.Text> : null}
                </Space>  
                <Progress percent={Math.ceil(file.progress)} />
              </Space>
            )
          })}
        </Space>
      </div>
    </>
  );
}

export default Upload3;