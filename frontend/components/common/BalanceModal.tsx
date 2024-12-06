"use client";

import useAccountStore from "@/util/state/account.state";
import React, { useEffect, useState } from "react";
import { CiShop } from "react-icons/ci";
import Visible from "./Visible";
import { useRouter } from "next/navigation";
import { FaEthereum } from "react-icons/fa";
import usePayamentGatewayContract from "@/hooks/contracts/usePayamentGatewayContract";
import { useAccount } from "wagmi";
import Loader from "./vectors/Loader";
import { Geist_Mono } from "next/font/google";
import { cn } from "@/lib/cn";
import { Button } from "../ui/button";


const geist_Mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const BalanceModal = () => {
  const [expandBalanceModal, setExpandBalanceModal] = useState(false);
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  const { address } = useAccount();
  const { getWallet } = usePayamentGatewayContract();
  const { isSeller, updateBalance, balance, updateValidators, validators } =
    useAccountStore();
  const navigate = useRouter();

  const getWalletFromContract = async () => {
    if (address) {
      try {
        setIsLoadingWallet(true);
        const response = await getWallet(address);
        updateBalance(Number(response.balance));
        updateValidators([...response.validators]);
        setIsLoadingWallet(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getWalletFromContract();
  }, [address]);

  return (
    <div
      className={cn(
        "w-[200px] duration-300 h-10 cursor-pointer items-center flex gap-2 border bg-white rounded-xl p-2",
        {
          "h-40 w-[300px]": expandBalanceModal,
        }
      )}
    >
      <Visible visible={!Boolean(validators.length)}>
        <div onClick={() => navigate.push("new-wallet")} className="flex">
          <p className="text-sm px-3 text-slate-600">create seller's wallet</p>
          <CiShop className="text-slate-500" />
        </div>
      </Visible>

      <Visible visible={Boolean(validators.length)}>
        <div
          onClick={() => setExpandBalanceModal(!expandBalanceModal)}
          className={"w-full h-full relative"}
        >
          <Visible
            fallBack={
              <p
                className={cn(
                  "text-sm px-3 w-full flex select-none items-center justify-center h-full text-center text-slate-600",
                  geist_Mono.className
                )}
              >
                {balance > 0 ? balance / 1e18 : balance.toFixed(4)}{" "}
                <FaEthereum className="relative left-2" />
              </p>
            }
            visible={isLoadingWallet}
          >
            <Loader className="mx-auto h-4 w-4" />
          </Visible>

          <div
            className={cn(
              "w-full bottom-0 blur-xl opacity-[0] scale-[0] duration-300 absolute",
              {
                "scale-100 opacity-[1] blur-[0]": expandBalanceModal,
              }
            )}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate.push("dashboard");
                setExpandBalanceModal(false);
              }}
              className="w-full"
            >
              Open Dashboard
            </Button>
          </div>
        </div>
      </Visible>
    </div>
  );
};

export default BalanceModal;
