import mongoose, { models, Schema } from 'mongoose';

const songListSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    songIds: [
      {
        type: String,
      },
    ],
  }, { timestamps: true }
);

songListSchema.virtual('songCount').get(function () {
  return this.songIds.length;
});

const SongList = models.SongList || mongoose.model("SongList", songListSchema);
export default SongList;