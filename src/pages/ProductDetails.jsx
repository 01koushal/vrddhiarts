import InstagramIcon from '../components/ui/InstagramIcon'
import { Navigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Button from '../components/ui/Button'
import ProductGallery from '../components/ui/ProductGallery'
import ProductCard from '../components/ui/ProductCard'
import { siteConfig } from '../config/siteConfig'
import { getProductById, getRelatedProducts } from '../utils/catalog'

function ProductDetails() {
  const { productId } = useParams()
  const product = getProductById(productId)

  if (!product) return <Navigate to="/404" replace />

  const related = getRelatedProducts(product)

  return (
    <section className="section page-section">
      <div className="container">
        <Breadcrumbs segments={product.categoryPath} current={product.title} />
        <div className="product-detail-grid">
          <div className="product-media">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          <article className="product-detail-copy">
            <span className="eyebrow">Price on Request</span>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div className="detail-list">
              <span>Customization Available</span>
              <span>Contact us for pricing</span>
              {product.placeholder && <span>Placeholder content</span>}
            </div>
            <div className="hero-actions">
              <Button href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
                <InstagramIcon size={18} /> Contact on Instagram
              </Button>
            </div>
          </article>
        </div>

        {related.length > 0 && (
          <div className="related-section">
            <h2>Related Products</h2>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductDetails

