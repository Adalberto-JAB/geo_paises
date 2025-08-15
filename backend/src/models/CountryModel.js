import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: {
    common: { type: String, required: true, trim: true },
    official: { type: String, required: true, trim: true },
    nativeName: {
      type: Map,
      of: new mongoose.Schema({
        official: { type: String, trim: true },
        common: { type: String, trim: true }
      }, { _id: false })
    }
  },
  independent: { type: Boolean, default: false },
  unMember: { type: Boolean, default: false },
  currencies: {
    type: Object,
    default: {}
  },
  capital: [{ type: String, trim: true }],
  region: { type: String, required: true, trim: true },
  subregion: { type: String, trim: true },
  languages: {
    type: Object,
    default: {}
  },
  latlng: [{ type: Number }],
  landlocked: { type: Boolean, default: false },
  borders: [{ type: String, trim: true }],
  area: { type: Number },
  population: { type: Number },
  gini: {
    type: Object,
    default: {}
  },
  timezones: [{ type: String, trim: true }],
  continents: [{ type: String, trim: true }],
  flags: {
    png: { type: String, trim: true },
    svg: { type: String, trim: true },
    alt: { type: String, trim: true }
  },
  capitalInfo: {
    latlng: [{ type: Number }]
  },
 // Referencia al usuario que creó/añadió este país
 creador: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User', // Asume un modelo 'User'
   required: true // Un país debe estar asociado a un usuario
 }
}, {
 timestamps: true // Añade campos createdAt y updatedAt automáticamente
});

// Evita que un usuario cree el mismo país (basado en el nombre oficial) más de una vez.
countrySchema.index({ 'name.official': 1, creador: 1 }, { unique: true });

const Country = mongoose.model('Country', countrySchema);
export default Country;