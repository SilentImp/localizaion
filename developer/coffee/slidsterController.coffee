define [], ()->
  
  class slidsterController
    constructor: ->
      @enter = 13
      @esc = 27
      @dash = 189
      @ctrl = 17
      @cmd = 91
      @shift = 16
      @alt = 18
      @space = 32
      @chars =  [@dash, @space]
      @r = 82
      
      # вверх
      @PgUp = 33
      @Up = 38
      @Left = 37
      @H = 72
      @K = 75
      
      # вниз
      @PgDown = 34
      @Down = 40
      @Right = 39
      @L = 76
      @J = 74

      #вначало
      @Home = 36

      #вконец
      @Home = 35

      #f5
      @f5 = 116

      @controlsPressed = []
      @controls = [8, 9, 45, 46, 39, 37, @esc, @ctrl, @alt, @shift, @enter, @cmd]
      @nextKeys = [@PgDown, @Down, @Right, @L, @J]
      @prevKeys = [@PgUp, @Up, @Left, @H, @K]

      @slides = document.getElementById 'slides'
      document.addEventListener 'dblclick', @fsState
      window.addEventListener 'resize', @resize
      document.addEventListener 'fullscreenchange', @fsChange
      document.addEventListener 'webkitfullscreenchange', @fsChange
      document.addEventListener 'mozfullscreenchange', @fsChange
      document.addEventListener "keydown", @keyDown
      
      @current = @getCurrentSlide()
      @resize()
      @allSlidesCount = @slides.querySelectorAll('article').length
      @progress = document.querySelector '.progress .value'
      @redrawProgress()



    redrawProgress: (event)=>
      before = @allSlidesCount - @slides.querySelectorAll('.current~article').length
      @progress.style.width = (before*100/@allSlidesCount)+"%"


    keyUp: (event)=>

      index = @controlsPressed.indexOf event.which
      if index > -1  
        @controlsPressed.splice index, 1

    keyDown: (event)=>
      if event.which in @controls and @controlsPressed.indexOf(event.which)<0
        @controlsPressed.push event.which

      if event.which in @nextKeys
        @next()

      if event.which in @prevKeys
        @prev()

      switch event.which 
        when @enter
          @fsState()

        when @esc
          @fsStateOff()

    fsChange: =>
      window.document.body.classList.toggle 'fs'

    fsStateOff: =>
      if window.document.exitFullscreen
          window.document.exitFullscreen()
        else if window.document.msExitFullscreen
          window.document.msExitFullscreen()
        else if window.document.mozCancelFullScreen
          window.document.mozCancelFullScreen()
        else if window.document.webkitExitFullscreen
          window.document.webkitExitFullscreen()

    fsStateOn: =>
      elem = window.document.body
      if elem.requestFullscreen
          elem.requestFullscreen()
        else if (elem.msRequestFullscreen)
          elem.msRequestFullscreen()
        else if (elem.mozRequestFullScreen)
          elem.mozRequestFullScreen()
        else if (elem.webkitRequestFullscreen)
          elem.webkitRequestFullscreen()


    fsState: =>
      if not document.body.classList.contains 'fs'
        @fsStateOn()
      else
        @fsStateOff()

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
        current.classList.add 'current'
      return current

    next: =>
      @current.classList.remove 'current'
      @current = @current.nextElementSibling
      if @current == null
        @current = @slides.querySelector 'article'
      @current.classList.add 'current'
      @redrawProgress()

    prev: =>
      @current.classList.remove 'current'
      @current = @current.previousElementSibling
      if @current == null
        @current = @slides.querySelector 'article:last-child'
      @current.classList.add 'current'
      @redrawProgress()

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