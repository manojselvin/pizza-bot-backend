### Pizza Bot (Backend) - DOCUMENTATION

#### Live Demo -> [View Demo](https://pizza-bot-yellow-messenger.herokuapp.com/)

#### Postman Collection (Including API's)
1. Open `Postman`.

2. Click on `Import` from toolbar.

3. Choose tab `Import From Link`.

4. Paste the collection link `https://www.postman.com/collections/14250005c131ba872b32` and click on `Import`.

5. That's it. Now you have all the API's in your `Postman`.

#### Steps to run the project `pizza-bot-backend` locally
1. Clone the repo.

2. Run `npm i` , To install all the dependencies. 

3. Edit the `'.env.dev'` file in project root with your local MONGODB URI or you can use the one provided.

4. If you haven't changed the MONGO DB URI , `Go to Step 5`. If you have used your local MONGO DB URI, Go to `Data Migrations` and then `Go to Step 5`, 

5. Run `npm run start-watch`, to start the server

6. Done! You have the server working.

7. Verify it by using `localhost:PORT_NO` where port no. is the one you have mentioned in .env.dev file. eg. for port 3000 it is `localhost:3000`


#### Data Migrations (Only `products` collection has to be migrated)
1. Go to directory `public/data/products/data.json`
2. Use this json data in the API for products from Postman collection to seed the products collection.


#### Notes:
1. Followed Microservices architecture by keeping every services in it's own directory.
2. Also, For Microservices all the service should have it's own database but for this assignment i kept it as one.
3. For the live demo the project is hosted on heroku and MongoDB for same is hosted using MongoDB Atlas.
4. Caching is not done. It can be implemented if the frequency for adding or updating the products is much longer.