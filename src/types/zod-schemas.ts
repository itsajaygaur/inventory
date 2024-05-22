import {z} from 'zod'

export const ProductSchema = z.object({
    code: z.string().min(1, "This field is required"),
    name: z.string().min(1, "This field is required"),
    price: z.number().positive({message: 'Price should be greater than 0'}),
    brand: z.string({message: "This field is required"}).min(1, "This field is required"),
    product_category: z.string({message: "This field is required"}).min(1, "This field is required"),
    minimum_stock: z.string().min(1, "This field is required"),
})