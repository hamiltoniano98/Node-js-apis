import z from 'zod'

const ValidateSchema = z.object({
  productname: z.string({
    invalid_type_error: 'Nombre debe ser un string',
    required_error: 'nombre del producto'
  }),
  description: z.string({
    invalid_type_error: 'Descripcion debe ser un string',
    required_error: 'Descripcion del producto'
  }),
  price: z.number().positive(),
  category: z.array(z.enum(['Zapato', 'Ropa', 'Comida']))
})

const UserValidate = z.object({
  username: z.string({
    invalid_type_error: 'Nombre debe ser un string',
    required_error: ' NO puede estar vacio'
  }),
  email: z.any({
    required_error: 'email'
  }),
  password: z.any({
    required_error: 'password'
  })
})

function StoreValidateSchema (object) {
  return ValidateSchema.safeParse(object)
}

function PartialStoreValidateSchema (object) {
  return ValidateSchema.partial().safeParse(object)
}

function UserValidateSchema (object) {
  return UserValidate.safeParse(object)
}

export { StoreValidateSchema, PartialStoreValidateSchema, UserValidateSchema }
