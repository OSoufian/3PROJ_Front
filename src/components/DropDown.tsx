// import React, { useState } from 'react';

// function FileDropZone() {
//   const [isDragOver, setIsDragOver] = useState(false);

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragOver(false);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setIsDragOver(false);

//     const files = event.dataTransfer.files;
//     // Handle the dropped files here
//     console.log(files);
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     // Handle the selected files here
//     console.log(files);
//   };

//   return (
//     <div
//       className={`drop-zone ${isDragOver ? 'active' : ''}`}
//       onDragOver={handleDragOver}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//     >
//       <input type="file" multiple onChange={handleFileChange} />
//       <p>
//         {isDragOver ? 'Drop files here' : 'Drop files here or click to select'}
//       </p>
//     </div>
//   );
// }

// export default FileDropZone;
