class NavBar

  constructor: ( @navBar ) ->
    @findAndDisableCurrent()

  documentLocation: () ->
    location = window.location.pathname.substring(1)
    if location == ""
      location = "home"
    location

  findAndDisableCurrent: () ->
    location = "." + @documentLocation()

    $(@navBar).find(location).each ->
      $(@).css
        "pointer-events": "none"
      $(@).parent(".nav-item").css
        "border":         "none"

$ ->
  $("#nav").each ->
    new NavBar( @ )
