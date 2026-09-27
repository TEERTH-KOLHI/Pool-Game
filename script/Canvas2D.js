"use strict";

function Canvas2D_Singleton() {
    this._canvas = null;
    this._canvasContext = null;
    this._canvasOffset = Vector2.zero;
}

Object.defineProperty(Canvas2D_Singleton.prototype, "offset",
    {
        get: function () {
            return this._canvasOffset;
        }
    });

Object.defineProperty(Canvas2D_Singleton.prototype, "scale",
    {
        get: function () {
            return new Vector2(this._canvas.width / Game.size.x,
                this._canvas.height / Game.size.y);
        }
    });

Canvas2D_Singleton.prototype.initialize = function (divName, canvasName) {
    this._canvas = document.getElementById(canvasName);
    this._div = document.getElementById(divName);

    if (!this._canvas || !this._div) {
        console.error("Canvas or gameArea element not found:", canvasName, divName);
        return;
    }

    if (this._canvas.getContext)
        this._canvasContext = this._canvas.getContext('2d');
    else {
        alert('Your browser is not HTML5 compatible.!');
        return;
    }
    window.onresize = Canvas2D_Singleton.prototype.resize;
    this.resize();
};

Canvas2D_Singleton.prototype.clear = function () {
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
};

Canvas2D_Singleton.prototype.resize = function () {
    var gameCanvas = Canvas2D._canvas;
    var gameArea = Canvas2D._div;
    if (!gameCanvas || !gameArea || !Game.size) return;

    var topBarHeight = 70;
    var availableHeight = Math.max(300, window.innerHeight - topBarHeight);
    var availableWidth = window.innerWidth;
    var widthToHeight = Game.size.x / Game.size.y;

    var newWidth = availableWidth;
    var newHeight = availableHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
    } else {
        newHeight = newWidth / widthToHeight;
    }

    gameArea.style.width = newWidth + 'px';
    gameArea.style.height = newHeight + 'px';

    var topMargin = topBarHeight + Math.max(0, (availableHeight - newHeight) / 2);
    var leftMargin = Math.max(0, (availableWidth - newWidth) / 2);

    gameArea.style.marginTop = topMargin + 'px';
    gameArea.style.marginLeft = leftMargin + 'px';
    gameArea.style.marginBottom = '0px';
    gameArea.style.marginRight = '0px';

    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;

    if (gameCanvas.getBoundingClientRect) {
        var rect = gameCanvas.getBoundingClientRect();
        Canvas2D._canvasOffset = new Vector2(rect.left, rect.top);
    } else {
        var offset = Vector2.zero;
        var el = gameCanvas;
        if (el.offsetParent) {
            do {
                offset.x += el.offsetLeft;
                offset.y += el.offsetTop;
            } while ((el = el.offsetParent));
        }
        Canvas2D._canvasOffset = offset;
    }
};

Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, scale, origin) {
    var canvasScale = this.scale;

    position = typeof position !== 'undefined' ? position : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    scale = typeof scale !== 'undefined' ? scale : 1;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;

    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(sprite, 0, 0,
        sprite.width, sprite.height,
        -origin.x * scale, -origin.y * scale,
        sprite.width * scale, sprite.height * scale);
    this._canvasContext.restore();
};

Canvas2D_Singleton.prototype.drawText = function (text, position, origin, color, textAlign, fontname, fontsize, fontWeight, shadowColor, shadowBlur) {
    var canvasScale = this.scale;

    position = typeof position !== 'undefined' ? position : Vector2.zero;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
    color = typeof color !== 'undefined' ? color : Color.black;
    textAlign = typeof textAlign !== 'undefined' ? textAlign : "left";
    if (textAlign === "top" || textAlign === "bottom") {
        textAlign = "left";
    }
    fontname = typeof fontname !== 'undefined' ? fontname : "'Outfit', 'Inter', sans-serif";
    fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";
    fontWeight = typeof fontWeight !== 'undefined' ? fontWeight : "bold";

    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.translate(position.x - origin.x, position.y - origin.y);
    this._canvasContext.textBaseline = 'top';
    this._canvasContext.font = fontWeight + " " + fontsize + " " + fontname;
    
    if (shadowColor && shadowBlur) {
        this._canvasContext.shadowColor = shadowColor;
        this._canvasContext.shadowBlur = shadowBlur;
        this._canvasContext.shadowOffsetX = 1;
        this._canvasContext.shadowOffsetY = 2;
    }

    this._canvasContext.fillStyle = color.toString();
    this._canvasContext.textAlign = textAlign;
    this._canvasContext.fillText(text, 0, 0);
    this._canvasContext.restore();
};

var Canvas2D = new Canvas2D_Singleton();

