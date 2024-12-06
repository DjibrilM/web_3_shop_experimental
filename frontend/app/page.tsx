import { Product as ProductElementType } from "@/util/types/shared";
import Product from "@/components/common/Product";
import { BACKEN_BASE_URL } from "@/util/constants";

export default async function Home() {
    let data = await fetch(BACKEN_BASE_URL + "products");
    let products = (await data.json()) as ProductElementType[];
  return (
    <main className="grid pt-20 container-padding  grid-cols-2 lg:grid-cols-4 gap-3">
      {products?.map((product) => (
        <Product key={'home-product-'+product._id} {...product} />
      ))}
    </main>
  );
}
