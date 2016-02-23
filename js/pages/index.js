/**
 * A function, which Loads immediately, that passes in `jQuery` to be known as
 * `$` for portability purposes.
 *
 * Helps to be safe against multiple frameworks that also happen to use `$`.
 *
 * @param {jQuery} $
 * @returns {undefined}
 */
(function($)
{
  var index = {
    // I prefix with `js-` as it makes it apparent to designers not to touch
    // these classes, otherwise it could lead to bodily harm.
    SELECTORS: {
      RESULTS: '.js-results',
      CTA: '.js-CTA',
      TMPL: '#result_tmpl'
    },
    init: function()
    {
      var me = this;

      me.setSourceCookie();
      me.loadOffers();
    },

    /**
     * Load the offers from the API
     * Then, build the template out using microtemplates (details below)
     *
     * @returns {undefined}
     */
    loadOffers: function()
    {
      var me = this;
      $.ajax({
        url: CONST.OFFERS.URL,
        data: {
          filter: CONST.OFFERS.FILTER,
          limit: CONST.OFFERS.LIMIT
        }
      })
      .success(function(data)
      {
        var rows = 0;
        $.each(data.data, function(index, value)
        {
          var image = value.images['140x101'];

          // sanatize script tags
          var title = $(value.title.bold());
          title.find('script').remove();
          var description = $(value.description.bold());
          description.find('script').remove();

          // using the microtemplating system by John Resig
          // via http://ejohn.org/blog/javascript-micro-templating/
          // I commonly use this to make things very clean.
          // Plus, this is very lightweight!
          var $content = $(tmpl($(me.SELECTORS.TMPL).html(), {
            title: title.text(),
            desc: $(description).html(),
            image: image,
            type: value.type,
            editorsPick: value.editors_pick
          }));

          // bind the click event so we can add data to the cookie.
          $content.find(me.SELECTORS.CTA).click(function(e)
          {
            Cookies.set(CONST.PARAMS.DETAILS, JSON.stringify({
              title: title.text(),
              image: image
            }));
            
            return e;
          });

          // clear every 4 rows to prevent funkiness in staggered-height offers
          if (rows && (rows % 4 === 0))
          {
            $(me.SELECTORS.RESULTS).append('<div class="clearfix" />');
          }
          rows++;

          // slap them into the offers list!
          $(me.SELECTORS.RESULTS).append($content);
        });
      })
      .error(function()
      {
        $(me.SELECTORS.RESULTS).html(
          $('<div class="Error" />').text(CONST.ERROR.GENERIC)
        );
      });
    },

    /**
     * Set the source into the cookie
     * @return {undefined}
     */
    setSourceCookie: function()
    {
      var me = this;
      var source = me.getUrlParam(CONST.PARAMS.SOURCE) || '';
      var srcTagArray = $.map(CONST.SRCTAGS, function(value, index)
      {
        return [value];
      });

      var value = srcTagArray.indexOf(source.toLowerCase()) !== -1 
        ? source
        : 'other';

      Cookies.set(CONST.PARAMS.SOURCE, value);
    },

    /**
     * Grab the URL parameter for this page.
     * @returns {String}
     */
    getUrlParam: function(name)
    {
      // search for parameters that start with a `?` or `&`
      // and ends with a `=` without following characters `$` or `#`
       var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.href);

      if (!results)
      {
         return null;
      }
      else
      {
         return results[1] || 0;
      }
    }
  };

  // shorthand for $(document).ready()
  $(function()
  {
    index.init();
  });

  // if i wanted to expose this object for use, I can do:
  // this.pageIndex = index
  // and it will be used as 'pageindex' everywhere else!
  
})(jQuery);
