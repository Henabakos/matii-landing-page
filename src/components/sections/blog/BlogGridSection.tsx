import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { BlogPost } from '@/data/blogPosts'

type BlogGridSectionProps = {
  posts: BlogPost[]
  isFiltered: boolean
}

export function BlogGridSection({ posts, isFiltered }: BlogGridSectionProps) {
  return (
    <section className="space-y-6 pt-4">
      {isFiltered ? (
        <h2 className="font-space font-bold text-xl text-zinc-900">
          Filtered Articles ({posts.length})
        </h2>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col justify-between space-y-4 p-4 bg-white border border-zinc-200/80 hover:border-[#98ff03] transition-colors duration-300"
          >
            <div className="space-y-4">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100 border border-zinc-100 transition-colors group-hover:border-[#98ff03]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="space-y-2">
                <span className="font-space font-semibold text-[11px] text-zinc-500 uppercase tracking-wider block">
                  {post.category}
                </span>
                <h3 className="font-space font-bold text-lg text-zinc-950 transition-colors leading-snug group-hover:text-zinc-700">
                  {post.title}
                </h3>
                {post.excerpt ? (
                  <p className="font-inter text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-inter text-zinc-400">
              <div className="flex items-center gap-2">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <ArrowUpRight className="size-4 text-zinc-400 group-hover:text-[#98ff03] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
