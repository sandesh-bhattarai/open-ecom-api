## Node project 
### Package.json 
- to manage the pacakges/dependencies
- BE develop => Dependency
- Dev-Dependency
- Global Dependency
- script execute 

* Never modify anything inside node_modules/
* Never modify package-lock.json
* Never upload node_modules to git


### Architecture Define (Monolith and Microservice)
- MVC Pattern 
- Model View Controller 
    - Model => DB 
    - View => Present (React)
    - Controller => Business Logic Handler

    - Modular 

### Node 
- REST API Or SOAP or Graph 
- CRUD => Create, Read, Update, Delete 
- get, post, put/patch, delete



## Flow
- Route --> Controller/Modules/Middleware
- index.js -> /src/config/express.config.js -> /src/router/router.js

- index.js -> /src/config/express.config.js -> /src/router/router.js -> /src/modules/auth/auth.router.js

- slug
- url data (slug) => params 
--> fb user -> https://www.facebook.com/username
-> https://daraz.com.np/product

https://www.daraz.com.np    => domain
/products                   => path
/winter-warm-polar-fleece-unisex-half-zip-design-front-pocket-sweatshirt-i128483736-s1035968766.html => params
?
pvid=b2c378b6-fac1-4385-bcdb-ad42c58c9aae
&
search=jfy
&
scm=1007.51705.413671.0
&
spm=a2a0e.tm80335409.just4u.d_128483736



// Modules -> feature 
// ecommerce => 
    // MVP => Minimal Viable Product (Core feature)
    // Auth and Authorization
    // Multi vendor /single vendor 
    // Orders 
    // Product 
    // Brand 
    // Categories 
    // Transactions 
    // banners 
    // chat implment(socket)

    // Reviews 
    // Offers/coupons/Vouchers
    // logistic 
    // Inventory
    // customer support 


# Validtion 
- joi, yup, zod, ajv, class-Validator 

## Notification 
- node server ===> SMTP Server (provider) Queue based 
- gmail server, sendgrid, mailchimp, mailtrap  domain verifiried 
- gmail, mailtrap 
- from ...@......
- nodemailer


# DB (Database)
- SQL or NoSQL
- SQL -> mysql, postgresql, oracle, mssql etc...
- NoSQL -> mongodb, couchdb, cassandra, etc...
- nodejs -> mongodb, pgsql, mysql
- php -> mysql, pgsql, mssql, oracle, mongodb etc.
- nodejs mongodb
- Relational data structure then use sql server 
- Low scale 
- Huge volume of data , db opertionn fast, redundency is not a problem mongodb
- mongodb stores in document format(Json type)

- server, auth , db use
- protocol://url:port

- protocol, 
- host 
- port 
- user 
- password

- protocol: mongodb+srv
- UserName: <db_username>
- Password: <db_password>
- Host: cluster0.nss1a.mongodb.net/
- default port: 27017


- CRUD => Create, Read, Update, Delete
- Create Operation: 

- mongodb DB create/use/select
- use <dbName>;     --- If dbName is already created, then selects that db else create and select that db
- e.g use mern-34;
- > mern-34;

- current db identify
- db;   
- > mern-34


## Create Operation 
- 2 ways to insert data 
- a. One row/document at a time 

- db.users.insertOne({name: "sandesh", email: "sandesh.bhattarai@broadwayinfosys.com", password: "admin123", address: "Kathmandu", role: "admin"});
- response: {acknowledge: true, insertedId: ObjectId('hexcode')}

- b. Multiple row/Document at a time
- db.users.insertMany([{"name":"Ram Bahadur","email":"ram.bahadur@example.com","address":"Kathmandu","phone":"9812345678","password":"$2y$10$eB9zkZnWbRzMYki7uqD56Ovd.OIVm2szFkZrUpCWjeGFXCUZAsjvu","role":"admin","gender":"male"},{"name":"Sita Kumari","email":"sita.kumari@example.com","address":"Pokhara","phone":"9823456789","password":"$2y$10$VH5Ap6CWemMG/jjOYvVmeOYvG3PAZFuI3qTjsUQK1/AgW9sV.UJeC","role":"customer","gender":"female"},{"name":"Krishna Shrestha","email":"krishna.shrestha@example.com","address":"Lalitpur","phone":"9724567890","password":"$2y$10$02NWeUGxnUm5c1WjLt5tHOh4eHrXk0OqOUyPuey5rFLVcNsdrZ8ma","role":"seller","gender":"male"},{"name":"Gita Basnet","email":"gita.basnet@example.com","address":"Bhaktapur","phone":"9615678901","password":"$2y$10$UZnmyHXZJ48nEq67Eo3JsOJPrYXPh3ISwncvEfbnqDRfA.vu8Ah6y","role":"admin","gender":"female"},{"name":"Bishnu Rai","email":"bishnu.rai@example.com","address":"Biratnagar","phone":"9816789012","password":"$2y$10$HqMIUHzj/fovE.RdVGZWJuPEogFFpNRxO7UKVbXxEVjEPO16ZRTHe","role":"seller","gender":"male"},{"name":"Kumari Devi","email":"kumari.devi@example.com","address":"Butwal","phone":"9737890123","password":"$2y$10$HtIX6.TOsuM/cO.VFZZUzuMVFYEP1V/KiZlIR2U.QNTIqtMNQWaF.","role":"customer","gender":"female"},{"name":"Hari Thapa","email":"hari.thapa@example.com","address":"Dharan","phone":"9628901234","password":"$2y$10$y0U7LTDFZbcP6RfG2uWYpuqXJK3lLX/.TxOp9KXmBxTssGiyuZhoy","role":"admin","gender":"male"},{"name":"Rita Sharma","email":"rita.sharma@example.com","address":"Chitwan","phone":"9839012345","password":"$2y$10$d.JGZ9IBU8UMoXaaZc7CHOG03b6M2XOU70uJo8ulmtSEHte9lgSRG","role":"customer","gender":"female"},{"name":"Shyam Tamang","email":"shyam.tamang@example.com","address":"Janakpur","phone":"9740123456","password":"$2y$10$0aJkMjTh9G.qnfs/K2CJgOhIz26VTCjkhp8fIBmP7uRe93oCCFUbq","role":"seller","gender":"male"},{"name":"Parbati Gurung","email":"parbati.gurung@example.com","address":"Hetauda","phone":"9651234567","password":"$2y$10$M2W.RVL2ltyLCNkJZIg6HuuarZRS3TkiuW7L6cG3g0DGG8dD6aP0e","role":"customer","gender":"female"}]);
- response:  {
    ackdnowledge: true, insertedIds: {
        "0": ObjectId("hexcode")
    }
}
- _id ObjectId('hexcode') primary key


