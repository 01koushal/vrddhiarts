import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, RotateCcw, X } from 'lucide-react'
import ArtworkImage from './ArtworkImage'

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.35
const SWIPE_THRESHOLD = 42

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const getTouchDistance = (touches) => {
  const [first, second] = touches
  return Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY)
}

function ProductGallery({ images = [], title }) {
  const galleryImages = images.length > 0 ? images : [null]
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const touchStartX = useRef(null)
  const pinchState = useRef(null)
  const panState = useRef(null)

  const imageCount = galleryImages.length
  const activeImage = galleryImages[activeIndex]
  const isZoomed = zoom > MIN_ZOOM

  const resetZoom = useCallback(() => {
    setZoom(MIN_ZOOM)
    setPan({ x: 0, y: 0 })
  }, [])

  const updateZoom = useCallback((nextZoom) => {
    setZoom((currentZoom) => {
      const resolvedZoom = clamp(typeof nextZoom === 'function' ? nextZoom(currentZoom) : nextZoom, MIN_ZOOM, MAX_ZOOM)
      if (resolvedZoom === MIN_ZOOM) setPan({ x: 0, y: 0 })
      return resolvedZoom
    })
  }, [])

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + imageCount) % imageCount)
    resetZoom()
  }, [imageCount, resetZoom])

  const showNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % imageCount)
    resetZoom()
  }, [imageCount, resetZoom])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    resetZoom()
  }, [resetZoom])

  const openLightbox = () => {
    resetZoom()
    setLightboxOpen(true)
  }

  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      pinchState.current = {
        distance: getTouchDistance(event.touches),
        zoom,
      }
      touchStartX.current = null
      return
    }

    if (zoom === MIN_ZOOM && event.touches.length === 1) {
      touchStartX.current = event.touches[0].clientX
    }
  }

  const handleTouchMove = (event) => {
    if (event.touches.length !== 2 || !pinchState.current) return

    event.preventDefault()
    const nextZoom = pinchState.current.zoom * (getTouchDistance(event.touches) / pinchState.current.distance)
    updateZoom(nextZoom)
  }

  const handleTouchEnd = (event) => {
    if (event.touches.length < 2) pinchState.current = null
    if (zoom > MIN_ZOOM || touchStartX.current === null) return

    const difference = touchStartX.current - event.changedTouches[0].clientX
    touchStartX.current = null

    if (Math.abs(difference) < SWIPE_THRESHOLD) return
    if (difference > 0) showNext()
    else showPrevious()
  }

  const handleWheel = (event) => {
    event.preventDefault()
    const direction = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
    updateZoom((currentZoom) => currentZoom + direction)
  }

  const handleDoubleClick = () => {
    if (zoom > MIN_ZOOM) resetZoom()
    else updateZoom(2)
  }

  const handlePointerDown = (event) => {
    if (zoom === MIN_ZOOM) return

    event.currentTarget.setPointerCapture(event.pointerId)
    panState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      pan,
    }
  }

  const handlePointerMove = (event) => {
    if (!panState.current || panState.current.pointerId !== event.pointerId) return

    setPan({
      x: panState.current.pan.x + event.clientX - panState.current.startX,
      y: panState.current.pan.y + event.clientY - panState.current.startY,
    })
  }

  const endPan = (event) => {
    if (panState.current?.pointerId === event.pointerId) panState.current = null
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
      if (event.key === 'Escape' && lightboxOpen) closeLightbox()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeLightbox, lightboxOpen, showNext, showPrevious])

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
          <button className="gallery-image-button" type="button" onClick={openLightbox} aria-label="Open image viewer">
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
                resetZoom()
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
          <button className="lightbox-close" type="button" onClick={closeLightbox} aria-label="Close image viewer">
            <X size={24} />
          </button>
          <button className="lightbox-nav lightbox-nav-prev" type="button" onClick={showPrevious} aria-label="Previous image">
            <ChevronLeft size={30} />
          </button>
          <div
            className={`lightbox-image-stage ${isZoomed ? 'lightbox-image-stage-zoomed' : ''}`}
            onWheel={handleWheel}
            onDoubleClick={handleDoubleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endPan}
            onPointerCancel={endPan}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="presentation"
          >
            <ArtworkImage
              key={`${activeImage}-lightbox`}
              src={activeImage}
              alt={`${title} ${activeIndex + 1}`}
              placeholderText={title}
              className="lightbox-image"
              style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})` }}
            />
          </div>
          <button className="lightbox-nav lightbox-nav-next" type="button" onClick={showNext} aria-label="Next image">
            <ChevronRight size={30} />
          </button>
          <div className="lightbox-toolbar">
            <span>{activeIndex + 1} / {imageCount}</span>
            <button type="button" onClick={() => updateZoom((value) => value - ZOOM_STEP)} aria-label="Zoom out">
              <Minus size={18} />
            </button>
            <button type="button" onClick={() => updateZoom((value) => value + ZOOM_STEP)} aria-label="Zoom in">
              <Plus size={18} />
            </button>
            <button type="button" onClick={resetZoom} aria-label="Reset zoom">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductGallery
