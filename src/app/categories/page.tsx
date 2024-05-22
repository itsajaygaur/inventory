import { instance } from "@/config/axios"
import { Button, Input, Sheet, Stack } from "@mui/joy"
import Typography  from "@mui/joy/Typography"
import { revalidatePath } from "next/cache"
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from "@mui/icons-material";
import { addCategory, getCategories } from "@/app/actions";

export default async function CategoryPage(){

    const res = await getCategories()
    if(!res.success) return <p className="text-center mt-6" >Oops, something went wrong!</p>
    const categories = res.data

    // console.log('categories', categories)

    return(
        <section > 
        <Typography level="h1" className="!mb-10" >Categories</Typography>

            <form 
                className="flex gap-2 mb-10"
                action={addCategory}>
                <Input className="w-full" placeholder="Add Category" type="text" name="category" required />
                <Button type="submit" > <Add style={{marginRight: '5px'}} /> Add</Button>
            </form>

            <Stack spacing={2} >


            {
                categories.map((category: any) => (
                    <Sheet variant="soft" className="p-3 rounded-md flex justify-between items-center" key={category.id} >
                        <Typography level="h4" > {category.name} </Typography>
                        <form action={async () => {
                            "use server"
                            await instance.delete(`/product-categories/${category.id}`)
                            revalidatePath('/categories')
                        }}>
                        <Button type="submit" className="!p-2" variant="soft" color="danger" > <DeleteIcon /> </Button> 
                        </form>
                    </Sheet>
                    
                ))
            }
            </Stack>
        </section>
    )
}