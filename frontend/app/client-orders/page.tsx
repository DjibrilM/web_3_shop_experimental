"use client";

import React from "react";
import Loader from "@/components/common/vectors/Loader";
import OrderElement from "@/components/OrderElement";
import { useQuery } from "@tanstack/react-query";
import { getClientOrders } from "@/util/services/backendHttp";
import { queryKeys } from "@/util/constants";
import { useAccount } from "wagmi";
import Visible from "@/components/common/Visible";
import { SlBasket } from "react-icons/sl";

const orders = () => {
  const { address } = useAccount();
  const { data, error, isLoading } = useQuery({
    queryFn: async () => {
      const data = await getClientOrders(address!);
      return data;
    },
    queryKey: [queryKeys.clientOrders],
    enabled: !!address,
    initialData: [],
  });

  return (
    <>
      <Visible visible={!!data && data.length < 1}>
        <div className="flex justify-center items-center w-full flex-col gap-3">
          <p className="text-center mt-10 text-slate-600">No orders yet</p>
          <SlBasket className="text-3xl text-slate-700" />
        </div>
      </Visible>
      <Visible visible={isLoading}>
        <Loader className="mx-auto my-10" />
      </Visible>
      <main className="grid pt-20 pb-10 container-padding  grid-cols-2 lg:grid-cols-4 gap-3">
        {data?.map((order) => (
          <OrderElement {...order} />
        ))}
      </main>
    </>
  );
};

export default orders;
