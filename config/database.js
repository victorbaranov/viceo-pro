if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI : "mongodb+srv://cluster0-ohy7g.mongodb.net/test"}
} else {
    module.exports = {mongoURI : "mongodb://localhost/video-pro"}
}