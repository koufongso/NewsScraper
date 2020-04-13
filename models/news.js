const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    headline: {
        type: String,
        required: true
      },

    url: {
        type: String,
        required: true
      },

    summary:{
        type: String,
        required: false
    },
      
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
      }
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;