const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
      default: "/uploads/default.jpg",
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      require: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        require: true,
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

postSchema.virtual("comments", {
  ref: "Comments",
  localField: "_id",
  foreignField: "post",
  // justOne: false// if true it return one item but it false return array of object
});

postSchema.pre("remove", async function () {
  await this.model("Comments").deleteMany({ post: this._id });
});

// postSchema.methods.addComment = async function (id, body) {
//   const num = this.comments.push({ user: id, body });
//   // this.comments[num - 1]
//   // console.log(this.comments[num - 1]);
//   // const idCom= this.comments[num - 1].id
//   return this.save();
// };

// postSchema.methods.removeComment = async function (id) {
//   const comment = this.comments.id(id);

//   // if (!comment) {
//   //   throw new Error("not found any comment ");
//   // }
//   // comment.remove();
//   // return this.save();
// };

module.exports = mongoose.model("Post", postSchema);
