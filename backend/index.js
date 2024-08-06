const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// verify token
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
      return res.status(401).send({ error: true, message: 'Unauthorized access' })
  }
  const token = authorization?.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).send({ error: true, message: 'Forbidden user or token has expired' })
      }
      req.decoded = decoded;
      next()
  })
}

// mongodb connection
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@agripeace-server.sqb4jsm.mongodb.net/?retryWrites=true&w=majority&appName=agripeace-server`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //  create a database and collection
    const database = client.db("agripeace");

    const userCollection = database.collection("users");

    // Verify admin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user.role === 'admin') {
          next()
      }
      else {
          return res.status(401).send({ error: true, message: 'Unauthorize access' })
      }
  }

    app.post("/api/set-token", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_SECRET, {
        expiresIn: "24h",
      });
      res.send({ token });
    });

    //  user routes
    app.post("/new-user", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //  await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Developers!");
});

app.listen(port, () => {
  console.log(`AgriPeace Server listening on port ${port}`);
});
