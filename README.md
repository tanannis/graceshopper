## Summary

http://gracebakes.herokuapp.com/home

Welcome to Grace Bakes, our ecommerce platform! Grace Bakes is an online bakery that specializes in sweet treats. Special thanks to our bakers: Annie, Annis, Laura, Riley =)

## Setup Secret File

Don't forget to create a secret.js file and add it to your .gitigore file. Your secret file should include the info below:

* Google Oauth Info:

- process.env.GOOGLE_CLIENT_ID = "YOUR GOOGLE CLIENT ID GOES HERE"
- process.env.GOOGLE_CLIENT_SECRET = "YOUR GOOGLE CLIENT SECRET GOES HERE"

* Google account to send confirmation emails :

- process.env.GOOGLE_EMAIL = "YOUR GOOGLE EMAIL GOES HERE"
- process.env.GOOGLE_PASSWORD = "YOUR GOOGLE PASSWORD GOES HERE"

* Stripe API Info:

- process.env.STRIPE_SECRET_KEY = "YOUR STRIPE SECRET KEY GOES HERE"
- process.env.STRIPE_PUBLIC_KEY = "YOUR STRIPE PUBLIC KEY GOES HERE"

## Start

Running `npm install` and `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.
