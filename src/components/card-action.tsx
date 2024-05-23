import { instance } from "@/config/axios";
import { Product } from "@/types";
import { Button } from "@mui/joy";
import { revalidatePath } from "next/cache";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProduct from "./edit-product";
import DeleteProduct from "./delete-product";

export default function CardAction({ product }: { product: Product }) {
  return (
    <div className="ml-auto absolute right-2 top-2 flex">
      <EditProduct product={product} />

      <DeleteProduct product={product} />

    </div>
  );
}
