"use client";
import { Add } from "@mui/icons-material";
import {
  Button,
  Drawer,
} from "@mui/joy";
import { useState } from "react";
import ProductForm from "./product-form";

export default function AddProduct() {
  const [open, setOpen] = useState<boolean>(false);



  return (
    <>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Add product
      </Button>


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
        <ProductForm open={open} setOpen={setOpen} />
      </Drawer>
    </>
  );
}
