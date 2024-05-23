"use client";

import { useState } from "react";
import { Box, Button, Modal, ModalDialog, Stack, Typography } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "@/types";
import { deleteProduct } from "@/app/actions";
import toast from "react-hot-toast";
import DeleteModal from "./delete-modal";

export default function DeleteProduct({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    try {
      const res = await deleteProduct(product.id);
      if (!res.success) {
        toast.error(res?.message || "Something went wrong!");
        return;
      }
      toast.success(res.message);
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <>
      <Button
        sx={{ borderRadius: "100%" }}
        type="submit"
        className="!p-2"
        variant="plain"
        color="danger"
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </Button>

      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onDelete={handleDelete}
      />

    </>
  );
}
