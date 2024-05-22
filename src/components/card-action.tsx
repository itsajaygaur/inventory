import { instance } from "@/config/axios";
import { Product } from "@/types";
import { Button } from "@mui/joy";
import { revalidatePath } from "next/cache";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditProduct from "./edit-product";

export default function CardAction({ product }: { product: Product }) {
  return (
    <div className="ml-auto absolute right-2 top-2 flex gap-2">
      {/* <Button
        sx={{ borderRadius: "100%" }}
        className="!p-2"
        variant="plain"
        color="primary"
      >
        <EditIcon />
      </Button> */}

      <EditProduct product={product} />

      <form
        action={async () => {
          "use server";
          await instance.delete(`/products/${product.id}`);
          revalidatePath("/");
        }}
      >
        <Button
          sx={{ borderRadius: "100%" }}
          type="submit"
          className="!p-2"
          variant="plain"
          color="danger"
        >
          <DeleteIcon />
        </Button>
      </form>
    </div>
  );
}
