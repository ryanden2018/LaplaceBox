window.onload = function() {
  var canvas = document.querySelector("#lb");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var lb = new LaplaceBox(width/3);
  lb.initBC();

  var imgdata = context.createImageData(width,height);

  function buildImg() {
    for(var i = 0; i < width; i++) {
      for(var j = 0; j < width; j++) {
        var idx0 = (i*width+j)*4;
        var val = Math.max( 255* Math.min( lb.image[(width/3)*Math.floor(i/3)+Math.floor(j/3)]/lb.maxVal ,255), 0);
        imgdata.data[idx0] = Math.floor(val);
        imgdata.data[idx0+1] = Math.floor(val);
        imgdata.data[idx0+2] = Math.floor(val);
        imgdata.data[idx0+3] = 255;
      }
    }
  }

  function main(tf) {
    window.requestAnimationFrame(main);
    lb.step();
    buildImg();
    context.putImageData(imgdata,0,0);
  }

  main(0);
};
