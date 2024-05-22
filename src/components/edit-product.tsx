"use client";
import { Add } from "@mui/icons-material";
import {
  Button,
  Drawer,
} from "@mui/joy";
import { useState } from "react";
import ProductForm from "./product-form";
import EditIcon from "@mui/icons-material/Edit";
import { Product } from "@/types";

export default function EditProduct({product}: {product: Product}) {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        sx={{ borderRadius: "100%" }}
        className="!p-2"
        variant="plain"
        color="primary"
        onClick={() => setOpen(true)}
      >
        <EditIcon />
      </Button>

      {/* <EditProduct /> */}
      
      <Drawer
        variant="plain"
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              p: { md: 3, sm: 0 },
              boxShadow: "none",
            },
          },
        }}
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <ProductForm open={open} setOpen={setOpen} product={product} />
      </Drawer>
    </>
  );
}
