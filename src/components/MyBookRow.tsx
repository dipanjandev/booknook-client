"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// ১. Shadcn Dialog ইমপোর্ট করা হলো (Edit Form এর জন্য)
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// ২. Shadcn AlertDialog ইমপোর্ট করা হলো (Delete Confirmation এর জন্য)
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IBookType } from "@/app/allbooks/page";

interface MyBookRowProps {
  book: IBookType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedData: Partial<IBookType>) => Promise<boolean>;
}

const MyBookRow = ({ book, onDelete, onUpdate }: MyBookRowProps) => {
  // এডিট ডায়ালগ ওপেন/ক্লোজ স্টেট
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // এডিট ফর্মের স্টেট (বইয়ের আগের ডেটা দিয়ে ইনিশিয়ালাইজ করা)
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    category: book.category,
    quantity: book.quantity,
    image: book.image,
    description: book.description,
  });

  // ফর্মের ইনপুট পরিবর্তনের হ্যান্ডলার
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // এডিট সাবমিট হ্যান্ডলার
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const success = await onUpdate(book._id, {
      ...formData,
      quantity: Number(formData.quantity),
    });

    setIsUpdating(false);
    if (success) {
      setIsEditDialogOpen(false); // আপডেট সফল হলে মডাল বন্ধ হবে
    }
  };

  return (
    <tr className="border-t border-[#E5E7EB] hover:bg-[#FDFBF7]/40 transition-colors">
      {/* Book Thumbnail + Title + Author */}
      <td className="py-3 sm:py-4 px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative w-10 h-14 sm:w-12 sm:h-16 shrink-0 rounded overflow-hidden border border-[#E5E7EB] bg-white shadow-xs">
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 40px, 48px"
            />
          </div>
          <div className="min-w-0 max-w-45 sm:max-w-xs">
            <h3
              className="font-medium text-[#1F2937] text-xs sm:text-sm leading-tight truncate"
              title={book.title}
            >
              {book.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-[#6B7280] mt-1 font-serif truncate">
              {book.author}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="py-3 sm:py-4 px-4 sm:px-6 text-center whitespace-nowrap">
        <span className="inline-block bg-[#F3ECE0] text-[#785429] text-[11px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
          {book.category}
        </span>
      </td>

      {/* Copies */}
      <td className="py-3 sm:py-4 px-4 sm:px-6 text-center text-xs sm:text-sm font-medium text-[#1F2937] whitespace-nowrap">
        {book.quantity}
      </td>

      {/* Actions */}
      <td className="py-3 sm:py-4 px-4 sm:px-6 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
          {/* =================== ১. EDIT DIALOG =================== */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 sm:h-8 px-2.5 sm:px-3 border-[#E5E7EB] text-[#1F2937] hover:bg-[#FDFBF7] text-[11px] sm:text-xs font-normal"
                >
                  Edit
                </Button>
              }
            />
            <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-sm sm:max-w-lg md:max-w-2xl bg-white border border-[#E5E7EB] p-4 sm:p-6 rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader className="text-left space-y-1">
                <DialogTitle className="text-lg sm:text-xl font-bold text-[#1E3A2F]">
                  Update Book Details
                </DialogTitle>
                <DialogDescription className="text-xs text-[#6B7280]">
                  Edit the book information and click save to apply changes.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleEditSubmit}
                className="space-y-3 sm:space-y-4 py-2 text-left"
              >
                <div className="space-y-1">
                  <Label
                    htmlFor="title"
                    className="text-xs font-semibold text-[#1F2937]"
                  >
                    Book Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="h-8.5 sm:h-9 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="author"
                    className="text-xs font-semibold text-[#1F2937]"
                  >
                    Author
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="h-8.5 sm:h-9 text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-[#1F2937]">
                      Category
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(val) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: val ?? prev.category,
                        }))
                      }
                    >
                      <SelectTrigger className="h-8.5 sm:h-9 text-xs sm:text-sm border-[#E5E7EB]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Fiction">Fiction</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Kids">Kids</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="quantity"
                      className="text-xs font-semibold text-[#1F2937]"
                    >
                      Total Copies
                    </Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      className="h-8.5 sm:h-9 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="image"
                    className="text-xs font-semibold text-[#1F2937]"
                  >
                    Image URL
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="h-8.5 sm:h-9 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="description"
                    className="text-xs font-semibold text-[#1F2937]"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="text-xs sm:text-sm"
                  />
                </div>

                <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-0 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                    className="w-full sm:w-auto h-8.5 sm:h-9 text-xs mt-0"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full sm:w-auto h-8.5 sm:h-9 text-xs bg-[#1E3A2F] hover:bg-[#162B23] text-white"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* =================== ২. DELETE ALERT DIALOG =================== */}
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 sm:h-8 px-2.5 sm:px-3 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 text-[11px] sm:text-xs font-normal"
                >
                  Delete
                </Button>
              }
            />
            <AlertDialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-sm sm:max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-lg">
              <AlertDialogHeader className="text-left space-y-1 sm:space-y-1.5">
                <AlertDialogTitle className="text-base sm:text-lg font-bold text-[#1F2937]">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  This action cannot be undone. This will permanently remove{" "}
                  <strong className="text-[#1F2937] font-semibold wrap-break-words">
                    {book.title}
                  </strong>{" "}
                  from the library collection.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-0 pt-2">
                <AlertDialogCancel className="w-full sm:w-auto border-[#E5E7EB] text-xs py-2 sm:py-2.5 cursor-pointer mt-0">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(book._id)}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-xs py-2 sm:py-2.5 cursor-pointer"
                >
                  Confirm Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  );
};

export default MyBookRow;
