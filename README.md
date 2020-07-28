# MERN MarketPlace

## Details

### Customer

The Customer has the features of viewing the various products, selecting the quantity and ordering the product that the customer needs.
However, The Customer has to wait for the Vedor to dispatch the product that can only be done after the entire product has been ordered by the customers.
The Customer can then review the Vendor and view the reviews of all the vendors.

### Vendor

The Vendor can create the products with the price and quantity. The status of the product remains waiting till not all of the particular product has been ordered.
The Vendor can then dispatch the product and view the reviews of the customer after they have reviewed it.

## Setup

#### Node

For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

For Mac:
```
brew install node
```

#### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).

#### React

```
npm install -g create-react-app
```

To create a new React app:
```
create-react-app name_of_app
```

To run the app, cd into the directory and do:
```
npm start
```

## Running the Application

Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.

To create a database:
```
mongo
``` 
This will open the mongo shell. Type in ```use users``` to create a new database called users.

Run Express:
```
cd backend/
npm install
npm start
```

Run React:
```
cd frontend
npm install/
npm start
```
Navigate to localhost:3000/ in your browser.


