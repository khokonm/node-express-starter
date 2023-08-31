const path = require("path");
const { app, server, express } = require("./app");

const db = require("./services/db.service");

const routes = require("./routes");

// app config
const PORT = process.env.PORT || 8000;

// public folder
app.use(express.static(path.join(__dirname, "public")));


// if using react app
// app.use(express.static(path.join(__dirname, "client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
// });

app.use(routes);

const syncConfig = {
    // logging: true,
    logging: false,
    alter: true,
    // force: true,
};
  
db.connect
    .sync(syncConfig)
    .then(() => {
      console.log("\nDatabase connection established");
    })
    .catch((error) => {
      console.log(error);
      console.log("Database connection failed");
      process.exit(1);
    });
  
server.listen(PORT, () => {
    console.log(`Server is running at: ${PORT}`);
});
  