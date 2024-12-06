"use client";

import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Logo } from "./vectors";
import { useAccount, useDisconnect } from "wagmi";
import { createUser } from "@/util/services/backendHttp";
import ShoppingButton from "../ShoppingButton";

import Link from "next/link";
import Visible from "./Visible";
import { Address } from "@/util/types/shared";
import useAccountStore from "@/util/state/account.state";
import { useQuery } from "@tanstack/react-query";
import BalanceModal from "./BalanceModal";
import { queryKeys } from "@/util/constants";

const createAccount = async (address: Address) => {
  try {
    const response = await createUser({ walletAddress: address });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const MainHeader = () => {
  const { isConnected, address } = useAccount();

  const { error, data: user,isLoading } = useQuery({
    queryKey: [queryKeys.createAccount],
    queryFn: async () => await createAccount(address!),
    enabled: !!address,
  });

  const { disconnect } = useDisconnect();
  const { updateAccount } = useAccountStore();

  useEffect(() => {
    if (user) {
      updateAccount(user);
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (error) {
      disconnect();
    }
  }, [disconnect]);

  return (
    <header className="h-16 bg-white/10 backdrop-blur-md sticky top-0">
      <div className="flex items-center justify-between h-full container-padding">
        <Link href={"/"}>
          <Logo className="w-8 h-8" />
        </Link>

        <Visible visible={isConnected}>
          <BalanceModal />
        </Visible>

        <div className="flex items-center gap-4">
          <ConnectButton
            chainStatus="name"
            accountStatus="avatar"
            showBalance={false}
          />

          <Visible visible={isConnected}>
            <ShoppingButton />
          </Visible>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
