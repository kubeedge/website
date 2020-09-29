/**
 * This project is used to lazy load images.
 * Sloth.js v1.0
 * @Date 2016/05/26
 * @Author Ziv
 */


(function(factory) {
    "use strict";
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory();
    } else if (typeof define === "function" && (define.amd || define.cmd)) {
        define(factory);
    } else {
        window.Sloth = factory();
    }

})(function() {
    "use strict";

    var _lazyFlag = "sloth-img"; // The mark of lazy load
    var _viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        _viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    function Sloth(elementId) {
        this.elementId = elementId || "";

        if (this.elementId && this.elementId.indexOf("#") < 0) {
            this.elementId += "#";
        }

        if (!this._images) { // Get All Images
            this._images = (this.elementId ?
                    document.querySelector(elementId).querySelectorAll('img[' + _lazyFlag + ']') :
                    document.querySelectorAll('img[' + _lazyFlag + ']')) || [];
        }
    }

    Sloth.prototype.load = function() { // Auto load
        var images = this._images;
        if (images.length > 0) {
            for (var i = 0; i < images.length; i++) {
                var img = images[i];
                if (this.isOnVerticalViewPort(img) && this.isOnHorizontalViewPort(img)) {
                    var url = img.getAttribute(_lazyFlag);
                    img.setAttribute("src", url);
                    img.isload = true;
                }
            }
        }
    };

    Sloth.prototype.init = function() {
        var self = this;
        self.load();
        window.addEventListener("scroll", function(e) {
            self.load();
        }, false);
    };

    Sloth.prototype.isOnVerticalViewPort = function(ele) {
        var rect = ele.getBoundingClientRect();
        return rect.top > 0 && rect.top <= _viewPortHeight;
    };

    Sloth.prototype.isOnHorizontalViewPort = function(ele) {
        var rect = ele.getBoundingClientRect();
        return rect.left > 0 && rect.left <= _viewPortWidth;
    };

    return Sloth;
});