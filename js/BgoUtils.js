/*jslint browser: true, regexp: true */
/*global HTMLElement, Node */

(function (global) {
    "use strict";

    global.BGo = window.BGo || {};
    global.BGo.Utils = {};

    // Returns true if it is a DOM node
    global.BGo.Utils.isNode = function (o) {
        return (
            typeof Node === "object" ? o instanceof Node :
                    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
        );
    };

    // Returns true if it is a DOM element    
    global.BGo.Utils.isElement = function (o) {
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
        );
    };

    global.BGo.Utils.getObjectTypeName = function (object) {
        var funcNameRegex = /function (.{1,})\(/,
            results = (funcNameRegex).exec((object).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    };

}(window));