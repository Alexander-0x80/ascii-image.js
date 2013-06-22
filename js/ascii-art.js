
var AsciiImg = function(){
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.width = null;
    this.height = null;
    this.imageData = null;
    this.fontSize = "8px";
};

AsciiImg.prototype = {
    loadImage: function(image){
        
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        this.width = image.width;
        this.height = image.height;
        this.context.drawImage(image, 0, 0);
        document.getElementsByTagName("body")[0].appendChild(this.canvas);
    },

    getPixelData: function(){
        var data = [];
        var image = this.context.getImageData(0, 0, this.width, this.height).data;
        for (var i=0; i<image.length; i+=4){
            var y = Math.floor(i / (this.width * 4));
            var x = Math.floor((i - (y * this.height * 4)) / 4);
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

    getNewPixelsList: function(){

    }

}



var getGridData = function(img){
    var res = [];
    
},

generateTextSize = function(char, size){
    var el = document.createElement("span");
    el.innerHTML = char;
    el.style.fontSize = size + "px";
    el.style.fontFamily = "Monospace";
    document.body.appendChild(el);

    var re = [el.offsetWidth,Math.floor(el.offsetHeight * 0.8)];
    document.body.removeChild(el);
    return re;
},

getPixelsList = function(grid, w, h, tw, th){
    var res = [];
    var countX = w / tw;
    var countY = h / th;
    console.log(w + "--" + h);

    for (var y=0; y<countY; y++){
        //console.log(y);
        for (var x=0; x<countX; x++){
          //  console.log(x);
            res.push({
                x: x*tw,
                y: y*th,
                r: grid[x*tw][y*th].r,
                g: grid[x*tw][y*th].g,
                b: grid[x*tw][y*th].b,
                a: grid[x*tw][y*th].a
            });
        }
    }

    return res;
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
        ctx.fillText("B", px.x, px.y);
    }

    return cnv.toDataURL();
}










