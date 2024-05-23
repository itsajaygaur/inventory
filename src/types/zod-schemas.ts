import {z} from 'zod'

export const ProductSchema = z.object({
    code: z.string().trim().min(1, "This field is required").max(9, "Code is too long!"),
    name: z.string().trim().min(1, "This field is required"),
    price: z.number().positive({message: 'Price should be greater than 0'}),
    brand: z.string({message: "This field is required"}).trim().min(1, "This field is required"),
    product_category: z.string({message: "This field is required"}).trim().min(1, "This field is required"),
    minimum_stock: z.string().trim().min(1, "This field is required"),
})


export const CategorySchema = z.object({
    category: z.string().trim().min(1, "This field is required"),
})