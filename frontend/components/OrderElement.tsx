"use client";
import { FaEthereum } from "react-icons/fa";
import { Order } from "@/util/types/shared";

import React from "react";
import useEthereumStateStore from "@/util/state/ethereumTokenPrice.state";

const OrderElement: React.FC<Order> = ({ _id, product }) => {
  const { coin } = useEthereumStateStore();

  return (
    <div className="h-[330px] bg-white rounded-lg p-4">
      <div className="h-[200px] w-full overflow-hidden bg-slate-200 rounded-lg">
        <img
          className="w-full select-none h-full object-cover"
          src={product.imageUrl}
          alt=""
        />
      </div>

      <p className="relative text-slate-500 top-2">{product.name}</p>

      <p className="text-[11px] bg-slate-200 rounded-lg text-slate-600 p-2 mt-5">
        {_id}
      </p>

      <div className="flex justify-between relative top-1">
        <p className="flex text-slate-500 items-center text-sm">
          {product.price}
          <span className="ml-1">
            <FaEthereum className="h-4 w-4 bg-slate-300 rounded-full p-[3px]" />
          </span>
        </p>

        <p className="font-bold text-slate-600">
          {coin.current_price !== 0 &&
            (product.price * coin.current_price).toFixed(3) + "$"}
        </p>
      </div>
    </div>
  );
};

export default OrderElement;
