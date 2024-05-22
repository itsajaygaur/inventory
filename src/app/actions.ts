"use server"

import { instance } from "@/config/axios"
import { ProductForm } from "@/types"
import { ProductSchema } from "@/types/zod-schemas"
import { revalidatePath } from "next/cache"
import { z } from 'zod'

export async function getProducts(){
    try {
        const res = await instance.get('/products')
        const products = res.data.data
        return {success: true, data: products}
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



export async function addCategory(formData: FormData){

    try {
        const name = formData.get('category')
        await instance.post('/product-categories', {name, category: 1})
        revalidatePath('/')
        
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