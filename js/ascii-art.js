
var getGridData = function(img){
    var res = [];
    for (var i=0; i<img.length; i+=4){
        var y = Math.floor(i / (dom.canvas.width * 4));
        var x = (i - (y * dom.canvas.height * 4)) / 4;
        if (typeof res[x] === "undefined") {
            res[x] = [];
        }

        res[x][y] = {
            r: img[i],
            g: img[i+1],
            b: img[i+2],
            a: img[i+3]
        }
    }

    return res;
}










