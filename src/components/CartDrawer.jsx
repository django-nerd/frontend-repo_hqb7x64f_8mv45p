import { useMemo } from 'react'
import { X, Trash2 } from 'lucide-react'

export default function CartDrawer({ open, items, onClose, onRemove }) {
  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items])

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Your Cart</h3>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-140px)]">
          {items.length === 0 && (
            <p className="text-neutral-500 dark:text-neutral-400">Your cart is empty.</p>
          )}
          {items.map((it) => (
            <div key={it.id + it.title} className="flex items-center gap-3 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
              <img src={`https://picsum.photos/seed/${encodeURIComponent(it.title)}/120/90`} alt={it.title} className="h-16 w-20 rounded object-cover" />
              <div className="flex-1">
                <div className="font-medium text-neutral-900 dark:text-neutral-100">{it.title}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Qty: {it.qty}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">${(it.price * it.qty).toFixed(2)}</div>
                <button onClick={() => onRemove?.(it)} className="mt-2 inline-flex items-center gap-1 text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-neutral-600 dark:text-neutral-300">Subtotal</span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">${subtotal.toFixed(2)}</span>
          </div>
          <button className="w-full rounded-md bg-rose-500 hover:bg-rose-600 text-white py-2 font-medium">Checkout</button>
        </div>
      </aside>
    </div>
  )
}
