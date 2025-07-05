import { useRef, useState } from "react";
import "../index.css";
import merge from "../assets/merge.svg"; // Import your image here

const FileGetter = ({
  title = "Merge PDF",
  subtitle = "Combine multiple PDF files into a single document",
  acceptedFileTypes = ".pdf",
  buttonText = "Select PDF file",
  multipleFiles = true,
  onFileSelect,

  // Optional style overrides
  wrapperClass = "min-h-screen bg-white flex justify-center  px-80",
  cardClass = "w-full max-w-5xl bg-white flex flex-col items-center ",
  headerClass = "bg-blue-100 relative w-3/4 overflow-hidden pt-6 pb-6 pl-8 pr-8 rounded-[8px] mt-[80px] mb-6 text-start",
  imageClass = "absolute right-0 top-8 fill-white w-[84px] header h-[84px]",
  titleClass = "text-2xl font-bold text-gray-800",
  subtitleClass = "text-sm text-gray-500 mt-1",
  dropZoneClass = "border-2 border-dashed border-gray-300 w-full rounded-md mt-6 p-10 text-center transition-all duration-200",
  dropZoneActiveClass = "border-blue-500 bg-blue-50",
  iconClass = "text-gray-500 text-4xl mb-2",
  selectButtonClass = "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4",

  children,
}) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileClick = () => fileInputRef.current.click();

  const addFiles = (newFiles) => {
    const selectedFiles = Array.from(newFiles);
    let updatedFiles = selectedFiles;
    if (multipleFiles) {
      updatedFiles = [...files, ...selectedFiles];
    }
    if (onFileSelect) onFileSelect(updatedFiles);
    setFiles(updatedFiles);
  };

  const handleFileChange = (e) => {
    addFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className={wrapperClass}>
      <div className={cardClass}>
        {/* Always show header */}
        <div className={headerClass}>
          <h1 className={titleClass}>{title}</h1>
          <p className={subtitleClass}>{subtitle}</p>
       <img src={merge} alt="merge" className={imageClass}/>
        </div>

        {files.length > 0 ? (
          // Show children after file selection
          <div>{children}</div>
        ) : (
          // File input UI
          <div
            className={`${dropZoneClass} ${
              isDragging ? dropZoneActiveClass : ""
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className={iconClass}>📄</div>
            <p className='text-gray-500'>Drag & drop files here</p>
            <input
              type='file'
              accept={acceptedFileTypes}
              multiple={multipleFiles}
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden'
            />
            <button className={selectButtonClass} onClick={handleFileClick}>
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileGetter;
