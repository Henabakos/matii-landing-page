import Image from 'next/image'
import Link from 'next/link'

import type { BlogPost } from '@/data/blogPosts'

type BlogHeroSectionProps = {
  mainHeroPost: BlogPost
  sideFeaturedPosts: BlogPost[]
}

export function BlogHeroSection({
  mainHeroPost,
  sideFeaturedPosts,
}: BlogHeroSectionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-zinc-200/80">
      <div className="lg:col-span-7 flex flex-col justify-between group">
        <Link href={`/blog/${mainHeroPost.slug}`} className="block space-y-5">
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-md">
            <Image
              src={mainHeroPost.image}
              alt={mainHeroPost.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          <div className="space-y-2">
            <span className="font-space font-semibold text-xs text-zinc-500 uppercase tracking-widest block">
              {mainHeroPost.category}
            </span>
            <h2 className="font-space font-bold text-2xl sm:text-3xl md:text-[32px] leading-tight text-zinc-950 group-hover:text-zinc-700 transition-colors">
              {mainHeroPost.title}
            </h2>
            <p className="font-inter text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
              {mainHeroPost.excerpt}
            </p>
            <p className="font-inter text-xs text-zinc-400 pt-1">{mainHeroPost.date}</p>
          </div>
        </Link>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
        {sideFeaturedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex gap-4 sm:gap-5 items-start p-3 sm:p-4 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200/80 transition-all"
          >
            <div className="relative w-28 sm:w-36 md:w-40 aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200/80">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="200px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center space-y-1.5 flex-1 min-w-0">
              <span className="font-space font-semibold text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider truncate block">
                {post.category}
              </span>
              <h3 className="font-space font-bold text-sm sm:text-base md:text-lg text-zinc-950 leading-snug group-hover:text-zinc-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 font-inter text-xs text-zinc-400 pt-1">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
