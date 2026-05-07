import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name too short").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email").max(254, "Email too long"),
  subject: z.string().trim().min(3, "Subject too short").max(200, "Subject too long"),
  message: z.string().trim().min(10, "Message too short").max(5000, "Message too long"),
});

export type ContactPayload = z.infer<typeof contactSchema>;
