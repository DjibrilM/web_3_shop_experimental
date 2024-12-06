'use client'

import { queryKeys } from '@/util/constants';
import { SlBasket } from "react-icons/sl";
import { getSellerOrders } from '@/util/services/backendHttp';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useAccount } from 'wagmi';
import Visible from '../common/Visible';
import OrderElement from '../OrderElement';
import Loader from '../common/vectors/Loader';

export const Orders = () => {
    const { address } = useAccount();
    const { data, error, isLoading } = useQuery({
      queryFn: async () => {
        const data = await getSellerOrders(address!);
        return data;
      },
      queryKey: [queryKeys.fetchSellerOrders],
      enabled: !!address,
      initialData: [],
    });
  
  console.log({data});
  
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
}
