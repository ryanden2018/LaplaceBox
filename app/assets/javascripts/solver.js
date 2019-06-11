function LaplaceBox(width) {
  this.image = [];
  this.width = width;
  this.maxVal = 1.0;
  this.xc = width/2;
  this.yc = width/2;

  for(var i = 0; i < width*width; i++) {
    this.image.push(0.5);
  }
}

LaplaceBox.prototype.reset = function() {
  this.image = [];
  this.maxVal = 1.0;
  for(var i = 0; i < this.width*this.width; i++) {
    this.image.push(0.5);
  }
};

LaplaceBox.prototype.inDisk = function(i,j) {
  return Math.sqrt( Math.pow(i-this.xc,2) + Math.pow(j-this.yc,2) ) < 40.0;
};

LaplaceBox.prototype.initBC = function() {
  for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.width; j++) {
      if( this.inDisk(i,j) ) {
        this.image[i*this.width+j] = 0.5;
      }
    }
  }

  for(var j = 0; j < this.width; j++) {
    this.image[j] = Math.sin(10*2*Math.PI*j/this.width);
    this.image[this.width*(this.width-1)+j] = Math.sin(10*2*Math.PI*j/this.width);
  }

  for(var i = 0; i < this.width; i++) {
    this.image[this.width*i] = Math.sin(10*2*Math.PI*i/this.width);
    this.image[this.width*i+(this.width-1)] = Math.sin(10*2*Math.PI*i/this.width);
  }
};

LaplaceBox.prototype.step = function() {
  console.log(this.maxVal);
  var dt = 1.0 / (4*this.width*this.width);
  var dx = 1.0 / this.width;

  for(var l = 0; l < 10; l++) {
    var change = [];
    for( var i = 0; i < this.width*this.width; i++) {
      change.push(0.0);
    }

    for(var i = 1; i < this.width-1; i++) {
      for(var j = 1; j < this.width-1; j++) {
        if(!this.inDisk(i,j)) {
          change[i*this.width+j] = (1.0/Math.pow(dx,2)) * (
            this.image[(i-1)*this.width+j]
            + this.image[(i+1)*this.width+j]
            + this.image[i*this.width + (j-1)]
            + this.image[i*this.width + (j+1)]
            - 4 * this.image[i*this.width+j]
          );
        }
      }
    }


    for(var i = 1; i < this.width-1; i++) {
      for(var j = 1; j < this.width-1; j++) {
        if(!this.inDisk(i,j)) {
          this.image[i*this.width+j] += dt * change[i*this.width+j];
        }
      }
    }
  }
};
