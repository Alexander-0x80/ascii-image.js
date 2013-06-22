
var AsciiImg = function(imageElement){
    "use strict";

    /* Make sure we got an image */
    if (!imageElement || imageElement.tagName != "IMG") {
        return false;
    }

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        width = null,
        height = null,
        imageData = null,
        tempImageData = null,
        resultData = null,
        fontSize = "8px",
        text_width = 5,
        text_height = 8,

    loadImage = function(image){
        canvas.width = image.width;
        canvas.height = image.height;
        width = image.width;
        height = image.height;
        context.drawImage(image, 0, 0);
    },

    getPixelData = function(){
        var data = [];
        var image = context.getImageData(0, 0, width, height).data;
        for (var i=0; i<image.length; i+=4){
            var y = Math.floor(i / (width * 4));
            var x = (i - (y * width * 4)) / 4;
            if (typeof data[x] === "undefined") {
                data[x] = [];
            }

            data[x][y] = {
                r: image[i],
                g: image[i+1],
                b: image[i+2],
                a: image[i+3]
            }
        }
        imageData = data;
    },

    getCharPixelsList = function(){
        var data = [];
        var newX = width / text_width;
        var newY = height / text_height;

        for(var y=0; y<newY; y++){
            for (var x=0; x<newX; x++){
                data[data.length] = {
                    x: x*text_width,
                    y: y*text_height,
                    r: imageData[x*text_width][y*text_height].r,
                    g: imageData[x*text_width][y*text_height].g,
                    b: imageData[x*text_width][y*text_height].b,
                    a: imageData[x*text_width][y*text_height].a
                };
            }
        }

        tempImageData = data;
    },

    generateResultImage = function(){
        context.clearRect(0, 0, width, height);
        context.fillStyle = "#00";
        context.fillRect(0, 0, width, height);

        for (var i=0; i<tempImageData.length; i++){
            var px = tempImageData[i];
            context.fillStyle = "rgba("+ px.r +","+ px.g +","+ px.b +","+ px.a +")";
            context.font = fontSize + " Monospace";
            context.fillText("@", px.x, px.y);
        }

        resultData = canvas.toDataURL();
    };

    /* Populate constructor */
    loadImage(imageElement);
    getPixelData();
    getCharPixelsList();
    generateResultImage();

    return {
        convertElement: function(){
            imageElement.src = resultData;
        },

        getImageData: function(){
            return resultData;
        }
    };
};
