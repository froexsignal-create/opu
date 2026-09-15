/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { TrustBadges } from './components/TrustBadges';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { FacebookPixelModal } from './components/FacebookPixelModal';
import { AdminProductModal } from './components/AdminProductModal';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';

import { Product, CartItem, ProductOption, Order, ProductCategory } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { trackPixelEvent } from './utils/pixel';
import { ShoppingBag, Sparkles, MessageCircle, Phone } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mayer_heshel_custom_products');
      if (saved) {
        const custom = JSON.parse(saved);
        return [...INITIAL_PRODUCTS, ...custom];
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mayer_heshel_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isPixelModalOpen, setIsPixelModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('mayer_heshel_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Track initial PageView
  useEffect(() => {
    trackPixelEvent('PageView', {
      page: 'Home',
      title: 'মায়ের হেসেল - প্রিমিয়াম পিঠা ও দেশীয় খাবার',
    });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Add to Cart
  const handleAddToCart = (product: Product, option?: ProductOption, qty = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          (item.selectedOption?.label === option?.label || (!item.selectedOption && !option))
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prev, { product, selectedOption: option, quantity: qty }];
      }
    });

    // Fire Meta Pixel Event
    trackPixelEvent('AddToCart', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: (option ? option.price : product.price) * qty,
      currency: 'BDT',
      quantity: qty,
    });

    showToast(`"${product.name}" কার্টে যোগ করা হয়েছে!`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  // Remove from Cart
  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Direct 1-Click Order (For single item)
  const handleDirectOrder = (product: Product, option?: ProductOption) => {
    const singleItem: CartItem = {
      product,
      selectedOption: option,
      quantity: 1,
    };
    setCheckoutItems([singleItem]);
    setIsCheckoutOpen(true);
  };

  // Proceed from Cart to Checkout
  const handleProceedCheckoutFromCart = () => {
    if (cartItems.length === 0) return;
    setCheckoutItems(cartItems);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // On successful order
  const handleOrderSuccess = (order: Order) => {
    // Clear cart if items matched
    setCartItems([]);
    setIsCheckoutOpen(false);
    setCompletedOrder(order);
  };

  // Add new custom product (e.g. future grocery)
  const handleAddNewProduct = (newProduct: Product) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    try {
      const existing = JSON.parse(localStorage.getItem('mayer_heshel_custom_products') || '[]');
      localStorage.setItem('mayer_heshel_custom_products', JSON.stringify([newProduct, ...existing]));
    } catch (e) {
      console.error(e);
    }
    showToast(`নতুন পণ্য "${newProduct.name}" সফলভাবে যুক্ত হয়েছে!`);
  };

  // Filter products by category
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 selection:bg-[#1B5E20] selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-2xl border border-stone-700 flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPixelModal={() => setIsPixelModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        allProducts={products}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Hero Banner with Offers & Story */}
      <HeroBanner
        onExplorePitha={() => setActiveCategory('pitha')}
        onExploreGrocery={() => setActiveCategory('grocery')}
        onOpenPixelModal={() => setIsPixelModalOpen(true)}
      />

      {/* Trust Badges Bar */}
      <TrustBadges />

      {/* Main Product Showcase Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Section Heading with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-amber-200/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B5E20] uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-[#1B5E20]"></span>
              মায়ের হেসেল অনলাইন ক্যাটালগ
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              {activeCategory === 'all' && 'আমাদের সমস্ত তাজা পিঠা ও খাঁটি খাদ্যপণ্য'}
              {activeCategory === 'pitha' && 'ঐতিহ্যবাহী গরম পিঠা সম্ভার'}
              {activeCategory === 'ingredients' && 'পিঠার খাঁটি উপাদান ও আসল খেজুর গুড়'}
              {activeCategory === 'grocery' && 'আসন্ন অর্গানিক গ্রোসারি কালেকশন (তেল, মধু, চাল, ঘি)'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {activeCategory === 'grocery'
                ? 'ভবিষ্যতে যুক্ত হতে যাওয়া সব গ্রোসারি আইটেম এখন থেকেই দেখতে ও অর্ডার/প্রি-বুক করতে পারবেন।'
                : 'প্রতিটি পিঠা খাঁটি আতপ চালের গুঁড়া ও আসল যশোরের খেজুর গুড়ে তৈরি।'}
            </p>
          </div>

          {/* Quick Filter Counts */}
          <div className="text-xs text-stone-500 bg-white px-3 py-1.5 rounded-xl border border-stone-200 self-start md:self-auto font-medium">
            মোট <span className="font-bold text-[#1B5E20]">{filteredProducts.length}</span> টি পণ্য পাওয়া গেছে
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-6">
            <p className="text-stone-500 text-sm">এই ক্যাটাগরিতে এখনো কোনো পণ্য যুক্ত হয়নি।</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-3 bg-[#1B5E20] text-white text-xs font-bold px-4 py-2 rounded-full"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onDirectOrder={handleDirectOrder}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Future Grocery Highlights Banner (If viewing Pitha) */}
        {activeCategory !== 'grocery' && (
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-stone-900 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-[11px] font-extrabold uppercase tracking-widest bg-amber-400 text-stone-950 px-2.5 py-1 rounded-md mb-2 inline-block">
                আসন্ন পরিকল্পনা 🌿
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                পিঠার পাশাপাশি শীঘ্রই আসছে সম্পূর্ণ অর্গানিক গ্রোসারি সম্ভার!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
                গাছপাকা সরিষার কাঠের ঘানি তেল, সুন্দরবনের প্রাকৃতিক বুনো মধু, পাবনার খাঁটি গাওয়া ঘি ও দিনাজপুরের সুবাসিত কাটারিভোগ চাল—সবই পাবেন এক ক্লিকে।
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button
                  onClick={() => setActiveCategory('grocery')}
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-colors"
                >
                  গ্রোসারি আইটেমগুলো এখনই দেখুন
                </button>
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  + নতুন গ্রোসারি পণ্য যোগ করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Customer Reviews & FAQs */}
      <CustomerReviews />

      {/* Footer */}
      <Footer
        onOpenPixelModal={() => setIsPixelModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Floating Bottom Quick Actions on Mobile */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 flex gap-2">
        <a
          href="tel:01711002233"
          className="flex-1 bg-stone-900 text-white py-2.5 px-3 rounded-2xl text-xs font-bold shadow-xl flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>হটলাইনে কল</span>
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 bg-[#1B5E20] text-white py-2.5 px-3 rounded-2xl text-xs font-bold shadow-xl flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>কার্ট ({totalCartCount})</span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={handleProceedCheckoutFromCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, opt, qty) => handleAddToCart(p, opt, qty)}
        onDirectOrder={(p, opt) => handleDirectOrder(p, opt)}
      />

      {/* Facebook Pixel & Ads Guide Modal (Direct answer to user prompt!) */}
      <FacebookPixelModal
        isOpen={isPixelModalOpen}
        onClose={() => setIsPixelModalOpen(false)}
      />

      {/* Admin / Grocery Add Modal */}
      <AdminProductModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onAddProduct={handleAddNewProduct}
        products={products}
      />
    </div>
  );
}
