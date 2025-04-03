import getProduct from '@/actions/get-Product';
import getProducts from '@/actions/get-products';
import Gallery from '@/components/frontentend/components/Gallery';
import Info from '@/components/frontentend/components/Info';
import ProductList from '@/components/frontentend/components/ProductList';
import { Container } from '@/components/frontentend/components/ui/Container';



interface ProductPageProps {
    params: {
        productId: string;
    }
}

const ProductPage: React.FC<ProductPageProps> = async({
    params
}) => {
    const product = await getProduct(params.productId)
    
    const suggestedProducts = await getProducts({
        categoryId: product?.category?.id
    })

  return (
    <div className='bg-white'>
<Container>
    <div className="px-4 py-10 sm:px-6 lg:gap-x-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-0">
            {/* Gallery */}
           <Gallery  images= {product.images}/>
            <div className="mt-10 px-4 sm:mt-16 sm:px0 lg:mt-0">
                {/* info */}
                <Info data ={product}/>
            </div>
        </div>
        <hr className='my-10' />
        <ProductList title='Related Items' items={suggestedProducts}/>
    </div>
</Container>
    </div>
  )
}

export default ProductPage