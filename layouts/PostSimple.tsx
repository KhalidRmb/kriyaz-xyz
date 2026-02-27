import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostSimple({ content, next, prev, children }: LayoutProps) {
  const { path, date, title } = content

  return (
    <>
      <ScrollTopAndComment />
      <article>

        {/* Header */}
        <header className="pb-8 pt-12">
          <div className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
          </div>
          <PageTitle>{title}</PageTitle>
        </header>

        <div className="border-t border-gray-200 dark:border-gray-800" />

        {/* Body */}
        <div className="prose dark:prose-invert max-w-none py-10">
          {children}
        </div>

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
            href="/notes"
            className="text-sm text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
          >
            ← Back to notes
          </Link>
        </div>

      </article>
    </>
  )
}
