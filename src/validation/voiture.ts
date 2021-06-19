import { checkSchema } from 'express-validator';

export const voitureValidation = checkSchema({
  marque: {
    isString: true,
    isLength: {
      errorMessage: 'La marque doit être au minimum au 3 caractères',
      options: { min: 3 },
    }
  },
  price: {
    errorMessage: "Le prix doit être renseigné"
  },
  description: {
    isString: true,
    isLength: {
      errorMessage: 'La description doit être au minimum au 10 caractères',
      options: { min: 10 },
    }
  },
})