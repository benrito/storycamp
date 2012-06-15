var Navigation = (function() {
  var WEIRD_CSS_TRANSITION_DELAY = 10;
  var TRANSITION_END_EVENTS = "transitionend oTransitionEnd webkitTransitionEnd";
  
  function currentSection() {
    return $("section").not(".out-on-right, .out-on-left")
  }

  function goTo(sectionID) {
    var next = $("section" + sectionID);
    var current = currentSection();

    function maybeManuallyTriggerTransitionEnd() {
      if ($("html").hasClass("no-csstransitions")) {
        current.trigger("transitionend");
        next.trigger("transitionend");
      }
    }
    
    if (!next.length)
      return;
    if (next[0] == current[0]) {
      current.trigger("transitionend");
      return;
    }
    if (next.hasClass("out-on-right")) {
      current.addClass("out-on-left");
      next.show();
      setTimeout(function() {
        next.removeClass("out-on-right");
        next.prevAll(".out-on-right").hide()
          .removeClass("out-on-right").addClass("out-on-left");
        maybeManuallyTriggerTransitionEnd();
      }, WEIRD_CSS_TRANSITION_DELAY);
    } else {
      current.addClass("out-on-right");
      next.show();
      setTimeout(function() {
        next.removeClass("out-on-left");
        next.nextAll(".out-on-left").hide()
          .removeClass("out-on-left").addClass("out-on-right");
        maybeManuallyTriggerTransitionEnd();
      }, WEIRD_CSS_TRANSITION_DELAY);
    }
  }

  function parseHash() {
    var hash = window.location.hash;
    if (hash.length < 2)
      hash = "#intro";
    var parts = hash.split('.');
    return {
      base: parts[0],
      arg: parts[1]
    };
  }

  function goToHash() {
    goTo(parseHash().base);
  }

  return {
    init: function() {
      $("section").bind(TRANSITION_END_EVENTS, function(event) {
        if (event.target != this)
          return;
        if ($(this).is(".out-on-right, .out-on-left")) {
          $(this).hide();
          $("header").removeClass('section-' + this.id);
        } else {
          $(this).trigger("navshow", parseHash().arg);
          $("header").addClass('section-' + this.id);
        }
      });
      $(window).bind('hashchange', goToHash);
      goToHash();
    }
  };
})();
