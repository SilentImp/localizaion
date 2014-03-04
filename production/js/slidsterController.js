(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define([], function() {
    var slidsterController;
    slidsterController = (function() {
      function slidsterController() {
        this.prev = __bind(this.prev, this);
        this.next = __bind(this.next, this);
        this.getCurrentSlide = __bind(this.getCurrentSlide, this);
        this.resize = __bind(this.resize, this);
        this.fsState = __bind(this.fsState, this);
        this.fsStateOn = __bind(this.fsStateOn, this);
        this.fsStateOff = __bind(this.fsStateOff, this);
        this.fsChange = __bind(this.fsChange, this);
        this.keyDown = __bind(this.keyDown, this);
        this.keyUp = __bind(this.keyUp, this);
        this.redrawProgress = __bind(this.redrawProgress, this);
        this.selectSlide = __bind(this.selectSlide, this);
        var articles, slide, _i, _len;
        this.enter = 13;
        this.esc = 27;
        this.dash = 189;
        this.ctrl = 17;
        this.cmd = 91;
        this.shift = 16;
        this.alt = 18;
        this.space = 32;
        this.chars = [this.dash, this.space];
        this.r = 82;
        this.PgUp = 33;
        this.Up = 38;
        this.Left = 37;
        this.H = 72;
        this.K = 75;
        this.PgDown = 34;
        this.Down = 40;
        this.Right = 39;
        this.L = 76;
        this.J = 74;
        this.Home = 36;
        this.Home = 35;
        this.f5 = 116;
        this.controlsPressed = [];
        this.controls = [8, 9, 45, 46, 39, 37, this.esc, this.ctrl, this.alt, this.shift, this.enter, this.cmd];
        this.nextKeys = [this.PgDown, this.Down, this.Right, this.L, this.J];
        this.prevKeys = [this.PgUp, this.Up, this.Left, this.H, this.K];
        this.slides = document.getElementById('slides');
        articles = this.slides.querySelectorAll('article');
        document.addEventListener('dblclick', this.fsState);
        window.addEventListener('resize', this.resize);
        document.addEventListener('fullscreenchange', this.fsChange);
        document.addEventListener('webkitfullscreenchange', this.fsChange);
        document.addEventListener('mozfullscreenchange', this.fsChange);
        document.addEventListener("keydown", this.keyDown);
        for (_i = 0, _len = articles.length; _i < _len; _i++) {
          slide = articles[_i];
          slide.addEventListener("click", this.selectSlide);
        }
        this.current = this.getCurrentSlide();
        this.resize();
        this.allSlidesCount = articles.length;
        this.progress = document.querySelector('.progress .value');
        this.redrawProgress();
      }

      slidsterController.prototype.selectSlide = function(event) {
        if (!document.body.classList.contains('fs')) {
          this.current.classList.remove('current');
          this.current = event.currentTarget;
          this.current.classList.add('current');
        }
        return this.redrawProgress();
      };

      slidsterController.prototype.redrawProgress = function(event) {
        var before;
        before = this.allSlidesCount - this.slides.querySelectorAll('.current~article').length;
        return this.progress.style.width = (before * 100 / this.allSlidesCount).toFixed(2) + "%";
      };

      slidsterController.prototype.keyUp = function(event) {
        var index;
        index = this.controlsPressed.indexOf(event.which);
        if (index > -1) {
          return this.controlsPressed.splice(index, 1);
        }
      };

      slidsterController.prototype.keyDown = function(event) {
        var _ref, _ref1, _ref2;
        if ((_ref = event.which, __indexOf.call(this.controls, _ref) >= 0) && this.controlsPressed.indexOf(event.which) < 0) {
          this.controlsPressed.push(event.which);
        }
        if (_ref1 = event.which, __indexOf.call(this.nextKeys, _ref1) >= 0) {
          this.next();
        }
        if (_ref2 = event.which, __indexOf.call(this.prevKeys, _ref2) >= 0) {
          this.prev();
        }
        switch (event.which) {
          case this.enter:
            return this.fsState();
          case this.esc:
            return this.fsStateOff();
        }
      };

      slidsterController.prototype.fsChange = function() {
        return window.document.body.classList.toggle('fs');
      };

      slidsterController.prototype.fsStateOff = function() {
        if (window.document.exitFullscreen) {
          return window.document.exitFullscreen();
        } else if (window.document.msExitFullscreen) {
          return window.document.msExitFullscreen();
        } else if (window.document.mozCancelFullScreen) {
          return window.document.mozCancelFullScreen();
        } else if (window.document.webkitExitFullscreen) {
          return window.document.webkitExitFullscreen();
        }
      };

      slidsterController.prototype.fsStateOn = function() {
        var elem;
        elem = window.document.body;
        if (elem.requestFullscreen) {
          return elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
          return elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          return elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          return elem.webkitRequestFullscreen();
        }
      };

      slidsterController.prototype.fsState = function() {
        if (!document.body.classList.contains('fs')) {
          return this.fsStateOn();
        } else {
          return this.fsStateOff();
        }
      };

      slidsterController.prototype.resize = function() {
        var current, scale;
        current = this.getCurrentSlide();
        scale = 1 / Math.max(current.clientWidth / window.innerWidth, current.clientHeight / window.innerHeight);
        return ['WebkitTransform', 'MozTransform', 'msTransform', 'OTransform', 'transform'].forEach((function(_this) {
          return function(prop) {
            return _this.slides.style[prop] = 'scale(' + scale + ')';
          };
        })(this));
      };

      slidsterController.prototype.getCurrentSlide = function() {
        var current;
        current = this.slides.querySelector('.current');
        if (current === null) {
          current = this.slides.querySelector('article');
          current.classList.add('current');
        }
        return current;
      };

      slidsterController.prototype.next = function() {
        this.current.classList.remove('current');
        this.current = this.current.nextElementSibling;
        if (this.current === null) {
          this.current = this.slides.querySelector('article');
        }
        this.current.classList.add('current');
        return this.redrawProgress();
      };

      slidsterController.prototype.prev = function() {
        this.current.classList.remove('current');
        this.current = this.current.previousElementSibling;
        if (this.current === null) {
          this.current = this.slides.querySelector('article:last-child');
        }
        this.current.classList.add('current');
        return this.redrawProgress();
      };

      return slidsterController;

    })();
    return slidsterController;
  });

}).call(this);
