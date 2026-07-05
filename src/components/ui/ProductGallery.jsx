import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react'
import ArtworkImage from './ArtworkImage'

function ProductGallery({ images = [], title }) {
  const galleryImages = images.length > 0 ? images : [null]
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const touchStartX = useRef(null)

  const imageCount = galleryImages.length
  const activeImage = galleryImages[activeIndex]

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + imageCount) % imageCount)
    setZoomed(false)
  }, [imageCount])

  const showNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % imageCount)
    setZoomed(false)
  }, [imageCount])

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return

    const difference = touchStartX.current - event.changedTouches[0].clientX
    touchStartX.current = null

    if (Math.abs(difference) < 42) return
    if (difference > 0) showNext()
    else showPrevious()
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
      if (event.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false)
        setZoomed(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, showNext, showPrevious])

  useEffect(() => {
    if (!lightboxOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [lightboxOpen])

  return (
    <>
      <div className="product-gallery" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="gallery-main-frame">
          <button className="gallery-nav gallery-nav-prev" type="button" onClick={showPrevious} aria-label="Previous image">
            <ChevronLeft size={24} />
          </button>
          <button className="gallery-image-button" type="button" onClick={() => setLightboxOpen(true)} aria-label="Open image viewer">
            <ArtworkImage
              key={activeImage}
              src={activeImage}
              alt={`${title} ${activeIndex + 1}`}
              placeholderText={title}
              className="gallery-main-image"
            />
            <span className="gallery-zoom-hint">
              <Maximize2 size={16} /> View
            </span>
          </button>
          <button className="gallery-nav gallery-nav-next" type="button" onClick={showNext} aria-label="Next image">
            <ChevronRight size={24} />
          </button>
          <span className="gallery-counter">{activeIndex + 1} / {imageCount}</span>
        </div>

        <div className="thumbnail-row" aria-label="Product image thumbnails">
          {galleryImages.map((image, index) => (
            <button
              className={`gallery-thumbnail ${index === activeIndex ? 'gallery-thumbnail-active' : ''}`}
              type="button"
              key={`${image}-${index}`}
              onClick={() => {
                setActiveIndex(index)
                setZoomed(false)
              }}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <ArtworkImage src={image} alt={`${title} thumbnail ${index + 1}`} placeholderText={title} />
            </button>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${title} image viewer`}>
          <button
            className="lightbox-close"
            type="button"
            onClick={() => {
              setLightboxOpen(false)
              setZoomed(false)
            }}
            aria-label="Close image viewer"
          >
            <X size={24} />
          </button>
          <button className="lightbox-nav lightbox-nav-prev" type="button" onClick={showPrevious} aria-label="Previous image">
            <ChevronLeft size={30} />
          </button>
          <button
            className="lightbox-image-button"
            type="button"
            onClick={() => setZoomed((value) => !value)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Zoom image"
          >
            <ArtworkImage
              key={`${activeImage}-lightbox-${zoomed}`}
              src={activeImage}
              alt={`${title} ${activeIndex + 1}`}
              placeholderText={title}
              className={`lightbox-image ${zoomed ? 'lightbox-image-zoomed' : ''}`}
            />
          </button>
          <button className="lightbox-nav lightbox-nav-next" type="button" onClick={showNext} aria-label="Next image">
            <ChevronRight size={30} />
          </button>
          <div className="lightbox-toolbar">
            <span>{activeIndex + 1} / {imageCount}</span>
            <button type="button" onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? 'Zoom out' : 'Zoom in'}>
              {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductGallery
