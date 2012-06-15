var Publish = (function() {
  // Originally taken from https://github.com/hackasaurus/webxray/blob/master/static-files/uproot-dialog.html

  var hackpubURL = "http://hackpub.hackasaurus.org/buckets/lovebomb/";
  var ppxURL = "http://toolness.github.com/postmessage-proxied-xhr/";
  
  yepnope({
    test: jQuery.support.cors,
    nope: [ppxURL + 'ppx.min.js', ppxURL + 'ppx.jquery.min.js'],
    complete: function() {
      if (!jQuery.support.cors)
        jQuery.proxyAjaxThroughPostMessage(hackpubURL + 'ppx-server');
    }
  });
  
  function DeferredTimeout(ms) {
    var deferred = jQuery.Deferred();
  
    setTimeout(function() { deferred.resolve(); }, ms);
    return deferred;
  }

  function DeferredPublish(html, originalURL, hackpubURL) {
    return jQuery.ajax({
      type: 'POST',
      url: hackpubURL + "publish",
      data: {
        'html': html,
        'original-url': originalURL
      },
      crossDomain: true,
      dataType: 'json'
    });
  }

  return {
    init: function() {
      $("div.overlay-outer .close").click(function() {
        $("div.overlay-outer").fadeOut(function() {
          $("div.overlay-outer .done").removeClass("visible");
        });
      });
    },
    publish: function(options) {
      var html = options.html;
      var templateURL = options.templateURL;
      if (html.length) {
        $("div.overlay-outer").fadeIn();
        $("div.overlay-outer .throbber").fadeIn();
        var timeout = DeferredTimeout(1000);
        var publish = DeferredPublish(html, templateURL, hackpubURL);
        jQuery.when(publish, timeout).then(function onSuccess(publishArgs) {
          var data = publishArgs[0];
          var url = data['published-url'];
          $("div.overlay-outer .throbber").fadeOut(function() {
            $(".published-url a").attr("href", url).text(url);
            $("div.overlay-outer .done").addClass("visible");
          });
        },
        function onFailure() {
          $("div.overlay-outer .close").click();
        });
      }
    }
  };
})();
