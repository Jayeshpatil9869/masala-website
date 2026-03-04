"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client for public reads
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CategoryGrid() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('id, name, slug, image_url').order('name');
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <section className="py-20 bg-brand-cream relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-red mb-4">
              Explore Our Masala Range
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full"></div>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg cursor-pointer"
            >
              <Link href={`/products?category=${cat.slug}`}>
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={cat.image_url || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'} 
                    alt={cat.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Subtle gradient overlay to ensure text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                  <h3 className="font-sans font-bold text-2xl text-white mb-2 transform transition-transform duration-300 group-hover:-translate-y-2">
                    {cat.name}
                  </h3>
                  
                  {/* Hidden by default, slides up on hover */}
                  <div className="overflow-hidden h-0 opacity-0 transition-all duration-300 group-hover:h-8 group-hover:opacity-100 flex items-center text-brand-gold font-medium">
                    Shop Now <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
