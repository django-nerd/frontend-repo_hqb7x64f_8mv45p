import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [prodRes, catRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/products`).then(r => r.json()),
          fetch(`${BACKEND_URL}/api/categories`).then(r => r.json()),
        ])
        setProducts(prodRes)
        setFiltered(prodRes)
        setCategories(['All', ...catRes])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const onSearch = (q) => {
    const ql = q.toLowerCase()
    const list = products.filter(p =>
      p.title.toLowerCase().includes(ql) || (p.description || '').toLowerCase().includes(ql)
    )
    setActiveCategory('All')
    setFiltered(list)
  }

  const filterByCategory = (cat) => {
    setActiveCategory(cat)
    if (cat === 'All') return setFiltered(products)
    setFiltered(products.filter(p => p.category === cat))
  }

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (item) => {
    setCart(prev => prev.filter(i => i.id !== item.id))
  }

  const sections = useMemo(() => (
    [
      { key: 'Pizza', color: 'from-rose-500/10' },
      { key: 'Burgers', color: 'from-amber-500/10' },
      { key: 'Sushi', color: 'from-cyan-500/10' },
      { key: 'Desserts', color: 'from-fuchsia-500/10' },
    ]
  ), [])

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Navbar onSearch={onSearch} onToggleCart={() => setCartOpen(true)} cartCount={cart.reduce((s,i)=>s+i.qty,0)} />

      <main className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <section className="py-10 sm:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Crave. Click. Enjoy.
              </h1>
              <p className="mt-4 text-neutral-600 dark:text-neutral-300">
                Discover the best local dishes delivered fast. From sizzling pizzas to fresh sushi, your favorites are a tap away.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => filterByCategory(c)}
                    className={`px-4 py-2 rounded-full text-sm border ${activeCategory===c? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white' : 'border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 blur-2xl rounded-3xl" />
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGb29kfGVufDB8MHx8fDE3NjI5ODkzMzR8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Food" className="relative rounded-2xl shadow-2xl border border-white/10" />
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Popular Dishes</h2>
            <button onClick={() => onSearch('')} className="text-sm text-rose-600 hover:text-rose-700">View all</button>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({length:6}).map((_,i)=> (
                <div key={i} className="h-72 rounded-xl bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-neutral-500 dark:text-neutral-400 text-sm">
          © {new Date().getFullYear()} Foodie. All rights reserved.
        </div>
      </footer>

      <CartDrawer open={cartOpen} items={cart} onClose={()=>setCartOpen(false)} onRemove={removeFromCart} />
    </div>
  )
}
