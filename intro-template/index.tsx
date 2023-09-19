'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useEffect, useState } from 'react'

import cover from './cover.png'

export default memo(function IntroTemplate() {
  const [studioURL, setStudioURL] = useState<string | null>(null)
  const [isLocalHost, setIsLocalhost] = useState(false)
  const pathname = usePathname()

  const hasEnvFile = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const hasRepoEnvVars =
    process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER &&
    process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER &&
    process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG
  const repoURL = `https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}`
  const removeBlockURL = hasRepoEnvVars
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}/blob/main/README.md#how-can-i-remove-the-next-steps-block-from-my-app`
    : `https://github.com/sanity-io/template-nextjs-clean#how-can-i-remove-the-next-steps-block-from-my-app`

  const [hasUTMtags, setHasUTMtags] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStudioURL(`${window.location.origin}/studio`)
      setIsLocalhost(window.location.hostname === 'localhost')
      setHasUTMtags(window.location.search.includes('utm'))
    }
  }, [])

  // Only display this on the home page
  if (pathname !== '/') {
    return null
  }

  if (hasUTMtags || !studioURL) {
    return null
  }

  return (
    <div className="flex justify-center border-t border-gray-100 bg-gray-50/50">
    </div>
  )
})

function Box({
  circleTitle,
  element,
}: {
  circleTitle: string
  element: JSX.Element
}) {
  return (
    <li className="mt-2 grid grid-flow-col grid-rows-1 place-content-start gap-3">
      <div className="row-span-3 select-none">
        <div className="relative flex h-5 w-5 select-none items-center justify-center rounded-full bg-gray-200 p-3 text-center">
          {circleTitle}
        </div>
      </div>
      {element}
    </li>
  )
}

function BlueLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      className="text-blue-500 underline hover:text-blue-800"
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  )
}

const RemoveBlock = ({ url }: { url: string }) => (
  <a
    className="hover:text-blue-800"
    href={url}
    target="_blank"
    rel="noreferrer"
  >
    How to remove this block?
  </a>
)

function getGitProvider() {
  switch (process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER) {
    case 'gitlab':
      return 'GitLab'
    case 'bitbucket':
      return 'Bitbucket'
    default:
      return 'GitHub'
  }
}
