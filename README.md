# Twitter-Clone
# Deliverables
## Link to the repo:

https://github.com/Yiranluc/Twitter-Clone

## This project is deployed on Netlify and Vercel:

You can start vist our Twitter clone project from [link](https://twitter-clone-cm03.onrender.com/)

## Collaborators:
 - Yiran Wang, Bingfan Tian

## Bonus points we attempted:
 - Early Submission
 - Password Encryption
 - Image Status Updates

## What we implement:
 - Login/Logout
 - Sign up new user with basic input check
 - Home page, view without login and post tweet with login
 - post a new tweet with image(by image url)
 - Tweet detail page, can edit the tweet if you are the author
 - Personal profile page, can edit the profile if this is your account

## Writeup: Collaborators wrote this together
### What were some challenges you faced while making this app?
For us, the biggest challenge was checking and keeping track of the login user status. In addition, we referenced tailwind CSS instead of traditional CSS files to increase the maintainability of our code. Some Youtube videos gave us design ideas.
[tailwind CSS](https://tailwindcss.com/)

[reference 1](https://www.youtube.com/watch?v=P4kuSxpjA48)

[reference 2](https://www.youtube.com/watch?v=g-bY6hf6GCw)

[reference 3](https://www.youtube.com/watch?v=tSwVLJZpXyQ)

### Given more time, what additional features, functional or design changes would you make?

Given more time, we would like to continue implementing the features of commenting, retweeting, replying and liking, and following other users. Currently, we just add some buttons on the front end, but these buttons do not perform any function. This is our next step!


### What assumptions did you make while working on this assignment?

We assumed that the players in our game know a lot of 6-letter and 7-letter English words. Since in our games, we only allow user to enter words with either 6 or 7 letters. And in our word database, we only included around 2000 words in total which can be identified as valid English words. In addition, we did not check if the words we included are rather common or not. It means that players are very likely to be prompted with the message 'the word is not valid' although they entered a valid English word in the game, simply because our database is not huge enough.

### How long did this assignment take to complete?

2 weeks in total.


Run backend
1. `npm install express`
2. `node server.js`

Run Frontend
1. `npm install`
2. `npm start`
