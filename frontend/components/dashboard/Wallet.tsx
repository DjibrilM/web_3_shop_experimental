"use client";

import useAccountStore from "@/util/state/account.state";
import React from "react";
import { GoShieldLock } from "react-icons/go";
import { Geist_Mono } from "next/font/google";
import { GoKey } from "react-icons/go";
import { cn } from "@/lib/cn";

const geist_Mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Wallet = () => {
  const { validators, balance } = useAccountStore();
  return (
    <div>
      <div className="w-full p-4 rounded-xl border border-black/10 bg-white">
        <div className="flex  gap-2 className text-slate-500 items-center">
          <GoShieldLock />
          <p>Validators</p>
        </div>

        <div className="mt-10">
          {validators.map((address) => (
            <div
              key={address}
              className="p-4 flex items-center gap-3 text-slate-500  bg-slate-200 rounded-lg mb-3 border border-black/10"
            >
              <GoKey />
              <p className="">{address}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-4 mt-4 rounded-xl border border-black/10 bg-white">
        <p className="text-[18px] text-center text-slate-500">Balance</p>
        <h3
          className={cn(
            "text-center text-slate-500 mt-4 text-2xl",
            geist_Mono.className
          )}
        >
          {balance >= 0 ? balance / 1e18 : balance.toFixed(4)} ETH
        </h3>
      </div>
    </div>
  );
};

export default Wallet;
