"use strict";

function Score(position){
    this.position = position;
    this.origin = new Vector2(47,82);
    this.value = 0;
}

Score.prototype.reset = function(){
    this.position = position;
    this.origin = new Vector2(30,0);
    this.value = 0;
};

Score.prototype.draw = function () {
  Canvas2D.drawText(
      this.value, 
      this.position, 
      this.origin, 
      "rgba(255, 255, 255, 0.22)", 
      "top", 
      "'Outfit', sans-serif", 
      "180px",
      "800",
      "rgba(0, 0, 0, 0.5)",
      8
    );
};

Score.prototype.drawLines = function (color) {
    
    for(let i=0; i<this.value; i++){

        let pos = this.position.add(new Vector2(i*15,0));

        Canvas2D.drawText(
            "I", 
            pos, 
            this.origin, 
            color, 
            "top", 
            "Arial", 
            "20px"
        );

    }
  };

Score.prototype.increment = function(){
    this.value++;
};