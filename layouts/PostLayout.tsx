import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'

import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <>
      <ScrollTopAndComment />
      <article>

        {/* Header */}
        <header className="pb-8 pt-12">
          <div className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
            </time>
          </div>
          <PageTitle>{title}</PageTitle>
        </header>

        <div className="border-t border-gray-200 dark:border-gray-800" />

        {/* Body */}
        <div className="prose dark:prose-invert max-w-none py-10">
          {children}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800" />

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 py-6">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}

        {/* Prev / Next */}
        {(next || prev) && (
          <>
            <div className="border-t border-gray-200 dark:border-gray-800" />
            <div className="flex justify-between py-8 text-sm font-medium">
              {prev && prev.path ? (
                <Link
                  href={`/${prev.path}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  ← {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next && next.path ? (
                <Link
                  href={`/${next.path}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {next.title} →
                </Link>
              ) : (
                <span />
              )}
            </div>
          </>
        )}

        <div className="border-t border-gray-200 dark:border-gray-800" />

        {/* Back */}
        <div className="py-6">
          <Link
            href={`/${basePath}`}
            className="text-sm text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
          >
            ← Back to essays
          </Link>
        </div>

        {siteMetadata.comments && (
          <div className="border-t border-gray-200 pt-6 pb-10 dark:border-gray-800" id="comment">
            <Comments slug={slug} />
          </div>
        )}

      </article>
    </>
  )
}
