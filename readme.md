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