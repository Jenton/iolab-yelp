<h1>Yelp Tagger</h1>

<h3>Project Description</h3>
<p>Currently, the only tags you can add to a Yelp review are 'Useful', 'Funny' and 'Cool'. We feel that these tags provide useless metadata to a review (and even incentivize reviewers to generate "funny" content that may not necessarily be valuable other than for comedic relief). Our project changes those tags to ones that help classify reviews based on whether they are about food, about the service, the atmosphere, and/or the price of the restaurant. Our project also allows users to sort a restaurant's Yelp reviews based on those tags. So if a user wanted to view a restaurant's reviews that were more focused on the food, he or she could do that now. Currently, Yelp has no function that allows you to do this.
<p>As a proof of concept, we also modified the Write a Review page to automatically tag a review as it is written, by analyzing the text. Unfortunately, because we do not know the ID of a review before it is submitted, we cannot actually do this -- it would have to be done on the backend.</p>

<h4>Metacrap Justification</h4><p>We believe that the current Yelp review tags are biasing the way Yelp users write their reviews. Instead of writing a review that actually gives helpful information to other users about a restaurant, we feel that many reviews are written solely in order to get a 'Funny' or a 'Cool' tag from other users. The tags that Yelp are providing are a type of metric that is influencing the results, as seen in the user reviews. This creates a body of reviews that is strongly influenced by the metrics provided to judge those reviews, as suggested by Doctorow's 6th obstacle ("metrics influence results"). We believe that creating metrics/tags that consumers are actually interested in will create a more useful corpus of reviews.</p>

<p>Furthermore, Doctorow's 7th obstacle states that "There's more than one way to describe something". For reviews on Yelp, this obstacle couldn't be more evident. Everyone has different interpretations for what a restaurant review should be, and how it should be written. Because there's no good way to tag and sort the reviews of a restaurant based on content, you end up getting little to no metadata for each review. With our project, we are allowing users to add tags such as 'About Food' or 'About Service' to the reviews in order to create more reliable metadata to Yelp reviews. Granted, people will still have different ways to interpret which reviews are about a restaurant's service or price, we believe our project provides better and more reliable metadata than what currently exists on the website.</p>

<h3>Team Members and Roles</h3>
<p>Victor Starostenko - Back End/Database<br/>
Jenton Lee - Back End/Database<br />
Dan Tsai - Front End/Chrome Extension<br />
Kate Hsaio - Front End/Chrome Extension</p>

<h3>Technologies Used</h3>
<p>HTML/CSS/Javscript/jQuery for the Chrome Extension, MySQL/PHP for the database</p>

<h3>Link to Demo Version</h3>
<p>You can download the CRX from the repo on github here: https://github.com/dantsai/iolab-yelp/blob/master/iolab-yelp.crx</p>

<h3>Known Bugs</h3>
<p>The extension currently only sorts by the current page of reviews. This is because Yelp provides no way to get all reviews associated with a business (even with the API, as far as we can tell).</p>
<p>Moreover, the "Write a Review" functionality exists primarily as a proof of concept, and is not functional, but pops up a JavaScript alert showing what would happen.</p>
