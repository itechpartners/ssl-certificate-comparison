'use client'

import React, { useState } from 'react'
import { Calendar, User } from 'lucide-react'

const blogPosts = [
  {
    title: 'SSL Certificate Basics: Everything You Need to Know',
    excerpt: 'Learn the fundamentals of SSL certificates and why your website needs one.',
    author: 'John Doe',
    date: '2026-04-15',
    category: 'Tutorial',
    readTime: 8,
  },
  {
    title: 'DV vs OV vs EV: Choosing the Right SSL Certificate Type',
    excerpt: 'Compare different SSL validation types to find the best fit for your needs.',
    author: 'Jane Smith',
    date: '2026-04-10',
    category: 'Guide',
    readTime: 6,
  },
  {
    title: 'Wildcard SSL Certificates: A Complete Guide',
    excerpt: 'Everything you need to know about wildcard SSL certificates.',
    author: 'Mike Johnson',
    date: '2026-04-05',
    category: 'Guide',
    readTime: 7,
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">SSL Certificate Blog</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogPosts.map((post, idx) => (
            <article key={idx} className="rounded-lg border border-gray-200 bg-white p-6">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 mb-3">
                {post.category}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={16} /> {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> {post.date}
                </div>
                <div>{post.readTime} min read</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
