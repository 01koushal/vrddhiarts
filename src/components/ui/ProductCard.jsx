import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ArtworkImage from './ArtworkImage'

function ProductCard({ product }) {
  return (
    <Link className="product-card reveal" to={`/product/${product.id}`}>
      <ArtworkImage src={product.images?.[0]} alt={product.title} placeholderText={product.title} />
      <div className="product-card-body">
        <h3>{product.title}</h3>
        <p>Contact us for pricing</p>
        <span>
          <ArrowUpRight size={16} aria-hidden="true" />
          Price on request
        </span>
      </div>
    </Link>
  )
}

export default ProductCard
