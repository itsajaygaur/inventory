"use client";
import { addProduct, getBrands, getCategories, updateProduct } from "@/app/actions";
import {
  Button,
  Typography,
  Box,
  Stack,
  FormControl,
  Input,
  FormLabel,
  Select,
  Option,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useForm, Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/types/zod-schemas";
import ErrorMessage from "./error-message";
import {z } from 'zod'
import { Product } from "@/types";
import toast from "react-hot-toast";

export default function ProductForm({open, setOpen, product}: {open: boolean, setOpen: (value: boolean) => void, product?: Product} ){

    // const [open, setOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
  
    const { handleSubmit, control, setValue, reset, formState: {errors, isSubmitting} } = useForm({
      resolver: zodResolver(ProductSchema),
      mode: "onTouched",
      defaultValues: {
        code: "",
        name: "",
        price: 0,
        brand: "",
        product_category: "",
        minimum_stock: "",
      },
    });
  
  
    async function submitData(data: z.infer<typeof ProductSchema> ) {
        
        try {   
            const res = product?.id ? await updateProduct(data, product?.id) : await addProduct(data)
            if(!res.success) return toast.error(res.message || 'Something went wrong, try again later.')
            if(res?.success){
              reset()
              setOpen(false)
              toast.success(res.message)
            }
        } catch (error) {
            toast.error('something went wrong, try again later!')
        }
    }
  
    async function fetchCategories() {
      const res = await getCategories();
      setCategories(res.data);
    }
  
    async function fetchBrands() {
      const res = await getBrands();
      setBrands(res.data);
    }
  
    useEffect(() => {
      if (open) {
        fetchCategories();
        fetchBrands();
      }

      if(product){
        setValue('code', product.code)
        setValue('name', product.name)
        setValue('price', product.price)
        setValue('brand', JSON.stringify(product.brand.id))
        setValue('product_category', JSON.stringify(product.product_category.id))
        setValue('minimum_stock', JSON.stringify(product.minimum_stock))
      }

    }, [open, product]);
  


    return(
        <Box padding={5} className="!bg-white h-full rounded-lg overflow-auto">
        <Typography level="h3">Add new product</Typography>
        <Typography className="!mb-8">
          Fill in the information of the product.
        </Typography>
        <form
          onSubmit={handleSubmit(submitData)}
        >
          <Stack spacing={2}>
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Code</FormLabel>
                  <Input placeholder="must be short & unique" {...field} autoFocus  disabled={!!product?.id} />
                  <ErrorMessage error={errors.code?.message} />
                </FormControl>
              )}
            />

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} autoFocus />
                  <ErrorMessage error={ errors?.name?.message} />
                </FormControl>
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} type="number" autoFocus />
                  <ErrorMessage error={errors.price?.message} />
                </FormControl>
              )}
            />

            <Controller
              name="brand"
              control={control}
              render={({ field: {onChange, ...rest} }) => (
                <FormControl>
                  <FormLabel>Brand</FormLabel>

                  <Select {...rest} onChange={(e, newValue) => onChange(newValue)} placeholder="Select brand" >
                    {brands.length &&
                      brands.map((brand: any) => (
                        <Option  value={brand.id.toString()} key={brand.id}>
                          {brand.name}
                        </Option>
                      ))}
                  </Select>
                  <ErrorMessage error={errors.brand?.message} />
                </FormControl>
              )}
            />

            <Controller
              name="product_category"
              control={control}
              render={({ field: {onChange, value, ...rest} }) => (
                <FormControl>
                  <FormLabel>Category</FormLabel>

                  <Select {...rest} value={value || ""} onChange={(e, newValue) => onChange(newValue)} placeholder="Select category"  >
                    {categories.length &&
                      categories.map((category: any) => (
                        <Option value={category.id.toString()} key={category.id}>
                          {category.name}
                        </Option>
                      ))}
                  </Select>
                  <ErrorMessage error={errors.product_category?.message} />
                </FormControl>
              )}
            />

            <Controller
              name="minimum_stock"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Minimum stock</FormLabel>
                  <Input {...field} type="number" autoFocus/>
                  <ErrorMessage error={errors.minimum_stock?.message} />
                </FormControl>
              )}
            />

            <Button disabled={isSubmitting} type="submit">Submit</Button>
          </Stack>
        </form>
      </Box>
    )
}