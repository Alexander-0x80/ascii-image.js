/* Handlers */

var onDragEnter = function(e){
    e.preventDefault();
    e.stopPropagation();
    this.classList.add("hover");
},

onDragLeave = function(e){
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove("hover");
},

onDragOver = function(e){
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
},

onConvertClick = function(e){
    cnv_img = AsciiImg(dom.sourceImg).convertElement();
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

