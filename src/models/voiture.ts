import mongoose, { Document, Schema } from 'mongoose';

interface VoitureDoc extends Document {
  marque: string;
  description: string;
  price: number;
}

const voitureSchema: Schema = new Schema({
  marque: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
})

const Voiture = mongoose.model<VoitureDoc>('Voiture', voitureSchema)

export { Voiture }