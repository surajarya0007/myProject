"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LikeButton from "./LikeButton";
import { jwtDecode } from "jwt-decode";
import { getLocalStorgeToken } from "./getToken";

interface FileItem {
  id: string;
  webViewLink: string;
  name: string;
  thumbnailLink: string;
}

interface JwtPayload {
  side: string;
}

/* ── Get full-resolution URL from a Google Drive thumbnail link ─────── */
function getFullSizeUrl(thumbnailLink: string, fileId: string): string {
  // lh3.googleusercontent.com/d/ID=w220  →  remove =w… to get original
  if (thumbnailLink.includes("lh3.googleusercontent.com")) {
    return thumbnailLink.replace(/=\w[\w-]*$/, "");
  }
  // drive.google.com/thumbnail?id=…&sz=w220  →  bump sz
  if (thumbnailLink.includes("sz=w")) {
    return thumbnailLink.replace(/sz=w\d+/, "sz=w2048");
  }
  // Fallback: direct Drive URL
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/* ── Lightbox ─────────────────────────────────────────────────────────── */
function Lightbox({
  file,
  files,
  onClose,
  onPrev,
  onNext,
}: {
  file: FileItem;
  files: FileItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* Image container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getFullSizeUrl(file.thumbnailLink, file.id)}
          alt={file.name}
          referrerPolicy="no-referrer"
          className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl"
        />

        {/* Bottom bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/50 px-4 py-2.5 backdrop-blur-sm">
          <LikeButton photoId={file.id} dark />
          <p className="text-xs text-white/70 truncate max-w-[50%]">{file.name}</p>
          <a
            href={`https://api-three-murex.vercel.app/download/${file.id}`}
            download
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0-4-4m4 4 4-4" />
            </svg>
            Download
          </a>
        </div>
      </motion.div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 transition-colors"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev / Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 transition-colors"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 transition-colors"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
        {files.findIndex(f => f.id === file.id) + 1} / {files.length}
      </div>
    </motion.div>
  );
}

/* ── Skeleton ─────────────────────────────────────────────────────────── */
function SkeletonGrid() {
  const heights = [180, 260, 200, 300, 170, 240, 220, 190, 280, 210, 160, 250];
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
      {heights.map((h, i) => (
        <div
          key={i}
          className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 animate-pulse"
          style={{ height: h }}
        />
      ))}
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────────────── */
function Card3() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const itemsPerPage = 12;

  // Keep the exact same fetch pattern as the original working code
  const token = getLocalStorgeToken();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const side = decoded.side;
        const url = new URL("https://api-three-murex.vercel.app/fetchImages");
        url.searchParams.append("side", side);
        const response = await fetch(url.toString());
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const data = await response.json();
        setFiles(data.files ?? []);
      } catch (err) {
        console.error("Failed to load images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const totalPages = Math.ceil(files.length / itemsPerPage);
  const indexOfFirst = (currentPage - 1) * itemsPerPage;
  const currentItems = files.slice(indexOfFirst, indexOfFirst + itemsPerPage);

  const lightboxFile = lightboxId ? files.find(f => f.id === lightboxId) ?? null : null;
  const lightboxIndex = lightboxFile ? files.indexOf(lightboxFile) : -1;

  const openLightbox = (id: string) => setLightboxId(id);
  const closeLightbox = useCallback(() => setLightboxId(null), []);
  const prevImage = useCallback(() => {
    if (lightboxIndex > 0) setLightboxId(files[lightboxIndex - 1].id);
  }, [lightboxIndex, files]);
  const nextImage = useCallback(() => {
    if (lightboxIndex < files.length - 1) setLightboxId(files[lightboxIndex + 1].id);
  }, [lightboxIndex, files]);

  if (loading) return <SkeletonGrid />;

  if (!loading && files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-5xl mb-4">🖼️</span>
        <p className="font-heading text-xl text-gray-500">No photos yet.</p>
        <p className="text-sm text-gray-400 mt-1">Be the first to upload a memory!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Photo count */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-pink-500">{files.length}</span> photos
          {totalPages > 1 && (
            <span> &middot; page {currentPage} of {totalPages}</span>
          )}
        </p>
      </div>

      {/* Masonry grid — naturally handles any aspect ratio */}
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="columns-2 sm:columns-3 lg:columns-4 gap-4"
      >
        {currentItems.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl bg-pink-50 shadow-md shadow-pink-100 hover:shadow-xl hover:shadow-pink-200 transition-shadow duration-300"
            onClick={() => openLightbox(file.id)}
          >
            {/* Image — natural aspect ratio preserved */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={file.thumbnailLink}
              alt={file.name}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <div className="flex items-center justify-between">
                <div onClick={(e) => e.stopPropagation()}>
                  <LikeButton photoId={file.id} dark />
                </div>
                <a
                  href={`https://api-three-murex.vercel.app/download/${file.id}`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/35 transition-colors"
                  aria-label="Download"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0-4-4m4 4 4-4" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-pink-600 shadow-sm disabled:opacity-40 hover:border-pink-400 hover:bg-pink-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
            .reduce<(number | "...")[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="px-1 text-gray-400 text-sm">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p as number)}
                  className={`h-9 w-9 rounded-full text-sm font-semibold transition-all ${
                    currentPage === p
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md shadow-pink-200"
                      : "border border-pink-200 bg-white text-gray-500 hover:border-pink-400 hover:text-pink-600"
                  }`}
                >
                  {p}
                </button>
              )
            )}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-pink-600 shadow-sm disabled:opacity-40 hover:border-pink-400 hover:bg-pink-50 transition-colors"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxFile && (
          <Lightbox
            file={lightboxFile}
            files={files}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Card3;
