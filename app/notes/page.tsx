import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allNotes } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({ title: 'Notes' })

export default async function NotesPage() {
  const notes = allCoreContent(sortPosts(allNotes))

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 dark:text-gray-100">
          Notes
        </h1>
        <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
          Short takes, links, and things I&apos;m thinking about.
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!notes.length && (
          <li className="py-10 text-gray-500 dark:text-gray-400">No notes yet. Coming soon.</li>
        )}
        {notes.map((note) => {
          const { slug, date, title, summary } = note
          return (
            <li key={slug} className="py-7">
              <article className="space-y-1">
                <div className="flex items-baseline gap-4">
                  <time
                    className="shrink-0 text-sm text-gray-500 dark:text-gray-400"
                    dateTime={date}
                  >
                    {formatDate(date, siteMetadata.locale)}
                  </time>
                  <h2 className="text-lg font-semibold tracking-tight">
                    <Link
                      href={`/notes/${slug}`}
                      className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900 dark:text-gray-100"
                    >
                      {title}
                    </Link>
                  </h2>
                </div>
                {summary && (
                  <p className="pl-0 text-sm leading-6 text-gray-500 sm:pl-28 dark:text-gray-400">
                    {summary}
                  </p>
                )}
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
