const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // Ensure dotenv is configured correctly
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 3000;
const URL = process.env.MONGODB_URL; // MongoDB connection string

if (!URL) {
  console.error("MONGODB_URL is not defined. Please check your .env file.");
  process.exit(1); // Exit if the environment variable is not set
}

// Connect to MongoDB using Mongoose
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connection Success!!!"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit if there's a connection error
  });

// Middleware
app.use(cors());
app.use(express.json());

// Verify JWT Middleware
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized access" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send({ error: true, message: "Forbidden user or token has expired" });
    }
    req.decoded = decoded;
    next();
  });
};

// Verify Admin Middleware
const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const userCollection = client.db("agripeace").collection("users");
  const user = await userCollection.findOne({ email: email });
  if (user?.role === "admin") {
    next();
  } else {
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized access" });
  }
};

// MongoDB Client Setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@agripeace-server.sqb4jsm.mongodb.net/agripeace?retryWrites=true&w=majority&appName=agripeace-server`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    const database = client.db("agripeace");
    const userCollection = database.collection("users");

    // Routes
    app.post("/api/set-token", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_SECRET, {
        expiresIn: "24h",
      });
      res.send({ token });
    });

    app.post("/new-user", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const users = await userCollection.find({}).toArray();
      res.send(users);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = await userCollection.findOne({ _id: new ObjectId(id) });
      res.send(user);
    });

    app.delete("/delete-user/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.put("/update-user/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.option,
          address: updatedUser.address,
          phone: updatedUser.phone,
          photoUrl: updatedUser.photoUrl,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, {
        upsert: true,
      });
      res.send(result);
    });

    app.get("/user/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email: email });
      res.send(result);
    });

    app.get("/admin-stats", verifyJWT, verifyAdmin, async (req, res) => {
      const totalUsers = (await userCollection.find().toArray()).length;
      res.send({ totalUsers });
    });

    // Confirm successful MongoDB connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error during MongoDB operation:", error);
  }
}

run().catch(console.dir);

// Routes
app.use("/Plant", require("./routes/PlantManagement/PlantRoute.js"));

app.get("/", (req, res) => {
  res.send("Hello Developers!");
});

// Start server
app.listen(port, () => {
  console.log(`AgriPeace Server listening on port ${port}`);
  console.log("வ ன க் க ம்");
});
