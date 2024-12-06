"use client";


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";

import { Product } from "@/util/types/shared";
import Button from "../widget/Button";
import { Coin } from "@/util/types/ethereumToken";

import usePayamentGatewayContract from "@/hooks/contracts/usePayamentGatewayContract";
import { Address } from "viem";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/util/constants";

interface Props {
  product: Product;
  ethereumState: Coin;
}

const OrderButton: React.FC<Props> = ({ product, ethereumState }) => {
  const queryClient = useQueryClient();
  const { placeOrder, isPending, error, isSuccess,hash } =
    usePayamentGatewayContract();

  const initiateOrder = async () => {
    try {
      placeOrder({
        productName: product.name,
        productId: product._id,
        price: product.price,
        amount: product.price.toString(),
        walletAddress: product.owner as Address,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        description: "Failed to create wallet!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Order placed succesfully",
      });

      queryClient.invalidateQueries({ queryKey: [queryKeys.clientOrders] });
    }
  }, [isSuccess,hash]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button isLoading={isPending} className="w-full mt-3">
          <p className="relative left-3">
            Buy Item
            <span>
              {(product.price * ethereumState.current_price).toFixed(3) + "$"}
            </span>
          </p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy item</DialogTitle>
          <DialogDescription>
            Are you sure you want to buy this item?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            isLoading={isPending}
            onClick={initiateOrder}
            className="w-full"
            type="submit"
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderButton;
