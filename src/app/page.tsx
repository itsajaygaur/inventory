import AddProduct from "@/components/add-product";
import { Card, Typography, Box, CardContent } from "@mui/joy";
import { getProducts } from "./actions";
import CardAction from "@/components/card-action";
import { Product } from "@/types";

export default async function Home() {
  const res = await getProducts();
  if (!res.success)
    return <p className="text-center mt-8">Something went wrong!</p>;
  const products = await res.data;

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <Typography level="h1">Products</Typography>

        <AddProduct />
      </div>

      <Box className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {products &&
          products.map((product: Product) => (
            <Card
              className="p-6 min-w-full relative"
              key={product.id}
              sx={{ maxWidth: 345 }}
            >
              <CardAction product={product} />

              <Typography level="h3" paddingTop={3}>
                {product.name}
              </Typography>
              <CardContent>
                <Typography level="title-md">
                  <span className="font-normal">Price:</span> ₹{product.price}
                </Typography>
                <Typography level="title-md">
                  <span className="font-normal">Brand:</span>{" "}
                  {product.brand.name}
                </Typography>
                <Typography level="title-md">
                  <span className="font-normal">Category:</span>{" "}
                  {product.product_category.name}
                </Typography>
                <Typography level="title-md">
                  <span className="font-normal">Stock:</span>{" "}
                  {product.minimum_stock}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
    </div>
  );
}
