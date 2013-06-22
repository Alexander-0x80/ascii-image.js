
var AsciiImg = function(){
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.width = null;
    this.height = null;
    this.imageData = null;
    this.newImageData = null;
    this.resultData = null;
    this.fontSize = "8px";
    this.text_width = 5;
    this.text_height = 8;
};

AsciiImg.prototype = {
    loadImage: function(image){
        
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        this.width = image.width;
        this.height = image.height;
        this.context.drawImage(image, 0, 0);
    },

    getPixelData: function(){
        var data = [];
        var image = this.context.getImageData(0, 0, this.width, this.height).data;
        for (var i=0; i<image.length; i+=4){
            var y = Math.floor(i / (this.width * 4));
            var x = (i - (y * this.width * 4)) / 4;
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

        this.imageData = data;
        //return data;
    },

    getCharPixelsList: function(){
        var data = [];
        var tw = this.text_width;
        var th = this.text_height;
        var newX = this.width / tw;
        var newY = this.height / th;

        for(var y=0; y<newY; y++){
            for (var x=0; x<newX; x++){
                data[data.length] = {
                    x: x*tw,
                    y: y*th,
                    r: this.imageData[x*tw][y*th].r,
                    g: this.imageData[x*tw][y*th].g,
                    b: this.imageData[x*tw][y*th].b,
                    a: this.imageData[x*tw][y*th].a
                };
            }
        }

        this.newImageData = data;
    },

    generateResultImage: function(){
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = "#00";
        this.context.fillRect(0, 0, this.width, this.height);

        for (var i=0; i<this.newImageData.length; i++){
            var px = this.newImageData[i];
            this.context.fillStyle = "rgba("+ px.r +","+ px.g +","+ px.b +","+ px.a +")";
            this.context.font = this.fontSize + " Monospace";
            this.context.fillText("B",px.x, px.y);
        }

        this.resultData = this.canvas.toDataURL();
    }

}




var getResult = function(list,cnv, w, h){
    var ctx = cnv.getContext("2d");
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#00";
    ctx.fillRect(0, 0, w, h);

    for (var i=0; i<list.length; i++){
        var px = list[i];
        ctx.fillStyle = "rgba("+ px.r +","+ px.g +","+ px.b +","+ px.a +")";
        ctx.font = "8px Monospace";
        ctx.fillText("$", px.x, px.y);
    }

    return cnv.toDataURL();
}










