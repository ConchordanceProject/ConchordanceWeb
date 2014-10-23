/*
 * 2014 Alex Foran
 * https://github.com/forana/simplesvg-js
 */

var ns = "http://www.w3.org/2000/svg";

var applyProperties = function(obj, properties) {
    if (properties) {
        for (var property in properties) {
            if (properties.hasOwnProperty(property)) {
                obj.setAttribute(property, properties[property]);
            }
        }
    }
};

var px = function(val) {
    return val + "px";
};

window.SimpleSVG = function(attrs) {
    var el = document.createElementNS(ns, "svg");

    var defaults = {
        stroke: "black",
        "stroke-width": "2px"
    };

    el.clear = function() {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    };

    el.defaults = function(attrs) {
        for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                defaults[attr] = attrs[attr];
            }
        }
        return el;
    };

    el.clearDefaults = function() {
        defaults = {};

        return el;
    };

    applyProperties(el, attrs);

    el.circle = function(x, y, r, attrs) {
        var circle = document.createElementNS(ns, "circle");

        if (!attrs) {
            attrs = {};
        }

        attrs.cx = px(x);
        attrs.cy = px(y);
        attrs.r = px(r);

        applyProperties(circle, defaults);
        applyProperties(circle, attrs);

        el.appendChild(circle);

        return el;
    };

    el.rectangle = function(x, y, width, height, attrs) {
        var rect = document.createElementNS(ns, "rect");

        if (!attrs) {
            attrs = {};
        }

        attrs.x = px(x);
        attrs.y = px(y);
        attrs.width = px(width);
        attrs.height = px(height);

        applyProperties(rect, defaults);
        applyProperties(rect, attrs);

        el.appendChild(rect);

        return el;
    };

    el.line = function(x1, y1, x2, y2, attrs) {
        var line = document.createElementNS(ns, "line");

        if (!attrs) {
            attrs = {};
        }

        attrs.x1 = px(x1);
        attrs.y1 = px(y1);
        attrs.x2 = px(x2);
        attrs.y2 = px(y2);

        applyProperties(line, defaults);
        applyProperties(line, attrs);

        el.appendChild(line);

        return el;
    };

    el.path = function(points, closed, attrs) {
        var path = "";
        for (var i = 0; i < points.length; i++) {
            path += i==0 ? "M" : "L";
            path += " "
                + points[i][0]
                + " "
                + points[i][1]
                + " ";
        }
        if (closed) {
            path += "Z";
        }

        if (!attrs) {
            attrs = {};
        }

        attrs.d = path;

        var shape = document.createElementNS(ns, "path");

        applyProperties(shape, defaults);
        applyProperties(shape, attrs);

        el.appendChild(shape);

        return el;
    };

    el.text = function(string, x, y, attrs) {
        var text = document.createElementNS(ns, "text");
        var textNode = document.createTextNode(string);
        text.appendChild(textNode);

        if (!attrs) {
            attrs = {};
        }

        attrs.x = x;
        attrs.y = y;

        applyProperties(text, defaults);
        applyProperties(text, attrs);

        el.appendChild(text);

        return el;
    }

    return el;
};