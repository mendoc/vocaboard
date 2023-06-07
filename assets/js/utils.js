const _ = function (selector) {
    return document.querySelector(selector);
}

Object.defineProperty(String.prototype, 'ucfirst', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
});

Object.defineProperty(String.prototype, 'click', {
    value: function (cb) {
        _(this).addEventListener("click", cb);
    }
});

Object.defineProperty(String.prototype, 'css', {
    value: function (prop, value) {
        _(this).style[prop] = value
    }
});

Object.defineProperty(String.prototype, 'text', {
    value: function (value) {
        if (arguments.length > 0) _(this).textContent = value;
        return _(this).textContent
    }
});

Object.defineProperty(String.prototype, 'html', {
    value: function (value) {
        if (arguments.length > 0) _(this).innerHTML = value;
        return _(this).innerHTML
    }
});