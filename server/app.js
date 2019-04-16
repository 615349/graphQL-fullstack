const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();

app.use(cors());

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4001, () => {
  console.log('now listen to 4001')
});
