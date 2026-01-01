import { z } from 'zod';

export const orderSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipcode: z.string().min(1, 'Zipcode is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().min(8, 'Phone number is invalid'),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
