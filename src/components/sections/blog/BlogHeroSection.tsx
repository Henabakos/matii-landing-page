import Image from 'next/image'
import { Link } from '@/i18n/routing'

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
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-12">
      <div className="lg:col-span-7 flex flex-col justify-between group">
        <Link href={`/blog/${mainHeroPost.slug}`} className="block space-y-5">
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 shadow-md transition-colors group-hover:border-[#98ff03]">
            <Image
              src={mainHeroPost.image}
              alt={mainHeroPost.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
              className="object-cover object-center"
            />
          </div>

          <div className="space-y-2">
            <span className="font-space font-semibold text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block">
              {mainHeroPost.category}
            </span>
            <h2 className="font-space font-bold text-2xl sm:text-3xl md:text-[32px] leading-tight text-zinc-950 dark:text-white transition-colors group-hover:text-zinc-700 dark:group-hover:text-[#98ff03]">
              {mainHeroPost.title}
            </h2>
            <p className="font-inter text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
              {mainHeroPost.excerpt}
            </p>
            <p className="font-inter text-xs text-zinc-400 dark:text-zinc-500 pt-1">{mainHeroPost.date}</p>
          </div>
        </Link>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-6">
        {sideFeaturedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex gap-4 sm:gap-5 items-start p-3 sm:p-4 border border-transparent hover:border-[#98ff03] transition-colors"
          >
            <div className="relative w-28 sm:w-36 md:w-40 aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-white/5 shrink-0 border border-zinc-200/80 dark:border-white/10 transition-colors group-hover:border-[#98ff03]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="200px"
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-col justify-center space-y-1.5 flex-1 min-w-0">
              <span className="font-space font-semibold text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider truncate block">
                {post.category}
              </span>
              <h3 className="font-space font-bold text-sm sm:text-base md:text-lg text-zinc-950 dark:text-white leading-snug transition-colors line-clamp-2 group-hover:text-zinc-600 dark:group-hover:text-[#98ff03]">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 font-inter text-xs text-zinc-400 dark:text-zinc-500 pt-1">
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
