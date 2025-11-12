import { ShoppingBag, Star } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 relative">
        <img
          src={`https://picsum.photos/seed/${encodeURIComponent(product.title)}/600/400`}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">{product.title}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">{product.description}</p>
            <div className="mt-2 inline-flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-500" />
              <span className="text-xs text-neutral-600 dark:text-neutral-300">4.8</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">${product.price.toFixed(2)}</div>
            <div className={`text-xs ${product.in_stock ? 'text-emerald-600' : 'text-red-500'}`}>{product.in_stock ? 'In stock' : 'Sold out'}</div>
          </div>
        </div>
        <button onClick={() => onAdd?.(product)} className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 py-2 hover:opacity-90">
          <ShoppingBag className="h-4 w-4" /> Add to cart
        </button>
      </div>
    </div>
  )
}
