import mongoose from "mongoose"

const knowledgeChunkSchema = new mongoose.Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    sourceUrl: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const knowledgeChunkModel = mongoose.model('KnowledgeChunk', knowledgeChunkSchema)

export default knowledgeChunkModel