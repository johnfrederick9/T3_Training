"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { trpc } from "@/utils/trpc";
import { z } from "zod";

// Zod schema for form validation
const formSchema = z.object({
  code: z
    .string()
    .min(1, "Code is required"),
  name: z
    .string()
    .min(1, "Name is required"),
  description: z
    .string()
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

export function DialogDemo() {
  const utils = trpc.useUtils();

  // Dialog state
  const [open, setOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    code: "",
    name: "",
    description: "",
  });

  // Error state for validation
  const [errors, setErrors] = useState<{
    code?: string;
    name?: string;
    description?: string;
  }>({});

  // tRPC mutation
  const { mutate, isPending } = trpc.demo.create.useMutation({
    onSuccess: () => {
      utils.demo.getAll.invalidate();
      // Reset form after successful submission
      setFormData({
        code: "",
        name: "",
        description: "",
      });
      // Clear errors
      setErrors({});
      // Close dialog after successful submission
      setOpen(false);
    },
    onError: (error) => {
      console.error("Failed to create item:", error);
      // Handle server-side validation errors if needed
    },
  });

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-amber-300 text-black hover:bg-amber-200">
          <PlusIcon className="mr-2" /> New Item
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="code">Code *</Label>
              <Input 
                id="code" 
                value={formData.code} 
                onChange={handleChange} 
                placeholder="Input Code"
                className={errors.code ? "border-red-500" : ""}
              />
              {errors.code && (
                <p className="text-sm text-red-500">{errors.code}</p>
              )}
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="name">Name *</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Input Name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Input Description"
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-amber-300 text-black hover:bg-amber-200"
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}