"use client";

import axios from "axios";
import React, { useEffect } from "react";
import useEthereumStateStore from "@/util/state/ethereumTokenPrice.state";
import { Coin } from "@/util/types/ethereumToken";
import { useQuery } from "@tanstack/react-query";

const fetchToken = async () => {
  const { data } = await axios<Coin[]>(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=16&page=1&sparkline=false"
  );
  return data;
};

const EthereumTokenStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { updateToken } = useEthereumStateStore();
  const { data } = useQuery({
    queryKey: [],
    queryFn: async () => await fetchToken(),
  });

  useEffect(() => {
    if (data) {
      updateToken(data[0]);
      data[0];
    }
  }, [data]);

  return <>{children}</>;
};

export default EthereumTokenStateProvider;
