const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  owner: {
    type: Object,
    require: true,
  },
  likes: {
    type: Array,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);