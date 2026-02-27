import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent, CoreContent } from 'pliny/utils/contentlayer'
import { allNotes } from 'contentlayer/generated'
import type { Note, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug)
  const note = allNotes.find((p) => p.slug === slug)
  if (!note) return
  return {
    title: note.title,
    description: note.summary,
    openGraph: {
      title: note.title,
      description: note.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: './',
    },
    twitter: {
      card: 'summary',
      title: note.title,
      description: note.summary,
    },
  }
}

export const generateStaticParams = async () => {
  return allNotes.map((p) => ({ slug: decodeURI(p.slug) }))
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug)
  const sortedNotes = allCoreContent(sortPosts(allNotes))
  const noteIndex = sortedNotes.findIndex((p) => p.slug === slug)
  if (noteIndex === -1) return notFound()

  const prev = sortedNotes[noteIndex + 1]
  const next = sortedNotes[noteIndex - 1]
  const note = allNotes.find((p) => p.slug === slug) as Note
  const mainContent = coreContent(note)

  return (
    <PostSimple content={mainContent as unknown as CoreContent<Blog>} next={next} prev={prev}>
      <MDXLayoutRenderer code={note.body.code} components={components} toc={note.toc} />
    </PostSimple>
  )
}
