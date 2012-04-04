;(function($) {

  $.fn.sumtr = function(options) {

    var settings = null;
    if(typeof options === 'object')
    {
        settings = options;
    }

    // extend user settings with default settings
    settings = $.extend({}, $.fn.sumtr.defaultSettings, settings || {});

    this.each(function() {
      var s = []; // we hold the results here

      var table       = $(this);
      var bodyRows    = $(this).find(settings.bodyRows);
      var summaryRows = $(this).find(settings.summaryRows);

      bodyRows.each(function(index) {
          var col = 0;
          $(this).children("td").each(function() {
              if ($(this).is(settings.sumCells)){
                if (s.length < col + 1) s[col] = 0;
                var val = settings.readValue($(this));
                s[col] = s[col] + val;
              } else {
                s[col] = "noCount"; // a flag which tells us we're not counting that column
              }
              var colspan = (parseInt($(this).attr('colspan'))) || 1;
              col = col + colspan;
          });
      });

      summaryRows.each(function(index) {
        var col = 0;
        $(this).children("td").each(function() {
            console.log(col)
            if (s[col] != "noCount"){
              $(this).html(settings.formatValue(s[col]));
              settings.onSum($(this), s[col]);
            }
            var colspan = (parseInt($(this).attr('colspan'))) || 1;
            col = col + colspan;
        });
      });

      settings.onComplete(table);
    });
  };

  $.fn.sumtr.defaultSettings = {
    readValue : function(e) { return parseFloat(e.html()); },
    formatValue : function(val) { return val; },
    onComplete : function(e) {  },
    onSum : function(e,sum) { e.data('sumtr', sum); },
    sumCells : '.sum',
    bodyRows : 'tbody tr',
    summaryRows : 'tr.summary',
  };

})(jQuery);