# CodeChallenge-LeadFunnel

This is a code challenge for an interview with a company that specialized in
lead generation.  All files, with the exception of this README and git files, were sent to the company for an interview.

# The Prompt
I had to generate 3 steps of the conversion funnel:

 - **Landing**: The user will select a product from a grid to sign up with in the next step
 - **Signup Form**: The user will register themselves with that product
 - **Thank You**: The confirmation, with data that I collected along the way.

It had to be mobile-first optimized using only front-end HTML/CSS/JS.

### Landing
##### Cookie Handling
The company requested that the sourcetag should be carried through the funnel. The user will enter the funnel with a GET parameter such as `source=Google`.

example: `http://localhost/index.html?source=Google`

The GET parameter must them be used as a cookie for the next step.

##### API Content
The company needed products from a JSON endpoint to be displayed, which leads them to the signup form step of the funnel.

### Signup Form
The company needed a basic login form that included:
 - Name (First and last)
 - Email
 - Phone
 - Street
 - City
 - State
 - Zip
 - Source Tag from previous step
 - My own name (Hanam) for their verification

### Thank You
A confirmation page that had to show the data values I collected along the way, as well as the image of the product used on the landing page

# My strategies
### CSS
For organizing my CSS, I implemented my novice knowledge of [BEMCSS](http://getbem.com/introduction/), a CSS naming convention that helps alleviate headaches with specificity collisions. This also allowed me to figure out which code was mine, and which was bootstrap (provided by the prompt).

### JS
I made use of a third party microtemplating engine by John Resig to create dynamic product blocks.

I also used jsCookie off the shelf to save time, while also being fairly lightweight and simple.

# Result
Completed within 10 hours with the best code result, leading to a job position.

# Retrospectives
Some things I immediately thought of after completing the prompt and sending it to them:
- I used BEM to fight with bootstrap CSS, which led to some specificity conflicts. It was due to the way I wrote them incorrectly.
- Cookies have a 4kb limitation, so I only put in the necessary information needed through the workflow. Ideally, I would have separated them into different cookie values. But, given the necessary information, I stored the most minimal information I could need.
- Cross browser testing: I didn't have access to IE.
- Placeholding data, or an empty container with a message, when the API is down
