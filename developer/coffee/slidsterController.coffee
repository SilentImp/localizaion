define [], ()->
  
  class slidsterController
    constructor: ->
      @slides = document.getElementById 'slides'
      document.addEventListener 'dblclick', @fsState
      window.addEventListener 'resize', @resize
      @resize()


    fsState: =>
      document.body.classList.toggle 'fs'

    resize: =>
      current = @getCurrentSlide()
      scale = 1/Math.max(current.clientWidth/window.innerWidth,current.clientHeight/window.innerHeight);

      [
        'WebkitTransform',
        'MozTransform',
        'msTransform',
        'OTransform',
        'transform'
      ].forEach (prop)=>
        @slides.style[prop] = 'scale(' + scale + ')'

    getCurrentSlide: =>
      current = @slides.querySelector '.current'
      if current == null
        current = @slides.querySelector 'article'
      return current

    next: =>
      current = @getCurrentSlide()
      current.classList.remove 'current'
      next = current.nextElementSibling
      if next == null
        next = @slides.querySelector 'article'
      next.classList.add 'current'

    prev: =>
      current = @getCurrentSlide()
      current.classList.remove 'current'
      prev = current.previousElementSibling
      if prev == null
        prev = @slides.querySelector 'article:last-child'
      prev.classList.add 'current'

    #   document.addEventListener 'keydown', @keyHandling.bind(this)

    # keyHandling: (e)->
    #   switch e.which
    #     when 80 then # P Alt Cmd
    #     when 116 then # f5
    #     when 13 then # enter
    #     when 27 then # esc
    #     when 33 then # PgUp
    #     when 38 then # Up
    #     when 37 then # Left
    #     when 72 then # H
    #     when 75 # K
    #       if e.altKey || e.ctrlKey || e.metaKey
    #         return
    #       console.log e.altKey +' ' + e.which+' key pressed'


  return slidsterController