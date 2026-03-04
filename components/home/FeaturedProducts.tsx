"use client"

import { products } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';
import { motion } from 'framer-motion';

export default function FeaturedProducts() {
  const featured = products; // Could filter by 'is_bestseller' if list gets larger

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              Our Bestsellers
            </h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 font-body max-w-2xl mx-auto text-lg">
              Handpicked by our chef, loved by thousands of kitchens across India.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.slice(0, 4).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
