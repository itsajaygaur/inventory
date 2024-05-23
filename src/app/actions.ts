"use server"

import { instance } from "@/config/axios"
import { Product, ProductForm } from "@/types"
import { CategorySchema, ProductSchema } from "@/types/zod-schemas"
import { revalidatePath } from "next/cache"
import { z } from 'zod'

export async function getProducts(){
    try {
        const res = await instance.get('/products')
        const result = res.data
        if(result?.status_message !== "OK") return {success: false, message: "Failed to add product"}
        return {success: true, data: result.data}
    } catch (error) {
        return {success: false, message: 'Something went wrong!'}
    }
}

export async function getCategories(){
    try {
        const res = await instance.get('/product-categories')
        const categories = res.data.data
        return {success: true, data: categories}
    } catch (error) {
        return {success: false, message: 'Something went wrong!'}
    }
}



export async function addCategory(data: z.infer<typeof CategorySchema>){

    try {
        const res = await instance.post('/product-categories', {name: data.category, category: 1})
        const result = res.data
        if(result?.status_message !== "OK") return {success: false, message: "Failed to add product"}
        revalidatePath('/')
        return {success: true, message: 'Category added successfully'}
        
    } catch (error) {
        return {success: false, message: 'Something went wrong!'}
    }
}



export async function deleteCategory(id: number){
    try {
        const res = await getProducts()
        if (!res.success) return {success: false, message: res.message || "Something went wrong"}
        const products = res.data
        const usedCategory  = products.find((product: Product) => product.product_category.id === id)
        if(usedCategory) return {success: false, message: 'Category is used in products!'}

        await instance.delete(`/product-categories/${id}`)
        revalidatePath('/')
        return {success: true, message: 'Category deleted successfully'}


        
    } catch (error) {
        return {success: false, message: 'Something went wrong!'}
    }
}

export async function addProduct(data: z.infer<typeof ProductSchema>){

    try {
        const res = await instance.post('/products', {...data } )
        const result = res.data
        if(result?.status_message !== "OK") return {success: false, message: "Failed to add product"}
        revalidatePath('/')
        return {success: true, message: 'Product added successfully'}

    } catch (error) {
        return {success: false, message: 'Something went wrong!'}
    }
}


export async function updateProduct(product: ProductForm, id: number){
    try {
        console.log('id ', id)
        await delete product.code
        product.id = id
        console.log('product ', product)
        const res = await instance.put(`/products/${id}`, {...product})
        const result = res.data
        if(result?.status_message !== "OK") return {success: false, message: "Failed to add product"}
        revalidatePath('/')
        return {success: true, message: 'Product updated successfully'}
    } catch (error) {
        return {success: false, message: 'Something went wrong!'}
    }
}

export async function getBrands(){
    try {
        const res = await instance.get('/brands')
        const brands = res.data.data
        return {success: true, data: brands}
    } catch (error) {
        return {success: false, message: 'Something went wrong!'}
    }
}