if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI : "mongodb+srv://victporing:ghjcnjdbr777@vid-pro-4befr.mongodb.net/vidpro?retryWrites=true&w=majority"}
} else {
    module.exports = { mongoURI: "mongodb://localhost/video-pro" }
}