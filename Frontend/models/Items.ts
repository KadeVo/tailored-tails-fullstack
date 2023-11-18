import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Costume',
      'Body Piece',
      'Full Body',
      'Hat',
    ],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
  },
  // Potential Fields
  // manufacturer: String,
  // color: String,
  // material: String,
})

export const Item = mongoose.model('Item', itemSchema)

