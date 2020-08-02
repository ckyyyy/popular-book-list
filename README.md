# Popular Book List  

## Project Structure  

This project includes 2 parts:  
1. Server Side  
- using mlab database  
  - hidden `<password>` and `<dbname>`, to replace the url in `server/app.js:15`  
- using graphql for server to get the data   

2. Client Side
- using react to create web interface  
- using apollo graphql for client to get the data  

## Start the project

1. Start Server side under popular-book-list directory  
`cd server`  
`npm install`  
`node app`  
http://localhost:5000/graphql  

#### Screen Shot
![image](image/server_add_author.png)  
![image](image/server_add_book.png)  
![image](image/server_get_author.png)  
![image](image/server_get_authors.png)  
![image](image/server_get_books.png)  

2. Start Client side under popular-book-list directory  
`cd client`  
`npm install`  
`npm start`  
http://localhost:3000  

#### Screen Shot
![image](image/web_get_books.png)  
![image](image/web_get_book_author.png)  
![image](image/web_add_book.png)  
