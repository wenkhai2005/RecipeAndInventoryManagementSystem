const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io"); 
const path = require("path");

const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("./dist/recipe-inventory-management/browser"));

const url = "mongodb://localhost:27017/assignment3";   //change this for vm

mongoose
  .connect(url)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const recipeRouter = require("./routes/recipes");
const inventoryRouter = require("./routes/inventories");
const userRouter = require("./routes/users");
const analyzeHealthRouter = require("./routes/analyze-health")
const translateRecipeRouter = require("./routes/translate-recipe")
const healthRouter = require("./routes/health")

app.use("/api", recipeRouter);
app.use("/api", inventoryRouter);
app.use("/api", userRouter);
app.use("/api", analyzeHealthRouter);
app.use("/api", translateRecipeRouter);
app.use("/api", healthRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }, //allow all frontend origins to connect
});


const textToSpeech = require("@google-cloud/text-to-speech");

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

io.on("connection", (socket) => {
  socket.on("playInstructions", (data) => {
    const { recipeId, instructionsText } = data;
    console.log(`Generating TTS for recipe ${recipeId}...`);

    const request = {
      input: { text: instructionsText },
      voice: { languageCode: "en-US", name: "en-US-Chirp3-HD-Leda" },
      audioConfig: { audioEncoding: "MP3" },
    };

    client.synthesizeSpeech(request, (err, response) => {
      if (err) {
        console.error("ERROR:", err);
        socket.emit("audioError", { recipeId, error: err.message });
        return;
      }

      const fileName = `${recipeId}.mp3`;
      const outputPath = path.join(__dirname, "audio", fileName);


      fs.writeFile(outputPath, response.audioContent, "binary", (err) => {
        if (err) {
          console.error("ERROR:", err);
          socket.emit("audioError", { recipeId, error: err.message });
          return;
        }

      socket.emit("audioReady", { recipeId, audioUrl: `/audio/${fileName}` });
      });
    });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

app.use("/audio", express.static(path.join(__dirname, "audio")));

const PORT = 8080;
server.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});