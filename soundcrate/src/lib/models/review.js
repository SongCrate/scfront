import mongoose, { models, Schema } from 'mongoose';

const reviewSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    songId: {
      type: String,
      required: true
    },
    albumId: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: false
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  }, { timestamps: true }
);

const Review = models.Review || mongoose.model("Review", reviewSchema);
export default Review;