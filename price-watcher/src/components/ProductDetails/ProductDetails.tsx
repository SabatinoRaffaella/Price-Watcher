import type { PriceHistory } from "../../models/PriceHistory";
import type { Product } from "../../models/Product";

interface ProductDetailsProps {
  product: Product | null;
  priceHistory: PriceHistory | null;
}

function ProductDetails({ 
  product,
  priceHistory,
 }: ProductDetailsProps) {
  if (!product) {
    return <p>Seleziona un prodotto</p>;
  }

  return (
    <div className="product-details">
      <h1 className="id">{product.id}</h1>
      <h1 className="title">{product.name}</h1>
      <p className="price">{product.currentPrice} €</p>
      <img
        className="image"
        src={product.thumbnail ?? product.imageUrl}
        alt={product.name}
      />
      <div className="price-history">
        <h2>Storico prezzi</h2>
        {priceHistory && priceHistory.length > 0 ? (
          priceHistory.getRecords().map((record) => (
          <div
            className="price-record"
            key={record.timestamp}
          >
          <span>{record.price.toFixed(2)} €</span>

          <span>
            {new Date(record.timestamp).toLocaleString("it-IT")}
          </span>
        </div>
          ))
        ) : (
          <p>Nessuno storico disponibile</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;