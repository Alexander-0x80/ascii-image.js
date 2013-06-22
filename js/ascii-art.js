
var AsciiImg = function(imageElement, characters, options){
    "use strict";

    /* Make sure we got an image */
    if (!imageElement || imageElement.tagName != "IMG") {
        return false;
    }

    var options = options || {},
        canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        width = null,
        height = null,
        imageData = null,
        tempImageData = null,
        resultData = null,
        fontSize = options.fontSize || "8px",
        char_width = options.char_width || 5,
        char_height = options.char_height || 8,
        chars = characters || "@",

    loadImage = function(image){
        canvas.width = image.width;
        canvas.height = image.height;
        width = image.width;
        height = image.height;
        context.drawImage(image, 0, 0);
    },

    getCharacter = function(){
        while(true)
            for(var i=0; i<chars.length; i++){
                if (chars[i] == " ") continue;
                yield chars[i];
            }
    },

    getPixelData = function(){
        var data = [],
            image = context.getImageData(0, 0, width, height).data;

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
        var data = [],
            newX = width / char_width,
            newY = height / char_height;

        for(var y=0; y<newY; y++){
            for (var x=0; x<newX; x++){
                data[data.length] = {
                    x: x*char_width,
                    y: y*char_height,
                    r: imageData[x*char_width][y*char_height].r,
                    g: imageData[x*char_width][y*char_height].g,
                    b: imageData[x*char_width][y*char_height].b,
                    a: imageData[x*char_width][y*char_height].a
                };
            }
        }

        tempImageData = data;
    },

    generateResultImage = function(){
        var characters = getCharacter();
        context.clearRect(0, 0, width, height);
        context.fillStyle = "#00";
        context.fillRect(0, 0, width, height);

        for (var i=0; i<tempImageData.length; i++){
            var px = tempImageData[i];
            context.fillStyle = "rgba("+ px.r +","+ px.g +","+ px.b +","+ px.a +")";
            context.font = fontSize + " Monospace";
            context.fillText(characters.next(), px.x, px.y);
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
