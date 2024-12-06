"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wallet from "@/components/dashboard/Wallet";
import Products from "@/components/dashboard/Products";
import { Orders } from "@/components/dashboard/Orders";
import { useAccount } from "wagmi";

const page = () => {
    const { address } = useAccount();
    
  return (
    <main className="container-padding">
      <Tabs defaultValue="wallet" className="w-full mt-10">
        <TabsList className="grid w-full bg-gray-300 grid-cols-3">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet">
          <Wallet />
        </TabsContent>
        <TabsContent value="products">
          <Products walletAddress={address || ("" as any)} />
        </TabsContent>
        <TabsContent value="orders">
          <Orders />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default page;
