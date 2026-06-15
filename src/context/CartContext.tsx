'use client'

import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  size: string
  qty: number
  image?: string
}

type State = { items: CartItem[]; open: boolean }
type Action =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: string; size: string }
  | { type: 'SET_QTY'; id: string; size: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }

function key(id: string, size: string) { return `${id}__${size}` }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const k = key(action.item.id, action.item.size)
      const existing = state.items.find(i => key(i.id, i.size) === k)
      const items = existing
        ? state.items.map(i => key(i.id, i.size) === k ? { ...i, qty: i.qty + action.item.qty } : i)
        : [...state.items, action.item]
      return { items, open: true }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => key(i.id, i.size) !== key(action.id, action.size)) }
    case 'SET_QTY':
      return { ...state, items: state.items.map(i => key(i.id, i.size) === key(action.id, action.size) ? { ...i, qty: action.qty } : i) }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'OPEN':
      return { ...state, open: true }
    case 'CLOSE':
      return { ...state, open: false }
    default:
      return state
  }
}

const CartCtx = createContext<{
  items: CartItem[]
  open: boolean
  totalItems: number
  totalPrice: number
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
  setQty: (id: string, size: string, qty: number) => void
  clear: () => void
  openCart: () => void
  closeCart: () => void
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], open: false })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vbk_cart')
      if (saved) dispatch({ type: 'CLEAR' })
      const parsed: CartItem[] = saved ? JSON.parse(saved) : []
      parsed.forEach(item => dispatch({ type: 'ADD', item }))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('vbk_cart', JSON.stringify(state.items))
  }, [state.items])

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartCtx.Provider value={{
      items: state.items,
      open: state.open,
      totalItems,
      totalPrice,
      addItem: (item) => dispatch({ type: 'ADD', item }),
      removeItem: (id, size) => dispatch({ type: 'REMOVE', id, size }),
      setQty: (id, size, qty) => dispatch({ type: 'SET_QTY', id, size, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
      openCart: () => dispatch({ type: 'OPEN' }),
      closeCart: () => dispatch({ type: 'CLOSE' }),
    }}>
      {children}
    </CartCtx.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
