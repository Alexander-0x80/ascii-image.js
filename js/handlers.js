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
    dom.canvas.width = dom.sourceImg.width;
    dom.canvas.height = dom.sourceImg.height;
    ctx.drawImage(dom.sourceImg, 0, 0);
    var pixGrid = getGridData(ctx.getImageData(0, 0, dom.canvas.width,dom.canvas.height).data);
    var chSize = generateTextSize("b","8");
    var avgPixelsList = getPixelsList(pixGrid, dom.canvas.width, dom.canvas.height, chSize[0],chSize[1]);
    var result = getResult(avgPixelsList,dom.canvas,dom.canvas.width,dom.canvas.height);
    dom.resultImg.src = result;
    
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

