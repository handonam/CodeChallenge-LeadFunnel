/**
 * Constant values are hoisted up here to help understand what external
 * variables we're manipulating with.  It helps with refactoring.
 * For example, if we change the cookie value 'source' to something else.
 */
var CONST = {
  SRCTAGS: {
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter'
  },
  PARAMS: {
    NAME: 'name',
    SOURCE: 'source',
    DETAILS: 'details'
  },
  OFFERS: {
    URL: 'http://localhost/api/posts.json',
    FILTER: 'popular',
    LIMIT: 8
  },
  SUBMIT_URL: 'http://localhost/submissions',
  ERROR: {
    GENERIC: 'Sorry, we ran out of unicorn dust. Please try again shortly!'
  }
};
