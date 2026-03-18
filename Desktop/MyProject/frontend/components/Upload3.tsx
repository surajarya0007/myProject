"use client";
import React, { useState, useRef, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getLocalStorgeToken } from "./getToken";

interface JwtPayload {
  side: string;
}

type FileStatus = "queued" | "uploading" | "done" | "error";

interface FileState {
  uid: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: FileStatus;
  preview?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ type }: { type: string }) {
  if (type.startsWith("image/")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function StatusIcon({ status }: { status: FileStatus }) {
  if (status === "done") {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    );
  }
  if (status === "uploading") {
    return (
      <svg className="h-4 w-4 animate-spin text-pink-500" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    );
  }
  return (
    <div className="h-4 w-4 rounded-full border-2 border-gray-200" />
  );
}

export default function Upload3() {
  const [fileList, setFileList] = useState<FileState[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (fileState: FileState) => {
    const token = getLocalStorgeToken() || "";
    let side = "groom";
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      side = decoded.side;
    } catch {}

    const formData = new FormData();
    formData.append("files", fileState.file);

    setFileList(prev =>
      prev.map(f => f.uid === fileState.uid ? { ...f, status: "uploading", progress: 0 } : f)
    );

    try {
      await axios.post("https://api-three-murex.vercel.app/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Side: side,
        },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded * 100) / (e.total ?? e.loaded));
          setFileList(prev =>
            prev.map(f => f.uid === fileState.uid ? { ...f, progress: pct } : f)
          );
        },
      });
      setFileList(prev =>
        prev.map(f => f.uid === fileState.uid ? { ...f, status: "done", progress: 100 } : f)
      );
    } catch {
      setFileList(prev =>
        prev.map(f => f.uid === fileState.uid ? { ...f, status: "error" } : f)
      );
    }
  }, []);

  const addFiles = useCallback((incoming: File[]) => {
    const newStates: FileState[] = incoming.map(file => {
      const uid = `${file.name}-${file.size}-${Date.now()}-${Math.random()}`;
      const state: FileState = {
        uid, file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "queued",
      };
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFileList(prev =>
            prev.map(f => f.uid === uid ? { ...f, preview: e.target?.result as string } : f)
          );
        };
        reader.readAsDataURL(file);
      }
      return state;
    });

    setFileList(prev => [...prev, ...newStates]);
    newStates.forEach(uploadFile);
  }, [uploadFile]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length) addFiles(dropped);
  }, [addFiles]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length) addFiles(selected);
    e.target.value = "";
  };

  const removeFile = (uid: string) => {
    setFileList(prev => prev.filter(f => f.uid !== uid));
  };

  const doneCount = fileList.filter(f => f.status === "done").length;
  const hasFiles = fileList.length > 0;

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed p-14 text-center transition-all duration-200 ${
          isDragging
            ? "border-pink-400 bg-pink-50 scale-[1.01]"
            : "border-pink-200 bg-white/70 hover:border-pink-400 hover:bg-pink-50/60"
        }`}
      >
        {/* Top gradient strip (only on drag) */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-pink-500 to-purple-500"
              style={{ transformOrigin: "left" }}
            />
          )}
        </AnimatePresence>

        <motion.div
          animate={{ scale: isDragging ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4 4 4" />
          </svg>
        </motion.div>

        <div>
          <p className="font-heading text-lg font-semibold text-gray-700">
            {isDragging ? "Drop to upload" : "Drag & drop your photos here"}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            or <span className="text-pink-500 font-medium">click to browse</span> — JPG, PNG, HEIC, videos welcome
          </p>
        </div>

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={onInputChange}
        />
      </motion.div>

      {/* Summary bar */}
      <AnimatePresence>
        {hasFiles && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center justify-between rounded-2xl border border-pink-100 bg-white/80 px-5 py-3 text-sm shadow-sm"
          >
            <span className="text-gray-500">
              <span className="font-semibold text-pink-600">{doneCount}</span> of{" "}
              <span className="font-semibold text-gray-700">{fileList.length}</span> uploaded
            </span>
            <button
              onClick={() => setFileList([])}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors"
            >
              Clear all
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File list */}
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {fileList.map((f) => (
            <motion.div
              key={f.uid}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                {/* Thumbnail or icon */}
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-pink-50 flex items-center justify-center">
                  {f.preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.preview} alt={f.name} className="h-full w-full object-cover" />
                  ) : (
                    <FileIcon type={f.type} />
                  )}
                </div>

                {/* Name + size */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-700">{f.name}</p>
                  <p className="text-xs text-gray-400">{formatBytes(f.size)}</p>
                </div>

                {/* Status */}
                <StatusIcon status={f.status} />

                {/* Remove */}
                {f.status !== "uploading" && (
                  <button
                    onClick={() => removeFile(f.uid)}
                    className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-400 transition-colors"
                    aria-label="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Progress bar */}
              {(f.status === "uploading" || (f.status === "queued" && f.progress > 0)) && (
                <div className="mx-4 mb-3 h-1.5 rounded-full bg-pink-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${f.progress}%` }}
                    transition={{ ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                </div>
              )}
              {f.status === "done" && (
                <div className="mx-4 mb-3 h-1.5 rounded-full bg-green-100 overflow-hidden">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-green-400 to-emerald-400" />
                </div>
              )}
              {f.status === "error" && (
                <p className="px-4 pb-3 text-xs text-red-400">Upload failed. Please try again.</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Done state */}
      <AnimatePresence>
        {hasFiles && doneCount === fileList.length && fileList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2 rounded-2xl border border-green-100 bg-green-50 py-6 text-center"
          >
            <span className="text-3xl">🎉</span>
            <p className="font-heading text-base font-semibold text-green-700">
              All {fileList.length} photo{fileList.length > 1 ? "s" : ""} uploaded!
            </p>
            <p className="text-xs text-green-500">They&apos;re now part of the wedding album.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
