const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "you must to provide user id"],
      ref: "User",
    },
  },
  { timestamps: true }
);

const disLikeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "you must to provide user id"],
      ref: "User",
    },
  },
  { timestamps: true }
);

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

    like: [likeSchema],

    dislike: [disLikeSchema],

    content: {
      type: String,
      required: [true, "you must to provide content"],
    },

    stauts: {
      type: String,
      enum: ["pending", "published"],
      default: "pending",
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

postSchema.methods.decrease = async function (id) {
  this.tags.push(id);
  const user = await this.model("User").findById(this.user);
  if (user.counter < 5) {
    throw new Error("you don't have more point to post");
  }
  await this.model("User").findByIdAndUpdate(
    { _id: this.user },
    { $inc: { counter: -5 } }
  );
  await this.save();
};

module.exports = mongoose.model("Post", postSchema);
