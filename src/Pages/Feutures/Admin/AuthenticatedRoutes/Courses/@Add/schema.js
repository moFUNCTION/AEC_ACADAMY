import { z } from "zod";
const imageSchema = z
  .instanceof(File, { message: "Image must be a valid file." })
  .refine((file) => file.size < 50 * 1024 * 1024, {
    message: "Image size must be less than 50MB.",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    {
      message: "Only JPG, PNG, or WEBP images are allowed.",
    }
  );
export const schema = z.object({
  image: imageSchema,
  title: z.string().min(1, { message: "Title is required." }),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Level must be one of: beginner, intermediate, or advanced.",
  }),
  price: z
    .number({
      message: "Price is Required",
    })
    .min(0, { message: "Price must be a positive number." }),
  language: z
    .string({
      message: "Language is Required",
    })
    .length(2, { message: "Language must be a valid 2-letter code." }),
  category: z.string().uuid({ message: "Category must be a valid UUID." }),
  subCategory: z
    .string()
    .uuid({ message: "Sub-category must be a valid UUID." }),
  description: z.string().min(1, { message: "Description is required." }),
});
