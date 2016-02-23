(function($)
{
  var thankYou = {
    SELECTORS: {
      NAME: '.js-name',
      SOURCE: '.js-source',
      USERINFO: '.js-userInfo'
    },
    cookieParams: {},

    init: function()
    {
      var me = this;

      me.getCookieValues();

      // cookie retrieval for the victory lap!
      var name = $(me.cookieParams.name.bold());
      name.find('script').remove();
      $(me.SELECTORS.NAME).text(name.html());
      $(me.SELECTORS.SOURCE).text(me.cookieParams.source);
      $(me.SELECTORS.USERINFO).html(
        '<p>Cookie Details: ' + Cookies.get(CONST.PARAMS.DETAILS) + '</p>' +
        '<p>Sourcetag: ' + Cookies.get(CONST.PARAMS.SOURCE) + '</p>' +
        '<p>Name: ' + Cookies.get(CONST.PARAMS.NAME) + '</p>'
      );
    },

    getCookieValues: function()
    {
      var me = this;
      me.cookieParams.name = Cookies.get(CONST.PARAMS.NAME);
      me.cookieParams.source = Cookies.get(CONST.PARAMS.SOURCE);

      // something went wrong, and they shouldn't be here without those cookies.
      if (me.cookieParams.name === undefined
        || me.cookieParams.source === undefined)
      {
        window.location.href = '/index.html';
      }
    }
  };

  // shorthand for $(document).ready()
  $(function()
  {
    thankYou.init();
  });

})(jQuery);
