import type { Product } from "../../models/Product";

interface ProductDetailsProps {
  product: Product | null;
}

function ProductDetails({ product }: ProductDetailsProps) {
  if (!product) {
    return <p>Seleziona un prodotto</p>;
  }

  return (
    <div className="product-details">
      <h1 className="title">{product.name}</h1>
      <p className="price">{product.currentPrice} €</p>
      <img
        className="image"
        src={product.thumbnail ?? product.imageUrl}
        alt={product.name}
      />
    </div>
  );
}

export default ProductDetails;