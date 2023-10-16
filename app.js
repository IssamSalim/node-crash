const express = require("express");
const mongoose = require("mongoose");

const app = express();

const article = require("./models/article")

mongoose.connect("mongodb+srv://issam27:123321@nodecrashcourse.ectolrt.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("connected successfully")
}).catch((err) => {
    console.log("error with connnection with DB", err)
})

app.use(express.json());

app.get("/hello",(req, res) => {
    res.send("hello")
});

app.put("/test",(req, res) => {
    res.send("you visited test")
});

app.get("/numbers", (req, res) =>{
    let numbers = "";
    for (let i = 0; i <= 100; i++){
        numbers += i + " - ";
    }
    // res.send(`the numbers are ${numbers}`)
    // res.send("<h1>Hello world</h1>")
    // res.sendFile(__dirname + "/views/index.html")
    res.render("index.ejs", {
        name: "Issam",
        numbers : numbers,
    })
});

app.get("/findsummation/:number1/:number2", (req, res) => {
    const num1 = req.params.number1;
    const num2 = req.params.number2;

    const total = Number(num1) + Number(num2);

    res.send(`The total are ${total}`)
})

app.get("/sayHello", (req, res) => {
    console.log(req.body);
    console.log(req.query);

    // res.send(`Hello ${req.body.name}, Age is: ${req.query.age}`)
    res.json({
        name: req.body.name, 
        age: req.query.age,
        language:"Arabic"
    })
});

app.put("/test", (req,res) => {
    console.log("hellow world")
})

app.post("/addComment", (req, res) => {
    res.send("post request on add comment")
})

app.delete("/testingDelete", (req, res) => {
    console.log("delete request")
})

// ====== Articles ======
app.post("/articles", async (req, res) => {
    const newArticle = new article()

    const artTitle = req.body.articleTitle
    const artBody = req.body.articleBody

    newArticle.title = artTitle,
    newArticle.body = artBody,
    newArticle.numberOfLikes = 0,
    await newArticle.save()

    res.json(newArticle);
});

app.get("/articles", async(req, res) => {
    const articles = await article.find();
    // cosnole.log("the articles are ", articles);
    res.json(articles);
})

app.get("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId;
    try{
        const article1 =  await article.findById(id);
        res.json(article1);
        return;
    }catch(error) {
        console.log("error while reading article of is", id);
        return res.send("error")
    }

})

app.delete("/articles/:articleId", async (req, res) =>{
    const id = req.params.articleId;
    try{
        const article1 =  await article.findByIdAndDelete(id);
        res.json(article1);
        return;
    }catch(error) {
        console.log("error while reading article of is", id);
        return res.json(error);
    }
})

app.get("/showArticles", async (req, res) => {
    const articles = await article.find()
    res.render("articles.ejs", {
        allArticles: articles
    })

})

app.listen(8000, () => {
    console.log("Server start on port 8000")
})

