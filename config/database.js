if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI : "mongodb+srv://victoring:ghjcnjdbr777@cluster0-ohy7g.mongodb.net/test?retryWrites=true&w=majority"}
} else {
    module.exports = {mongoURI : "mongodb://localhost/video-pro"}
}