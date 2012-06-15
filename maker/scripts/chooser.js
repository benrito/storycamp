(function(jQuery) {
  $(window).ready(function() {
    var items = $("section#chooser li");
    items.mouseenter(function() {
      if (!$(this).find("iframe").length) {
        var a = $(this).find("a");
        var template = a.attr("preview").match(/^#editor\.(.+)$/)[1];
        var iframe = $('<iframe scrolling="no"></iframe>');
        var curtain = $('<div class="iframe-curtain"></div>');
        iframe.attr("src", "templates/" + template + ".html");
        a.append(iframe).append(curtain);
      }
      items.removeClass("selected");
      $(this).addClass("selected");
    });
    items.first().mouseenter();
  });
})(jQuery);
