"use client"
import { deleteCategory } from "@/app/actions";
import { Button } from "@mui/joy";
import toast from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';
import { FormEvent } from "react";

export default function DeleteCategory({category}: {category: {id: number, name: string}}){

    async function handleSubmit(e: FormEvent<HTMLFormElement> , id: number){

        try {
            e.preventDefault()
            const res = await deleteCategory(id)
            if(!res.success) return toast.error( res?.message || 'Category deleted successfully!')
            toast.success(res.message)
        } catch (error) {
            toast.error('Something went wrong!')
        }

    }


    return(
        <form  onSubmit={e => handleSubmit(e, category.id)} >
        <Button type="submit" className="!p-2" variant="soft" color="danger" > <DeleteIcon /> </Button> 
    </form>
    )
}