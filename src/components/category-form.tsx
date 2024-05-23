"use client"
import { Button, FormControl, Input } from "@mui/joy";
import { addCategory } from "@/app/actions";
import { Add } from "@mui/icons-material";
import {useForm, Controller} from 'react-hook-form'
import { z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/types/zod-schemas";
import ErrorMessage from "./error-message";
import toast from "react-hot-toast";

export default function Category(){

    const {handleSubmit, control, reset, formState: {errors, isSubmitting}} = useForm({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            category: ''
        }
    })

    async function submitData(data: z.infer<typeof CategorySchema>){
        try {
            const res = await addCategory(data)
            if(!res.success) return toast.error(res.message || "Something went wrong!")
            toast.success(res.message)
            reset()
        } catch (error) {
            toast.error('something went wrong, try again later!')
        }
    }

    return(
        <form 
            onSubmit={handleSubmit(submitData)}
            className="flex items-start gap-2 mb-10"
            >
                <Controller 
                control={control}
                name="category"
                render={({field}) => (
                    <FormControl className="w-full" >
                    <Input {...field} className="w-full" placeholder="Add Category" required />
                    <ErrorMessage error={errors.category?.message} />
                    </FormControl>
                )}
                />

            <Button type="submit" disabled={isSubmitting} > <Add style={{marginRight: '5px'}} /> Add</Button>
        </form>
    )
}