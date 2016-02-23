#Javascript structure

#Pages
Each page is structured in a way that my previous team was very familiar with.
It helps encapsulate and namespace my logic into variables like `Index`,
`Signup`, and `thankYou`.  If I wanted to, I could expose those variables to
be used outside elsewhere by passing it to global. Given the bottom of the
index.js file:

```
// index.js
  // shorthand for $(document).ready()
  $(function()
  {
    index.init();
  });
```

If it were written like this:

```
// index.js
  // shorthand for $(document).ready()
  $(function()
  {
    index.init();
  });

  this.pageIndex = index;
```

I will now have access to that class, and be able to access the objects within
it, such as the selectors (using pageIndex.SELECTORS.RESULTS).


#Constants
I created a constants file to be able to quickly see what values I can update.
It made refactoring really painless!


#Third Parties

Ideally, I wanted to not use any third-party utilities.  But, given the amount
of time reinventing the wheel, I decided to use two things that I commonly use
everyday as a part of my development.

##Microtemplate
This microtemplate system has helped my team move really fast in building
dynamic elements.  This sort of inline-partial system gives us a lot of clarity
on what the DOM structure looks like.  We typically AJAX these microtemplates
so they really act like a partial for javascript.

##Cookie
As I started the project, I tried to build my own cookie system from scratch.
I had a good implementation going, but it required me to differentiate characters
to split the attributes up.  Rather than reinvent the wheel, I saved time by
getting the commonly-used js cookie


Btw, sorry I use non-BSD style braces! It's a company styleguide which has now
turned into a habit!