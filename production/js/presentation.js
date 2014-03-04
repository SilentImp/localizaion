requirejs(['domReady','slidsterController', 'highlight.pack','l20n.min'], function(domReady, slidsterController){
  domReady(function () {
    new slidsterController();
    var code = document.querySelectorAll('pre code'),
        count = code.length;
    while(count--){
      hljs.highlightBlock(code[count]);
    }
  });
});