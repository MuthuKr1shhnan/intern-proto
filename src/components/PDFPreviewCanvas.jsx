import { useEffect, useRef } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// 🛠 Correct worker for pdfjs
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

const PDFPreviewCanvas = ({ file }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPage = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const scale = 0.4; // Adjust for thumbnail size
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
      } catch (err) {
        console.error("❌ PDF render error:", err.message);
      }
    };

    if (file) renderPage();
  }, [file]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded object-cover bg-white"
      style={{ width: 110, height: 150 }}
    />
  );
};

export default PDFPreviewCanvas;
