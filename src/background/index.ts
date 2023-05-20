export const API_KEY = 'AIzaSyDfqETdEiPisixeBTBhrkryVdTXjFfkbr4'

console.info('chrome-ext template-react-ts background script')

//run function when time of video changes
//listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('got message')
  // In the Service Worker
  if (request.event === 'videoStarted') {
    const videoId = request.videoId
    // The YouTube video has started playing
    console.log('YouTube video started')
    console.log('Video ID:', videoId)
    // Perform any desired actions here
  }
  if (request.event === 'videoTime') {
    console.log(`TIME: ${request.time}`)
  }
})

//fetch youtube comments for video with given id
async function fetchComments(videoId: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`,
  )
  const data = await response.json()
  console.log(data)
}

export {}
