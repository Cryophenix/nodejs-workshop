# NodeJS Workshop

## Installation

Let start by cloning the repository and install everything

First, this workshop requires NodeJS (what a surprise)
You can find it here : https://nodejs.org/en/

Then let's clone and get installing

```sh
cd Front
npm install
npm run serve
```

Then, back at the root :

```sh
mkdir Back
cd Back
npm install express body-parser cors sequelize mysql2 nodemon
touch index.js
```

## First steps

Let's create the very base of our server.

```js
const express = require('express');
const app = express();

const host = '0.0.0.0';
const port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server started on port " + port);
});
```

Boom ! You have a server !

> Note: 'require' lets you import dependencies into your code.

Now, you will need to import in the same fashion :
- cors
- Sequelize
- body-parser

Cors and body-parser will be useful later, you need to integrate them like this :

```js
app.use(bodyParser.json());
app.use(cors());
```

Finnaly, let's initialize the database interface with Sequelize :
 ```js
process.Sequelize = Sequelize;
process.sequelize = new Sequelize('pokedex', 'root', 'thepasswordgoeshere', {
  host: 'ip_provided_by_me',
  dialect: 'mysql',
  logging: false
});
 ```
 
 That's it for the first steps, we have a server and a link to the database, let's continue.
 
 ## API
 
 We need to create a file pokemonsAPI that will hold our routes.

By putting this in a new file,  we will be able to add new routes handlers.
 ```js
const express = require('express');
const router = express.Router();

router.get("route", function);
router.post("a/certain/route", function);

module.exports = router;
 ```

With this exemple, `function` will be executed when the `"route"` is matched, we will use it to separate our functionalities.

In the file of the server (`index.js`), we now need to link the router, usually it is good practice to have each file dedicated to one subroute. In our case we have only one subroute ("/pokemon").
Therefore we can add in the server :
```js
const pokemons = require("path/to/api/file");
app.use("/pokemons", pokemons);
```
This will redirect all routes that starts with "/pokemons" into our pokemonsAPI file.
For exemple, GET localhost:5000/pokemons/ will be redirected in our router.get("/") in pokemonsAPI.

With this, you can match every request, to one router.something handler.

## Model

If we take a look at the field of the database :

name | HP | ... | type2 | img_url |
---- | -- | --- | ----- | ------- |

We now need to have a model representing our database.

```js
const Pokemon = process.sequelize.define('pokemon', {
});
modules.exports = Pokemon;
```

Here, we create our Pokemon model, sequelize will understand, thanks to the first parameter that we pass to `define`, that this model is linked to the 'pokemons' table.

Now, we need to specify the attributes inside the {}.

```js
name: {
      type: process.Sequelize.STRING,
      allowNull: false,
  },
```
This will link a 'name' property of type "string" from our database to our model.
The name cannot be null, meaning that whenever we want to create a new Pokemon, we need to specify the name.

> Create all other attributes needed for the model, as yourself which attribute can be null


Okay but, what do we do of this.
This Pokemon model that we create hold a lot of useful functions.
- Pokemon.findAll() will let us search our database depending on some filters.
- Pokemon.create() will create new pokemons.
- Pokemon.update() will let us modify some fields.
- Pokemon.delete().

You can find simple exemple in the docs : https://sequelize.org/master/manual/model-querying-basics.html

## Controller

The last step !

We ned another controller file.
As an habit, I like to represent controller with classes, that hold static variable.
With that constraint, I just need to import my class somewhere, and use their function directly, without instanciating the class.
You can think of the controller as just a collection of function.

In a controller file, let's add :
```
const Pokemon = require("./pokemons");
```
> We import our model, we will need it to communicate to the database.

```
class pokemonsController {
    static async getPokemons() {
    }
}
modules.export = pokemonsController;
```
>This is our class, it will hold our functions, for exemple getPokemons()

## Linking everything together.

This was just for the setup, but now that everything is in place, our development time will be minimal !
- Create all routes
- Have each route call the associated function in the controller.
- Each function of the controller should use the model accordingly.


