import mongoose from "mongoose";

const mediaItemSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    width: Number,
    height: Number,
  },
  { _id: false },
);

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    lat: Number,
    lng: Number,
  },
  { _id: false },
);

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    caption: {
      type: String,
      trim: true,
      maxlength: 2200,
      default: "",
    },

    // array (not a single object) so a post can be a carousel,
    // like Explore/Profile grid's `mediaCount` badge assumes
    media: {
      type: [mediaItemSchema],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "A post needs at least one image or video.",
      },
    },

    location: locationSchema,

    // powers the "Tagged" profile tab
    taggedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // comments live in their own collection (pagination + replies),
    // this is a denormalized counter kept in sync by the comment
    // service on create/delete so the grid/detail view doesn't need
    // a separate count query per post
    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    isCommentsDisabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// derived fields so the API can send likesCount/mediaCount directly
// without the frontend re-deriving them from array lengths
postSchema.virtual("likesCount").get(function () {
  return this.likes?.length ?? 0;
});

postSchema.virtual("mediaCount").get(function () {
  return this.media?.length ?? 0;
});

postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

// profile grid: a user's own posts, newest first, excluding archived
postSchema.index({ author: 1, isArchived: 1, createdAt: -1 });
// explore/feed: global recency sort
postSchema.index({ createdAt: -1 });
// tagged tab
postSchema.index({ taggedUsers: 1, createdAt: -1 });

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;