const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/products');
let Order = require('./models/orders');
let ret = [];

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
// Getting all the products search
userRoutes.route('/product/search').post(function(req, res) {
    console.log(req.body)
    if(req.body['name']===''){
        Product.find(function(err, product) {
            if (err) {
                console.log(err);
            } else {
                res.json(product);
            }
        });
    }
    else{
        Product.find({name:req.body['name']},function(err, product) {
            if (err) {
                console.log(err);
            } else {
                res.json(product);
            }
        });
    }
});
userRoutes.route('/product/rating').post(function(req, res) {
    Product.find().sort({owner:-1}).exec(function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});
userRoutes.route('/product/price').post(function(req, res) {
    Product.find().sort({price:-1}).exec(function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});
userRoutes.route('/product/quantity').post(function(req, res) {
    Product.find().sort({quantity:-1}).exec(function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});
// Getting all the products
userRoutes.route('/product/view').get(function(req, res) {
    Product.find(function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});
// Getting all the orders
userRoutes.route('/orders/view').get(function(req, res) {
    Order.find(function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});
function adding(ret,data){
    ret.push(data);
    return ret;
}
function view_ret(ret){
    console.log(ret)
}
// Getting all the orders for a perticular vendor
userRoutes.route('/orders/view/cus1').post(function(req, res) {
    ret = [];
    const user = req.body['name']
    Product.find(function(err,product){
        for( i in product){
            if(product[i].owner===user){
                Order.find({order:product[i].name},function(err,order){
                    for(j in order){
                        adding(ret,order[j]);
                    }
                })
            }
        }
    }).then(
        res.status(200).json(ret)
    )
});
userRoutes.route('/orders/view/cus2').post(function(req, res) {
    console.log(ret)
    res.status(200).json(ret);
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let password = req.body;
    bcrypt.hash(password.password,saltRounds).then(function(hash){
        req.body.password=hash;
        let user = new User(req.body);
        user.save()
            .then(user => {
                res.status(200).json({ 'User': 'User added successfully'});
            })
            .catch(err => {
                res.status(400).send('Error');
            });
    });
});
   
// Adding a new product
userRoutes.route('/product/add').post(function(req, res) {
    let prod = new Product(req.body);
    prod.save()
        .then(prod =>{
            res.status(200).json(req.body);
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});
// Reviewing a user
userRoutes.route('/user/review').post(function(req, res) {
    let id = req.body;
    Product.find({name:id['order']}, function(err, product) {
        console.log(product[0])
        Order.find({order:product[0]['name']},function(err,order){
            console.log(order[0])
            User.findOne({username:product[0]['owner']},function(err,user){
                user['rating_sum']+=order[0]['rating']
                user['review'].push((order[0]['review']))
                user['ratings']+=1
                User.updateOne({username:product[0]['owner']},
                {ratings:user['ratings'],rating_sum:user['rating_sum'],review:user['review']})
                    .then(
                        res.status(200)
                    )
            })
        })
    });
});

// Adding a new order
userRoutes.route('/order/update').post(function(req, res) {
    let prod = {
        name:req.body['order'],
        quantity: req.body['quantity']
    }
    Product.findOne({name:prod.name},function(err,pro,new_const){
        if(prod.quantity>pro['quantity']){
            res.json({'User':'invalid'})
        }
        else{
            pro['quantity']-=prod.quantity;
            pro['ordered']+=prod.quantity;
            if(pro['quantity']>0){
                Product.updateOne({name:prod.name},{quantity:pro['quantity'],ordered:pro['ordered']})
                .then(
                        res.json({'User':'Success'})
                    )
            }
            else{
                Product.updateOne({name:prod.name},{quantity:pro['quantity'],status:'ready',ordered:pro['ordered']})
                .then(
                        res.json({'User':'Success'})
                    )
            }
        }
    })
});
userRoutes.route('/order/add').post(function(req, res) {
    let orde = new Order(req.body);
    orde.save()
        .then(
            res.status(200).json(req.body)
        )
        .catch(err =>{
            res.status(400).send('Error');
        })
});
// Removing a product
userRoutes.route('/product/delete').post(function(req, res) {
    let const_id = req.body['id']
    Product.findByIdAndUpdate(const_id, {
        $set : {'status':'deleted'}
    }).then(
        res.status(200)
    )
    .catch(err => {
        res.status(400).send('Error');
    })
});
// Reviewing a order
userRoutes.route('/order/review').post(function(req, res) {
    let const_id = req.body
    mongoose.set('useFindAndModify', false);
    Order.findOneAndUpdate({order:const_id['order']}, {
        $set : {'rating':const_id['rating'],'review':const_id['review'],'status':'reviewed'}
    }).then(
        res.status(200)
    )
    .catch(err => {
        res.status(400).send('Error');
    })
});

// Dispatching a product
userRoutes.route('/product/dispatch').post(function(req, res) {
    let const_id = req.body['id']
    Product.findOneAndUpdate({name:const_id}, {
        $set : {'status':'dispatched'}
    }).then(
        res.status(200)
    )
    .catch(err => {
        res.status(400).send('Error');
    })
});
userRoutes.route('/orders/dispatch').post(function(req, res) {
    let const_id = req.body['id']
    Order.findOneAndUpdate({order:const_id}, {
        $set : {'status':'dispatched'}
    }).then(
        res.status(200)
    )
    .catch(err => {
        res.status(400).send('Error');
    })
});
//Log-in
userRoutes.route('/log-in/check').post(function(req, res) {
    let username = req.body;
    User.where('username').equals(username.username).exec(function(err,d){
        if(d[0]){
            bcrypt.compare(username.password,d[0]['password']).then(function(result){
                if(result){
                    res.status(200).json({ 'User': username.username , 'Type': d[0]['type']});
                }
                else{
                res.status(400).send('Error');
                }
            });
        }
        else{
            res.status(404).json({'User':'User not found'});
        }
    });
});

// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});