/* Main Application */


/* Common */

var dom = {
    dragArea: document.getElementById("drag-area"),
    sourceImg: document.getElementById("source-img"),
    convertBtn: document.getElementById("convert"),
    fillText: document.getElementById("filltext")
};

/* Handlers */

var onDragEnter = function(e){
    e.preventDefault();
    e.stopPropagation();
},

onDragLeave = function(e){
    e.preventDefault();
    e.stopPropagation();
},

onDragOver = function(e){
    e.preventDefault();
    e.stopPropagation();
},

onConvertClick = function(e){
    cnv_img = AsciiImg(dom.sourceImg,dom.fillText.value).convertElement();
},

displaySrcImg = function(imgData){
    dom.sourceImg.src = imgData;
},

onImageDrop = function(e){
    e.preventDefault();
    this.classList.remove("hover");

    try {
        var file = e.dataTransfer.files[0];
        if (!file.type.match("image/*")) {
            alert("Not an image file");
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(data) {
            displaySrcImg(data.target.result);
        }
    } catch (ex) {
        console.log(ex);
    }
};


dom.dragArea.addEventListener("dragenter", onDragEnter);
dom.dragArea.addEventListener("dragleave", onDragLeave);
dom.dragArea.addEventListener("dragover", onDragOver);
dom.dragArea.addEventListener("drop",onImageDrop);
dom.convertBtn.addEventListener("click",onConvertClick);