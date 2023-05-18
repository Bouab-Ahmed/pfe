const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "you must to provide title"],
    },
    image: {
      type: String,
      required: [true, "you must to provide image"],
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
      required: [true, "you must to provide content"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "you must to provide user id"],
      ref: "User",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: [true, "you must to provide tag id"],
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

postSchema.methods.decrease= async function(id){
  this.tags.push(id)
  const user = await this.model("User").findById(this.user);
    if (user.counter < 5) {
    throw new Error("you don't have more point to post");
  }
  await this.model("User").findByIdAndUpdate({_id:this.user}, { $inc: { counter: -5 } })
  await this.save();
}

postSchema.pre("save", async function () {
  // const user = await this.model("User").findById(this.user);
  // if (user.counter < 5) {
  //   throw new Error("you don't have more point to post");
  // }
  // user.counter -= 5;
  // await user.save();
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
