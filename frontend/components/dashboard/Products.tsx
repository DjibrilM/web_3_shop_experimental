"use client";

import { queryKeys } from "@/util/constants";
import NewProduct from "./NewProduct";
import Product from "../common/Product";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { getSellerProducts } from "@/util/services/backendHttp";
import useAccountStore from "@/util/state/account.state";
import Visible from "../common/Visible";

const Products = ({ walletAddress }: { walletAddress: Address }) => {
  const { validators } = useAccountStore();
  const { data: products } = useQuery({
    queryKey: [queryKeys.fetchSellerProducts],
    queryFn: async () => getSellerProducts(walletAddress),
  });

  return (
    <div>
      <div className="grid  grid-cols-2 lg:grid-cols-4 gap-3">
        {products?.map((product) => (
          <Product key={"dashboard-product-" + product._id} {...product} />
        ))}
      </div>
      <Visible visible={Boolean(validators.length)}>
        <NewProduct />
      </Visible>
    </div>
  );
};

export default Products;