## Read Operation (SELECT )
- read operation 
- db.<collectionName>.find(filter, projection, options)

### Filter 

- filter => null 
e.g. db.users.find()    // ~ SELECT * FROM users;
- filter is an object data type 

- {key: value/expression} or {expression: key}
- expression or key can be operators 
- e.g {role: "admin"} => // ~ SELECT * FROM users WHERE role = 'admin'
- e.g {role: "admin", gender: "male"}  => // .... where role = 'admin' AND gender = 'male'

- age key number 
- users with age > 16
- e.g.  {age: {$gt: 16}}

- user: {... role: ['admin','customer'] ....}
// {role: {$in: ['admin','customer']}}

{
    $or: [
            {role: "admin"},
            {gender: "female"}
        ]
}

- mongodb operators 
- $gt, $gte, $lt, $lte, $or, $and, $in, $nin, $ne, $eq, $regex

- db.users.find({$or: [{role: "admin"},{gender: "female"}]})

- db.users.find()   => select * from users where ;

- db.users.find({}, {name: 1, email: 1, _id: 0})    => select name, email from users

- db.users.find({role: "admin"}, {}, {sort: {_id: "desc"}, limit: 3, skip: 3})


## Update Operation(Update)
- db.<collectionName>.updateOne(filter, {$set: {key: value}}, options)
- e.g. email 
- db.users.updateOne({email: ""}, {$set: {role: "admin"}})
- db.users.updateOne({_id: ObjectId("id")}, {$set: {}})

- db.<collectionName>.updateMany(fitler, {$set: {$key: value, ...}}, options)

- db.users.updateOne({email: "sandesh.bhattarai@broadwayinfosys.com"}, {$set: {name: "Sandesh Bhattarai", email: "sandesh.bhattarai@broadwayinfosys.com", role: "MERN Trainer", experience: 14, adderss: "Kathmandu"}}, {upsert: 1})
- {... matchCount: 0, modifyCount: 0, upsertCount: 1, upsertIds: {"0": ObjectId()}}

## Delete Operation(Delete)
- db.<collectionName>.deleteOne(filter)
- db.<collectionName>.deleteMany(filter)


### ORM Or ODM 
- sql ORM => object Relational Mapping/Modeling 
- packages: sequelize, typeorm, prisma 

- NoSql ODM => Object Document Mapping/modeling 
- mongodb => mongoose

- Tables/Collection on your code? 
- Model 

- config 
- Model = table 
    - Schema is defined in model 
    - Schema is a definition of our table/collection in db
- Table rows ===> deonted by an instance/object of that model class.
- the property of a model / schema are the properties of model object. 
- Model name will be always in singular form of table name 
- e.g, users is table => Model Name => User
- db.users.find() - {}


- SQL 
    - Define Migrations
    - Execute Migrations
    - Model Define 

- Mongodb 
    - Model definition

### TASK: Design all the necessary tables/schema for an ecommerce project
- Category 
- Order 
- Product
- Cart 
- Transactions/payments
- Review 
- User
- Wishlist 
- Offers
- Brand 
- Banner 
- Chat



- Banner 
- Brand 
- Category 
- User done
- Product 
- Orders 
- Transactions (esewa, khalti, imepay, connectips, bank)    => merchant id ( nominal fee, commission rate definition )
- Chat


## REST API 
- We do not maintan states 
- Login  2 key(token) 
    - accesstoken 
    - refreshtoken 
- jwt token(json web token)
- header+payload+signature
- header => typ, algo
- payload => data 
- signature => priavte key + public key / jwt secret
- Bearer type token 