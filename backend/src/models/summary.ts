import mongoose from "mongoose";

// summary model interface
export interface ISummary extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    summary: string;
    userId: mongoose.Types.ObjectId;
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    quesitons: {
        type: [String],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export default mongoose.model<ISummary>("Summary", bookSchema);