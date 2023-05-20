let video = document.querySelector('video')
let title = document.querySelector('title')
let videoId = getVideoId()

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
  console.log(newVideoId)
  if (videoId !== newVideoId && newVideoId) {
    videoId = newVideoId
    console.log(`Video ID: ${videoId}`)
    chrome.runtime.sendMessage({ event: 'videoStarted', videoId: videoId })
    if (!video) {
      video = document.querySelector('video')
      video?.addEventListener('timeupdate', (event) => {
        console.log(`TIME: ${video?.currentTime}`)
      })
    }
  }
  // Call your desired function or send the new URL to the Service Worker
}

const observer = new MutationObserver(() => {
  handleUrlChange()
})

//this spans videoStarted for a bit when a page is first opened/refreshed. Could likely be improved.
if (title) observer.observe(title, { childList: true })

// Start observing changes in the DOM

export {}
