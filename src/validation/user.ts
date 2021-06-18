import { checkSchema } from 'express-validator';

export const userValidation = checkSchema({
  lastname: {
    isString: true,
    isLength: {
      errorMessage: 'Le nom doit être au minimum au 3 caractères',
      options: { min: 3 },
    }
  },
  firstname: {
    isString: true,
    isLength: {
      errorMessage: 'Le prénom doit être au minimum au 3 caractères',
      options: { min: 3 },
    }
  },
  email: {
    isEmail: true,
    errorMessage: 'Veuillez insérer une adresse email'
  },
  pseudo: {
    isString: true,
    isLength: {
      errorMessage: 'Le pseudo doit être au minimum au 3 caractères',
      options: { min: 3 },
    }
  },
  password: {
    isString: true,
    isLength: {
      errorMessage: 'Le nom doit être au minimum au 8 caractères',
      options: { min: 8 },
    }
  },
})