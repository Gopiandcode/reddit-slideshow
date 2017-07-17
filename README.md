# reddit-slideshow
## A simple little Reddit Slideshow...
Running at:

Just a little project I came up with for fun. I know many of these already exist, but it seemed like a fun challenge.
Most of the development time was spent on the HTML styling. Obviously, as it was all handcrafted, it's not 100% 
compatible with all browsers. 
Hey, what can I say? I'm not a web developer.

Supports multiple sources, auto-forward, url-based parameters - as in like how redditp does it whereby if the base url from
a reddit url is replaced with the server host, the application can create a slideshow out of the content that would have been
there prior.

Overall, I'm quite pleased with how it turned out - consistent colour scheme, nice font choice...

I wanted it to be an excursion into considering how professional web apps are developed.

While my disdain for the tragic combination of weak and dynamic typing that is Javascript's type system remains ever strong,
I am beginning to gain an understanding for why it's so popular in web development despite these issues. The blazing speed at
which I can set up simple prototype web sites thanks to it's well designed abstraction of the complexities of it's underlying 
framework (looking at you Django), make it brilliant for getting things off the ground.

This was also my first big project using preprocessors for HTML and JS - I am certainly hooked on them. While HTML still remains
a unwieldy tool in my toolbelt, I find that the pains of it's use are somewhat dulled by the clarity provided by these preprocessors.

## Design Process
### Step 1: Initial Design
It all began when I sat down to do some sketching for a break. For references, I pulled up the reddit slideshow at redditp, but for
some reason it doesn't work on the version of firefox I'm using. So I'm just about to swap over to Edge to continue, when I think
"Hey, It'd be quite fun to try making my own....". And so the journey began.

As with all projects, development started with a diagram. As the complexity of the buisness logic would be relatively simple in this
application, the focus was on UI. After some iniial considerations, I came up with this....


### Step 2: HTML Styling
Following that, the next day was spent styling the pages I would use, to an extent such that they vaguely resembled something
professional. Once completed, I had pages as such.


### Step 3: Backend Logic
Finally I got to the stuff I enjoyed, although unfortunately, in this project that was limited. An hour or so later and I had set up
most of the server side processing needed. Now the connections between pages were set up, all that was left to do was to build the
client side JS.


### Step 4: Client-Side Logic
Relatively new experience for me, most of my js prior had been DOM manipulation, and it was enjoyable learning how much more
client side Javascript could do (If we close our eyes and ignore it's type system). After a few hours, I was left with the completed
product, all that was left to do was to host it and document the process.


