import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// switch in between if you want nsfw or sfw
const nsfw = "https://v2.jokeapi.dev/joke/Any";
const sfw = "https://v2.jokeapi.dev/joke/Any?safe-mode";

app.use(express.static("public"));

// makes a get request and receives a random joke and sends it to the client
app.get("/", async (req, res) => {
    try {
        const result = await axios.get(sfw);
        const response = result.data;
        console.log(response);
        // if the joke is a twopart then it will send both parts
        if (response.type === "twopart") {
            res.render("index.ejs", {
                setup: response.setup,
                delivery: response.delivery,
            });
        } else {
            // else it will just send the full joke
            res.render("index.ejs", {
                setup: response.joke,
                delivery: "",
            });
        }
    } catch (error) {
        console.error("An error occurred: " + error.message);
        res.render("index.ejs", { setup: error.message });
    }
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});