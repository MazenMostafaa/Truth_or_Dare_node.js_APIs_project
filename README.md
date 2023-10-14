# Truth_or_Dare_node.js_APIs_project

here, I will explain more about this project **Truth_or_Dare**

## specifications 

> using mongoose and express

 - users collection -->schema [ userName , email , password hashed , gender , userMessages] 
 - messages collection -->schema [ content , sendTo ] 

 - don't forget to get user id from token

## Modules

> User APIs :

 1. signUp
 2. login-->with create token
 3. update user (age , firstName , lastName)(user must be logged in)
 4. get user data(user must be logged in)
 


> Message  APIs : 
 1. send message
 2. get user messages (user must be logged in)
 3. delete specific message(user must be logged in) (creator only can delete task)
 

 
## Additional features

 - Bearer token 
 - validation (Joi)
 -  .ENV
```

