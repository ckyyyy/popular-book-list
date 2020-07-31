const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin reuqests
app.use(cors());

// connect to mlab database
// hidden <password> and <dbname>
mongoose.connect(
  'mongodb+srv://ckyyyy:<password>@cluster0.f6bxe.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.log("Error: ", err.message));

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(5000, ()=>{
  console.log('now listening for reuqests on port 5000')
})
