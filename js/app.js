/* Main Application */

dom.dragArea.addEventListener("dragenter", onDragEnter);
dom.dragArea.addEventListener("dragleave", onDragLeave);
dom.dragArea.addEventListener("dragover", onDragOver);
dom.dragArea.addEventListener("drop",onImageDrop);
dom.convertBtn.addEventListener("click",onConvertClick);