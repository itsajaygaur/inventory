"use client";
import { useState } from "react";
import { deleteCategory } from "@/app/actions";
import { Button} from "@mui/joy";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./delete-modal";

export default function DeleteCategory({
  category,
}: {
  category: { id: number; name: string };
}) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    try {
      const res = await deleteCategory(category.id);
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
        className="!p-2"
        variant="soft"
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
