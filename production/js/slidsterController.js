(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define([], function() {
    var slidsterController;
    slidsterController = (function() {
      function slidsterController() {
        this.prev = __bind(this.prev, this);
        this.next = __bind(this.next, this);
        this.getCurrentSlide = __bind(this.getCurrentSlide, this);
        this.resize = __bind(this.resize, this);
        this.fsState = __bind(this.fsState, this);
        this.slides = document.getElementById('slides');
        document.addEventListener('dblclick', this.fsState);
        window.addEventListener('resize', this.resize);
        this.resize();
      }

      slidsterController.prototype.fsState = function() {
        var elem;
        elem = window.document.body;
        console.log(elem.classList.contains('fs'));
        if (!elem.classList.contains('fs')) {
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
          }
        } else {
          if (window.document.exitFullscreen) {
            window.document.exitFullscreen();
          } else if (window.document.msExitFullscreen) {
            window.document.msExitFullscreen();
          } else if (window.document.mozCancelFullScreen) {
            window.document.mozCancelFullScreen();
          } else if (window.document.webkitExitFullscreen) {
            window.document.webkitExitFullscreen();
          }
        }
        return elem.classList.toggle('fs');
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
        }
        return current;
      };

      slidsterController.prototype.next = function() {
        var current, next;
        current = this.getCurrentSlide();
        current.classList.remove('current');
        next = current.nextElementSibling;
        if (next === null) {
          next = this.slides.querySelector('article');
        }
        return next.classList.add('current');
      };

      slidsterController.prototype.prev = function() {
        var current, prev;
        current = this.getCurrentSlide();
        current.classList.remove('current');
        prev = current.previousElementSibling;
        if (prev === null) {
          prev = this.slides.querySelector('article:last-child');
        }
        return prev.classList.add('current');
      };

      return slidsterController;

    })();
    return slidsterController;
  });

}).call(this);
