'use client'

import { useEffect, useState, useMemo } from 'react'
import MiniSearch from 'minisearch'
import { createRoot } from 'react-dom/client'

export const Search = ({
  placeholder = 'Search customers…',
  className,
}: {
  placeholder?: string
  className?: string
}) => {
  // Placeholder, add’l code will be added here
  const fields = ['name', 'text']
const search = useMemo(
  () =>
    new MiniSearch({
      fields,
      storeFields: [...fields, 'score', 'slug'],
    }),
  fields // eslint-disable-line react-hooks/exhaustive-deps
)

useEffect(() => {
  fetch('/documents.json')
    .then((response) => response.json())
    .then((data) => {
      if (search.documentCount > 0) {
        return
      }

      search.addAll(data)
    })
}, [search])

const [searchResultNode, setSearchResultNode] = useState<
  HTMLElement | undefined
>(undefined)

useEffect(() => {
  setSearchResultNode(document.getElementById('search-results')!)
}, [])

const [hideSearchResults, setHideSearchResults] = useState(true)
useEffect(() => {
  document.body.addEventListener('click', () => {
    setHideSearchResults(true)
  })
}, [])

const searchDocuments = (query: string) => {
    if (!searchResultNode) {
      return
    }
  
    if (query.length < 3) {
      setHideSearchResults(true)
      return
    }
  
    const results = search
      .search(query)
      ?.slice(0, 5) // show a max of 5 search results
  
    if (results.length < 1) {
      setHideSearchResults(true)
      return
    }
  
    setHideSearchResults(false)
    const node = document.createElement('div')
    const root = createRoot(node)
  
    root.render(
      <>
        {results.map((result) => {
          if (!result) {
            return
          }
  
          return <p key={result.id}><a href={`/${result.slug}`}>{result.title}</a></p>
        })}
      </>
    )
  
    searchResultNode.replaceChildren(node)
  }
  

  return (<div className={className ?? ''}>
  <div className="flex flex-col">
    <div className="relative">
      <input
        type="search"
        id="default-search"
        className="block w-full pl-5 py-[3px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        autoComplete="off"
        onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
          searchDocuments(event.target.value)
        }
      />
    </div>
    <div className="z-10 relative">
      <div
        id="search-results"
        className={`${
          hideSearchResults ? 'hidden' : ''
        } max-h-[80vh] overflow-auto w-full absolute top-0 left-0 flex flex-col py-2 px-2 rounded-lg border bg-gray-100 dark:text-white dark:bg-gray-900 dark:border-gray-400`}
      ></div>
    </div>
  </div>
</div>
)
}
