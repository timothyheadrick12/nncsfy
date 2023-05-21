import ReactDOM from 'react-dom/client'
import React from 'react'
import CommentContainer from './CommentContainer'

let video: HTMLVideoElement | null = null
let title: HTMLElement | null = document.querySelector('title')
let videoId: string | null = null
const nncsfyCommentContainer = document.createElement('div')
nncsfyCommentContainer.id = 'nnscfy-comment-container'

function getVideoId() {
  // Get the video ID from the URL
  const videoUrl = window.location.href
  const videoIdMatch = videoUrl.match(/v=([a-zA-Z0-9_-]+)/)
  let videoId = videoIdMatch ? videoIdMatch[1] : null

  return videoId
}

function handleUrlChange() {
  // Retrieve the new videoId
  const newVideoId = getVideoId()
  if (videoId !== newVideoId && newVideoId) {
    videoId = newVideoId
    console.log(`Video ID: ${videoId}`)
    chrome.runtime.sendMessage({ event: 'videoStarted', videoId: videoId })
    if (!video) {
      video = document.querySelector('video')
      if (video) {
        video.addEventListener('timeupdate', (event) => {
          console.log(`TIME: ${video?.currentTime}`)
        })
        let videoHasCommentContainer = false
        video.childNodes.forEach((node) => {
          if (node.isEqualNode(nncsfyCommentContainer)) {
            videoHasCommentContainer = true
            return
          }
        })
        if (!videoHasCommentContainer) {
          video?.appendChild(nncsfyCommentContainer)
          ReactDOM.createRoot(
            document.getElementById('nnscfy-comment-container') as HTMLElement,
          ).render(
            <React.StrictMode>
              <CommentContainer />
            </React.StrictMode>,
          )
        }
      }
    }
  }
  // Call your desired function or send the new URL to the Service Worker
}

const observer = new MutationObserver(() => {
  handleUrlChange()
})

if (title) {
  observer.observe(title, { childList: true })
}

export {}
