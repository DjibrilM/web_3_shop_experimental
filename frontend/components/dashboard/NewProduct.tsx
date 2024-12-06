"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PiPlus } from "react-icons/pi";

import { toast } from "@/hooks/use-toast";
import Button from "../widget/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { createProduct } from "@/util/services/backendHttp";
import { Product } from "@/util/types/shared";
import { useState } from "react";
import { useAccount } from "wagmi";

const FormSchema = z.object({
  name: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),

  price: z.string().min(0.0001, {
    message: "Price must be at least 00.001 ETH.",
  }),

  imageUrl: z.string().url({
    message: "Image url must be a url ",
  }),
});

const Products = () => {
  const { address } = useAccount();
  const [loading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsloading(true);
      const requestData = {
        ...data,
        price: Number(data.price),
        owner: address,
      } as Product;

      await createProduct(requestData);
      setIsloading(false);
      toast({ title: "Product successfully created" });
    } catch (error) {
      toast({ title: "Failed to create the product" });
      setIsloading(false);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="h-14 text-white flex justify-center items-center bg-slate-950 w-14 fixed bottom-8 right-10 rounded-full overflow-hidden border">
            <PiPlus />
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-[800px] w-full">
          <DialogHeader>
            <DialogTitle>Create product?</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product name</FormLabel>
                        <FormControl>
                          <Input placeholder="Product name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.001ETH"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image url</FormLabel>
                        <FormControl>
                          <Input placeholder="https://...." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button isLoading={loading} className="w-full" type="submit">
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
