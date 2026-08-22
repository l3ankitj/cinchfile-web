"use client";

/**
 * Client-side PDF page count extraction (pdfjs-dist). Only run in the
 * browser — never imported into a server bundle.
 */
let workerConfigured = false;

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  if (!workerConfigured) {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
    workerConfigured = true;
  }
  return pdfjs;
}

/** Returns the page count of a PDF File, or null if it can't be read. */
export async function getPdfPageCount(file: File): Promise<number | null> {
  try {
    const pdfjs = await loadPdfjs();
    const buffer = await file.arrayBuffer();
    const doc = await pdfjs.getDocument({ data: buffer }).promise;
    const count = doc.numPages;
    await doc.destroy();
    return count;
  } catch {
    return null;
  }
}
