"use client";

import { Product as ProductElementType } from "@/util/types/shared";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import OrderButton from "./OrderButton";
import useEthereumStateStore from "@/util/state/ethereumTokenPrice.state";

interface Props extends ProductElementType {}

const Product: React.FC<Props> = (props) => {
  const { coin } = useEthereumStateStore(); 

  return (
    <div className="bg-white h-[370px] flex flex-col border border-black/10 rounded-lg p-4">
      <div className="w-full border overflow-hidden rounded-md h-[250px] bg-slate-200">
        <img
          className="w-full h-full object-cover"
          src={props.imageUrl}
          alt={props.name}
        />
      </div>

      <div className="">
        <div className="flex my-2 justify-between items-center">
          <h3 className="text-[18px] font-semibold text-slate-600">
            {props.name}
          </h3>
        </div>

        <div className="flex text-sm justify-between">
          <p className="text-slate-600 flex items-center font-semibold gap-1">{props.price}<FaEthereum className="bg-slate-200 rounded-full h-4 w-4 p-[3px]"/></p>
          <p className="text-slate-600 font-bold">
            {coin.current_price !== 0 &&
              (props.price * coin.current_price).toFixed(3) + "$"}
          </p>
        </div>

        <div className="self-end">
          <OrderButton ethereumState={coin} product={props} />
        </div>
      </div>
    </div>
  );
};

export default Product;
