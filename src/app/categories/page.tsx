import { Sheet, Stack } from "@mui/joy"
import Typography  from "@mui/joy/Typography"
import {getCategories} from "@/app/actions";
import CategoryForm from "@/components/category-form";
import DeleteCategory from "@/components/delete-category";

export default async function CategoryPage(){

    const res = await getCategories()
    if(!res.success) return <p className="text-center mt-6" >Oops, something went wrong!</p>
    const categories = res.data

    // console.log('categories', categories)


    return(
        <section > 
        <Typography level="h1" className="!mb-10" >Categories</Typography>

            <CategoryForm />

            <Stack spacing={2} >


            {
                categories.map((category: {id: number, name: string}) => (
                    <Sheet variant="soft" className="p-3 rounded-md flex justify-between items-center" key={category.id} >
                        <Typography level="h4" > {category.name} </Typography>
                        <DeleteCategory category={category} />
                    </Sheet>
                    
                ))
            }
            </Stack>
        </section>
    )
}