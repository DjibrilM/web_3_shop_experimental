import { queryKeys } from "@/util/constants";
import { useRouter } from "next/navigation";
import Loader from "./common/vectors/Loader";
import { getClientOrders } from "@/util/services/backendHttp";
import React from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import { useAccount } from "wagmi";
import { useQuery } from "wagmi/query";
import Visible from "./common/Visible";
import { cn } from "@/lib/cn";

const ShoppingButton = () => {
  const { address } = useAccount();
  const { push } = useRouter();

  const { data, error, isLoading } = useQuery({
    queryFn: async () => {
      const data = await getClientOrders(address!);
      return data;
    },
    queryKey: [queryKeys.clientOrders],
    enabled: !!address,
    initialData: [],
  });

  const orders = data as any;


  return (
    <button
      onClick={() => push("client-orders")}
      className="h-10 relative w-10 bg-black/10 flex justify-center items-center rounded-full"
    >
      <PiShoppingCartLight className="text-black/55 text-[18px]" />
      <div
        className={cn(
          "absolute scale-0 duration-200 border-slate-300 border-2 bottom-[-5px] right-[-20px] flex justify-center items-center z-40 bg-red-600 rounded-full text-sm text-white w-10 h-10",
          {
            "scale-50": Boolean(orders?.length),
          }
        )}
      >
        <Visible visible={isLoading}>
          <Loader />
        </Visible>

        <Visible visible={!error && !!data && !isLoading}>
          {/* @ts-ignore */}
          <p>{data?.length > 10 ? "+10" : data?.length}</p>
        </Visible>
      </div>
    </button>
  );
};

export default ShoppingButton;
