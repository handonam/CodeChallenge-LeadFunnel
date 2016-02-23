(function($)
{
  var signup = {
    // I prefix with `js-` as it makes it apparent to designers not to touch
    // these classes, otherwise it could lead to bodily harm.
    SELECTORS: {
      OFFER: '.js-offer',
      SUBMIT: '.js-submit',
      TMPL: '#offer_tmpl',
      FORM: '.js-Form',
      FIELDS: {
        FIRST: '.js-first',
        LAST: '.js-last',
        EMAIL: '.js-email',
        PHONE: '.js-phone',
        ADDRESS: '.js-address',
        CITY: '.js-city',
        STATE: '.js-state',
        ZIP: '.js-zip'
      }
    },
    VALIDATION: {
      MSG: {
        REQ: ' is required',
        INVALID: ' is invalid'
      }
    },
    // where cookie values will be stored
    cookieParams: {},
    
    init: function()
    {
      var me = this;

      me.getCookieValues();
      me.attachFormHandler();
    },

    /**
     * Attach the form handler's submit
     * 
     * @returns {undefined}
     */
    attachFormHandler: function()
    {
      var me = this;
      $(me.SELECTORS.SUBMIT).click(function(e)
      {
        e.preventDefault();
        if (me.validateFields())
        {
          var paramObj = {};
          paramObj.applicant = 'HD';
          paramObj.cookie = JSON.stringify(me.cookieParams);
          $.each($(me.SELECTORS.FORM).serializeArray(), function(_, value)
          {
            paramObj[value.name] = value.value;
          });

          $.post(CONST.SUBMIT_URL, paramObj)
          .success(function()
          {
            Cookies.set(CONST.PARAMS.NAME, paramObj.firstName);
            window.location.href = '/thank-you.html';
          });
        }
      });
    },

    /**
     * Validate input fields for missing or invalid input.
     * Ensure there are no errors so it will pass.
     * 
     * @returns {Boolean}
     */
    validateFields: function()
    {
      var me = this;

      var errors = $.map(me.SELECTORS.FIELDS, function(value, index)
      {
        var inputVal = $(value).val();
        
        if (!inputVal.trim().length)
        {
          $(value).addClass('Form__Input--Error');
          $(value + '__error').text(
            $(value).attr('placeholder') + me.VALIDATION.MSG.REQ);

          return [value];
        }
        else
        {
          var error = false;
          switch (value)
          {
            // a regex I had offhand from a previous project.
            case me.SELECTORS.FIELDS.EMAIL:
              var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              error = !emailRegex.test($(value).val());
              break;

            // will try 7 digit or a 10 digit test
            case me.SELECTORS.FIELDS.PHONE:
              var tenDigitRegex = /^[\(]?\d{3}[\)]?[- \.]?\d{3}[- \.]?\d{4}$/;
              error = !(tenDigitRegex.test($(value).val()));
              break;

            // Checks 5 and 5+4 postal codes.
            case me.SELECTORS.FIELDS.ZIP:
              var fiveDigitRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
              error = !(fiveDigitRegex.test($(value).val()));
              break;

            // Checks 2 alphas from a-z (case insensitive).
            // It would be better to have a list of 50 states.
            // But, did this for brevity.
            case me.SELECTORS.FIELDS.STATE:
              var stateRegex = /\b([A-Z]{2})\b/i;
              error = !(stateRegex.test($(value).val()));
              break;

            default:
              break;
          }
          
          if (error)
          {
            $(value).addClass('Form__Input--Error');
            $(value + '__error').text(
              $(value).attr('placeholder') + me.VALIDATION.MSG.INVALID);

            return [value];
          }
          else
          {
            $(value).removeClass('Form__Input--Error');
            $(value + '__error').empty();
          }
        }
      });

      return errors.length === 0;
    },

    getCookieValues: function()
    {
      var me = this;
      me.cookieParams.details = Cookies.get(CONST.PARAMS.DETAILS);
      me.cookieParams.source = Cookies.get(CONST.PARAMS.SOURCE);

      // something went wrong, and they shouldn't be here without those cookies.
      if (me.cookieParams.details === undefined
        || me.cookieParams.source === undefined)
      {
        window.location.href = '/index.html';
      }


      var $content = $(tmpl($(me.SELECTORS.TMPL).html(), 
        JSON.parse(Cookies.get(CONST.PARAMS.DETAILS))));


      $(me.SELECTORS.OFFER).html($content);
    }
  };

  // shorthand for $(document).ready()
  $(function()
  {
    signup.init();
  });

})(jQuery);
