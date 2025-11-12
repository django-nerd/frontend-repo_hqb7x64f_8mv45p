import { useEffect, useState } from 'react'
import { ShoppingCart, Sun, MoonStar, UtensilsCrossed, Menu } from 'lucide-react'

export default function Navbar({ onSearch, onToggleCart, cartCount = 0 }) {
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState('light')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'light'
    setTheme(stored)
    document.documentElement.classList.toggle('dark', stored === 'dark')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  const submit = (e) => {
    e.preventDefault()
    onSearch?.(query)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-neutral-100">
            <UtensilsCrossed className="h-6 w-6 text-rose-500" />
            <span className="text-lg">Foodie</span>
          </a>

          <form onSubmit={submit} className="hidden md:flex items-center flex-1 max-w-xl mx-4">
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Search dishes, e.g. pizza, sushi..."
              className="w-full rounded-md px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </form>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="h-10 w-10 grid place-items-center rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
            </button>
            <button onClick={onToggleCart} className="relative h-10 px-3 rounded-md bg-rose-500 text-white hover:bg-rose-600 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:block">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-white text-rose-600 rounded-full h-5 w-5 grid place-items-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setOpen(!open)} className="md:hidden h-10 w-10 grid place-items-center rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <form onSubmit={submit} className="flex items-center">
              <input
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search dishes..."
                className="w-full rounded-md px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button type="submit" className="ml-2 px-4 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600">Search</button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
