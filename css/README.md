#File Structure
The CSS files are lightly structured with BEM (https://en.bem.info/).

##Blocks
If you take a look at the `offer.css` file, the elements are written in a way
that promotes portability.  These blocks can be dropped into anywhere, and should
function without conflict, as long as another CSS doesn't mess with it. It will
also not modify other styles that aren't within that block.

##Page
Anything page-specific will go here.

##Common
A must-have stylesheet for all pages. (Also could be known as a base stylesheet)