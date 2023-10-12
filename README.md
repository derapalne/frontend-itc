This is the ftontend of my Fullstack Project:

# Free Shopping

Made with Next.js in Typescript.<br/>

You can see the products in /products, and their description in /products/(id).<br/>
You can Sign Up and create an account, if you log in you'll be able to add, edit and remove products.<br/>

## To run the code:
```bash
npm i // To install all dependencies
npm run build // To complie the project
npm run start // To run the project
```

## Routes

/products -> See all products<br/>
/products/[id] -> See product with id [id]<br/>
<br/>
/add-product -> Add a product (once you're logged in)<br/>
/edit-product/[id] -> Edit or delete the product with id [id]<br/>
<br/>
/signup -> Create an account<br/>
/login -> Login with that account<br/>
/logout -> Log out of your account<br/>

# Environmental Variables

NEXT_PUBLIC_BACKEND_URL=[your_backend_url]

This project is configured to run alongside the backend. If you run the [backend repo](https://github.com/derapalne/backend-itc) as is provided, then the value of this variable will be "http://localhost:3000". <br/>
Otherwise, if you want to use the deployed backend on Render, you will have to use "https://backend-free-shopping.onrender.com".<br/>