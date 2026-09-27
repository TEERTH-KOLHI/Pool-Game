function Label(text, position, origin, color, textAlign, fontname, fontsize, fontWeight, shadowColor, shadowBlur){

    this.text = typeof text !== 'undefined' ? text : '';
    this.position = typeof position !== 'undefined' ? position : Vector2.zero;
    this.origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
    this.color = typeof color !== 'undefined' ? color : Color.white;
    this.textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    this.fontname = typeof fontname !== 'undefined' ? fontname : "'Outfit', 'Poppins', sans-serif";
    this.fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";
    this.fontWeight = typeof fontWeight !== 'undefined' ? fontWeight : "bold";
    this.shadowColor = typeof shadowColor !== 'undefined' ? shadowColor : undefined;
    this.shadowBlur = typeof shadowBlur !== 'undefined' ? shadowBlur : 0;
}

Label.prototype.draw = function(){

    Canvas2D.drawText(
        this.text, 
        this.position,
        this.origin,
        this.color,
        this.textAlign,
        this.fontname,
        this.fontsize,
        this.fontWeight,
        this.shadowColor,
        this.shadowBlur
    );

}