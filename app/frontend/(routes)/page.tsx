import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/frontentend/components/Billboard";
import ProductList from "@/components/frontentend/components/ProductList";
import { Container } from "@/components/frontentend/components/ui/Container";


export const revalidate = 0

export default async function HomePage() {
  const billboard = await getBillboard("e0000cb5-3d68-49a5-a328-1c0f4ed167db")
  const products = await getProducts({isFeatured: true})
  
  return (
   <Container >
    <div className ="space-y-10 pb-10">
<Billboard
data={billboard}
/>
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <ProductList title="Featured Products" items={products}/>
    </div>
    </div>
   </Container>
  );
}
