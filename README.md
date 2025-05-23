# 2800-202510-BBY08 - BeCool

**Hosted Link - Check out our Web App!**
https://two800-202510-bby08.onrender.com/ 

## Project Information

**Project Title:** BeCool </br>
**Team Name:** BBY-08 </br>
**Team Members:** 
- Shivaun Bartoo    
- Luka Poledica
- Ana Silva
- Wynn Le
- Isabel Cabral
</br>

**Project Description** </br>
Our app allows users to visualize the contents of a community fridge/pantry from wherever they are, edit the contents by donating and taking items when within a specified radius, receive notifications when items have been added to their favourite locations, and leave reviews for their visited locations. Community organizers can create and manage their own locations to keep information up to date.

## Tech Stack
Frontend:
- HTML 5
- CSS 3
- JavaScript
- Bootstrap 5

Backend:
- Node.js 18
- NPM Modules:
    - "@huggingface/inference": "^3.13.1" 
    - "bcrypt": "^5.1.1" 
    - "cloudinary": "^2.6.1" 
    - "connect-pg-simple": "^10.0.0" 
    - "dotenv": "^16.5.0" 
    - "ejs": "^3.1.10" 
    - "express": "^5.1.0" 
    - "express-session": "^1.18.1" 
    - "joi": "^17.13.3" 
    - "multer": "^1.4.5-lts.2" 
    - "nodemailer": "^7.0.3" 
    - "pg": "^8.15.6"

Database:
- PostgreSQL

APIs:
- Google Maps (Including Geocoding API and Maps JavaScript API from the GoogleMaps API dashboard)
- Cloudinary
- Huggingface

Hosting Software:
- Aiven Database Hosting
- Render Web Service Hosting

Misc. Collaboration tools:
- Figma
- Trello
- Git & Github

AI:
- Github CoPilot for assistance in documentation/comment generation and occasional misc. problem solving 
---

## File Contents
```
C:.
│   .env
│   .gitignore
│   api.js
│   authentication.js
│   authorization.js
│   ca.pem
│   create_manageStorage.js
│   eslint.config.mjs
│   index.js
│   notification-emails.js
│   package-lock.json
│   package.json
│   profile_route.js
│   README.md
│   review_reply.js
│   utils.js
│
+---css
│       404.css
│       about.css
│       addreview.css
│       app.css
│       browse.css
│       contents-modal.css
│       contents.css
│       create_new.css
│       footer.css
│       header.css
│       index.css
│       login.css
│       manage.css
│       map.css
│       profile.css
│       reviews.css
│
+---data
│       datasets.json
│       food_classification_tests.txt
│
+---img
│       becoolfavicon.ico
│       becool_dark.png
│       becool_light.png
│       becool_solid.png
│       hero_fridge.png
│       index_circle.svg
│       index_curve.svg
│
+---js
│       authentication-client.js
│       browse.js
│       city.js
│       config.js
│       contents.js
│       contentTabs.js
│       create_new.js
│       food-classify.js
│       food_classify_tuning.js
│       header.js
│       help.js
│       imageUploadUtil.js
│       locational.js
│       manage.js
│       profile.js
│       reviews.js
│       userLocation.js
│
+---views
    │   404.ejs
    │   about.ejs
    │   browse.ejs
    │   contents.ejs
    │   create_account.ejs
    │   create_new.ejs
    │   index.ejs
    │   login.ejs
    │   manage.ejs
    │   map.ejs
    │   profile.ejs
    │   reviews.ejs
    │
    +---partials
            browse-help.ejs
            content-help.ejs
            content-rows.ejs
            contents-tab.ejs
            footer.ejs
            header.ejs
            mapPop.ejs
            review-card.ejs
            storage-card.ejs
```
---

## Features
- Browse and favourite community fridges/pantries
    - On our home page, or /browse, you will be able to see cards of all Community Fridges/Pantries currently in our database, organized by closest to farthest from your current location.
    - Every location card includes the distance of that location, a restocked badge if that location has received any donations in the last 24 hours, a calculated rating based on that locations reviews on the application.
    - You can favourite locations you want to view more often, making them jump to the top of the browse list (favouriting a fridge will also enable email notifications when it has been restocked - you can disable notifications under your profile settings based on your preferences).
    - You can filter whether you  would like to only see fridges, pantries, or both based on the buttons on the upper left of the main cards display
    - You can toggle a map view of the fridges based on the toggle switch on the upper right of the main cards display to visualize where all the places are located

- View the contents of a fridge, donate, and take items
    - By clicking on a location card (or selecting that location on the pin in the map view) you can view the contents of that location.
    - When you are within a 2km radius of a fridge/pantry, the donate and take features become enabled! To donate items, simply click on the donate button and fill in the required information. Please note that the item name input is verified by AI to ensure that only recognized food items are allowed into a fridge or pantry.
    - If you are wanting to remove an item from the location, simply click the take button, enter the quantities of the items you are removing, and click confirm to remove those items.

- Get directions to a fridge/pantry, see and post location reviews
    - On the contents page, you will notice some tabs just below the nav bar. By clicking on the tab to the left of the selected contents tab, you will see the location of the fridge/pantry on a map, and a link to the google maps directions from your current location to that fridge/pantry.
    - On the right side of the contents tab, you will see the reviews tab! Here you can read all the reviews of this fridge/pantry, and even add your own (you must be logged in to post a review). When posting a review, you may upload photos to support your claim, and give the location a star rating.
    - You are also able to reply to reviews that have been posted!

- Create and manage a new fridge or pantry
    - If you are a community organizer or part of a charity that creates and supports these community fridges and pantries, you can also create a new location under your profile!
    - Under the account page, simply scroll down to "My storages" and click "new storage" to add a new fridge/pantry to the application.
    - When you are the "owner" of a fridge, a new tab will appear for you under that location's contents page with a settings icon.
    - By clicking on this tab, you can then "manage" your fridge or pantry, updating information as needed, updating the cover photo, and displaying when the fridge was last cleaned as a courtesy for users.
---

## Credits and References
**Developed by:** Ana Silva, Shivuan Bartoo, Luka Poledica, Isabel Cabral,  Wynn Le </br>
**APIs Used:**
- GoogleMaps Geocoding: https://developers.google.com/maps/documentation/geocoding/requests-geocoding?_gl=1*2mpn5p*_up*MQ..*_ga*ODg4MTU4NjAxLjE3NDgwMjQzNzA.*_ga_NRWSTWS78N*czE3NDgwMjQzNzAkbzEkZzEkdDE3NDgwMjQzNzEkajAkbDAkaDA
- GoogleMaps JavaScript: https://developers.google.com/maps/documentation/javascript?_gl=1*127ho9y*_up*MQ..*_ga*NTA2NzgzMjIwLjE3NDgwMjM2NTg.*_ga_NRWSTWS78N*czE3NDgwMjM2NTgkbzEkZzAkdDE3NDgwMjM2NjUkajAkbDAkaDA.
- Cloudinary: https://cloudinary.com/documentation/image_upload_api_reference
- HuggingFace: https://huggingface.co/docs/huggingface.js/index 

Code snippets for geolocational distance algoirthm were adapted from resources such as Stack Overflow and MDN Web Docs.

**Acknowledgements** </br>
Thank you to our instructors and mentors at BCIT, we would especially like to thank Hassan for his guidance throughout our project. 

## Contact Information
**Email**
becoolcommunityproject@gmail.com