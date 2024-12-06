"use client";

import { IoCloseOutline } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import { isAddress } from "viem";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/widget/Button";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Address } from "@/util/types/shared";
import { ToastAction } from "@radix-ui/react-toast";

import usePayamentGatewayContract from "@/hooks/contracts/usePayamentGatewayContract";
import { updateAccount } from "@/util/services/backendHttp";
import useAccountStore from "@/util/state/account.state";
import { queryKeys } from "@/util/constants";

const page = () => {
  const { invalidateQueries } = useQueryClient();
  const { walletAddress } = useAccountStore();
  const { createWallet, isPending, error, isSuccess } =
    usePayamentGatewayContract();
  const [addresses, setAdrreses] = useState<Address[]>([]);
  const [addressInputValue, setAddressInputValue] = useState("");

  const FormSchema = z.object({
    validationCount: z.number().min(2, {
      message: "Validation counts can't be less than 2",
    }),
    validator: z.string({ message: "Incorrect address" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      validationCount: 2,
      validator: "",
    },
  });

  const appendAddress = () => {
    if (!isAddress(addressInputValue)) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "invalid address provided",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else if (addresses.indexOf(addressInputValue) > -1) {
      toast({
        description: "Address already added!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      setAdrreses([addressInputValue, ...addresses]);
      setAddressInputValue("");
    }
  };

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const validationCount = formData.get("validationCount") as string;

    await createWallet({
      validationCount: Number(validationCount),
      validators: addresses,
    });

    location.reload();
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      toast({
        description: "Failed to create wallet!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [error]);

  const updatecurrentUserAccount = async () => {
    try {
      await updateAccount(walletAddress);
      invalidateQueries({ queryKey: [queryKeys.createAccount] });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      updatecurrentUserAccount();
      toast({
        description: "Wallet created",
      });
    }
  }, [isSuccess]);

  return (
    <main className="container-padding pb-10">
      <Form {...form}>
        <form
          onSubmit={formSubmit}
          action=""
          className="max-w-[600px] p-4 mt-10 mx-auto rounded-lg border border-slate-200 bg-white"
        >
          <p className="text-slate-600 text-sm mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            cupiditate sunt, quas harum dolorum, impedit incidunt hic eius qui
            ipsa repudiandae corporis quisquam reiciendis unde, ea maxime
            ratione praesentium illum?
          </p>

          <FormField
            control={form.control}
            name="validationCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Validation count</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    min={2}
                    max={10}
                    type="number"
                    placeholder="validation couts"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="validator"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormControl>
                  <div className="flex gap-3">
                    <Input
                      {...field}
                      type="text"
                      placeholder="0x...."
                      value={addressInputValue}
                      onChange={(e)=> setAddressInputValue(e.target.value) }
                    />
                    <Button
                      onClick={appendAddress}
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add validator {addresses.length}/10
                    </Button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4">
            {addresses.map((address) => (
              <div
                key={"form-validators-" + address}
                className="bg-[#f0f1f5] mb-4 p-2 flex border border-black/5 rounded-xl items-center gap-4 justify-between"
              >
                <p className="text-sm text-slate-600">{address}</p>
                <Button
                  type="button"
                  onClick={() =>
                    setAdrreses([...addresses].filter((ads) => ads !== address))
                  }
                >
                  <IoCloseOutline />
                </Button>
              </div>
            ))}
          </div>
          <Button
            isLoading={isPending}
            disabled={isPending || addresses.length < 1}
            type="submit"
            className="w-full mt-3"
          >
            create wallet
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default page;
