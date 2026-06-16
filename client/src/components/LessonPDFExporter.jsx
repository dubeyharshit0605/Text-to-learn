import { useState } from "react";
import html2pdf from "html2pdf.js";

const escapeHtml = (value = "") => {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

const slugify = (value = "lesson") => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const renderBlockToHtml = (block, index) => {
  switch (block.type) {
    case "heading":
      return `<h2>${escapeHtml(block.text)}</h2>`;

    case "paragraph":
      return `<p>${escapeHtml(block.text)}</p>`;

    case "code":
      return `
        <pre>
          <code>${escapeHtml(block.code)}</code>
        </pre>
      `;

    case "video":
      return `
        <div class="pdf-video-box">
          <strong>Suggested Video Search:</strong>
          <p>${escapeHtml(block.query)}</p>
        </div>
      `;

    case "mcq":
      return `
        <div class="pdf-mcq-box">
          <h3>Question ${index + 1}</h3>
          <p>${escapeHtml(block.question)}</p>
          <ul>
            ${(block.options || [])
              .map((option) => `<li>${escapeHtml(option)}</li>`)
              .join("")}
          </ul>
          ${
            block.answer
              ? `<p><strong>Answer:</strong> ${escapeHtml(block.answer)}</p>`
              : ""
          }
        </div>
      `;

    default:
      return "";
  }
};

const LessonPDFExporter = ({ lesson }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!lesson) return;

    try {
      setDownloading(true);

      const title = lesson.title || "Lesson";
      const description = lesson.description || "";
      const content = Array.isArray(lesson.content) ? lesson.content : [];

      const pdfElement = document.createElement("div");

      pdfElement.innerHTML = `
        <div class="lesson-pdf">
          <h1>${escapeHtml(title)}</h1>
          ${description ? `<p class="pdf-description">${escapeHtml(description)}</p>` : ""}
          <hr />
          ${content.map(renderBlockToHtml).join("")}
        </div>
      `;

      const options = {
        margin: 0.5,
        filename: `${slugify(title)}.pdf`,
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().set(options).from(pdfElement).save();
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownloadPDF}
      disabled={downloading || !lesson}
      className="download-pdf-btn"
    >
      {downloading ? "Preparing PDF..." : "Download Lesson as PDF"}
    </button>
  );
};

export default LessonPDFExporter;
