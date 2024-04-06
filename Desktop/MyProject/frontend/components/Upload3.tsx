"use client";
import React, { useState } from "react";
import { Button, Progress, Space, Typography, Upload, UploadProps } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getLocalStorgeToken } from "./getToken";

interface ExtendedRcFile extends RcFile {
  progress?: number;
}

interface JwtPayload {
  side: string;
}

function Upload3() {
  const [files, setFiles] = useState<Record<string, ExtendedRcFile>>({});

  // Correct the function to match expected signature
  const handleFileUpload: UploadProps["customRequest"] = (options) => {
    const { file } = options;
    const extendedFile: ExtendedRcFile = file as ExtendedRcFile;

    setFiles((prev) => ({
      ...prev,
      [extendedFile.uid]: extendedFile,
    }));

    const formData = new FormData();
    formData.append("files", extendedFile);
    const token = getLocalStorgeToken() || "";

    const decoded = jwtDecode<JwtPayload>(token);
    const side = decoded.side;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Side: side,
      },
    };

    axios
      .post("https://you-and-me-api.vercel.app/upload", formData, config)
      .then((response) => {
        setFiles((prev) => ({
          ...prev,
          [extendedFile.uid]: { ...extendedFile, progress: 100 },
        }));
      })
      .catch((error) => {
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
          <Upload.Dragger
            multiple
            customRequest={handleFileUpload}
            showUploadList={false}
          >
            Drag files here OR <Button>Click to Upload</Button>
          </Upload.Dragger>
          {Object.values(files).map((file, index) => {
            return (
              <Space direction="vertical" key={index} className="flex ">
                <Space>
                  <Typography>{file.name}</Typography>
                  {file.progress === 100 ? (
                    <Typography.Text type="secondary">
                      file is Uploaded Successfully{" "}
                    </Typography.Text>
                  ) : null}
                </Space>
                <Progress percent={Math.ceil(file.progress || 10)} />
              </Space>
            );
          })}
        </Space>
      </div>
    </>
  );
}
export default Upload3;
