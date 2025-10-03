import { Linkding } from "linkding-api"
import fs from "fs"
import mime from "mime"
import path from "path"

const serverUrl = "http://linkding.dale"
const adminToken = "<token>"
let linkding = new Linkding(serverUrl, adminToken)

/////////////////////
// Bundle
/////////////////////

// Bundle
let bundleInstance = linkding.getBundleInstance();

// Get single bundle
let bundle = await bundleInstance.getBundle(257)
console.log(bundle)

// Get all bundles
let bundles = await bundleInstance.getBundles()
console.log(bundles)

// Get bundles with options
let bundleOptions = {
    limit: 3, // Limits the max. number of results. Default is 100.
    // offset, // Index from which to start returning results
}
let bundlesWithOptions = await bundleInstance.getBundles(bundleOptions)
console.log(bundlesWithOptions)

// Create bundle
let bundleDataCreate = {
    "name": `Exten ${Math.random()}`,
    "search": "search terms",
    "any_tags": "tag1 tag2",
    "all_tags": "required-tag",
    "excluded_tags": "excluded-tag",
    "order": 7
}
let createBundle = await bundleInstance.createBundle(bundleDataCreate)
console.log(createBundle)

// Update bundle with full options
let bundleDataUpdateWithFullOptions = {
    "name": `Exten ${Math.random()}`,
    "search": "search terms",
    "any_tags": "tag1 tag2",
    "all_tags": "required-tag",
    "excluded_tags": "excluded-tag",
    "order": 5
}
let updateBundleWithFullOptions = await bundleInstance.updateBundle(260, bundleDataUpdateWithFullOptions)
console.log(updateBundleWithFullOptions)

// Update bundle with less options
let bundleDataWithPartialOptions = {
    "name": `Exten ${Math.random()}`,
    "search": "search terms",
    "order": 7
}
let updateBundleWithPartialOptions = await bundleInstance.updateBundle(260, bundleDataWithPartialOptions)
console.log(updateBundleWithPartialOptions)

// Delete bundle
let deleteBundle = await bundleInstance.deleteBundle(260)
console.log(deleteBundle)


/////////////////////
// Tag
/////////////////////

// Get Tag Instance
let tagInstance = linkding.getTagInstance()

// Get single tag
let tag = await tagInstance.getTag(1)
console.log(tag)

// Get tags
let tags = await tagInstance.getTags()
console.log(tags)

// Create tag
let tagData = {
    name: `Tag ${Math.random()}`
}
let createTag = await tagInstance.createTag(tagData)
console.log(createTag)


/////////////////////
// User
/////////////////////

// Get user instance
let userInstance = linkding.getUserInstance()

// Get user profile
let user = await userInstance.getUser()
console.log(user)


/////////////////////
// Bookmark
/////////////////////

// Get bookmark instance
let bookmarkInstance = linkding.getBookmarkInstance()

// Get bookmark
let bookmark = await bookmarkInstance.getBookmark(182)
console.log(bookmark)

// Get all bookmarks
let bookmarks = await bookmarkInstance.getBookmarks()
console.log(bookmarks)

// Get bundles with options
let bookmarkOptions = {
    // q, // Filters results using a search phrase using the same logic as through the UI
    limit: 3, // Limits the max. number of results. Default is 100.
    // offset, // Index from which to start returning results
    // modified_since, // Filter results to only include bookmarks modified after the specified date (format: ISO 8601, e.g. “2025-01-01T00:00:00Z”)
    // added_since, // Filter results to only include bookmarks added after the specified date (format: ISO 8601, e.g. “2025-05-29T00:00:00Z”)
    // bundle, // Filter results by bundle id to only include bookmarks matched by a given bundle
}
let bookmarksWithOptions = await bookmarkInstance.getBookmarks(bookmarkOptions)
console.log(bookmarksWithOptions)

// Create bookmark
let bookmarkDataCreate = {
  "url": "https://example.com",
  "title": `Example title ${Math.random()}`,
  "description": `Example description ${Math.random()}`,
  "notes": "Example notes",
  "is_archived": false,
  "unread": false,
  "shared": false,
  "tag_names": [
    "tag1",
    "tag2"
  ]
}
let bookmarkCreate = await bookmarkInstance.createBookmark(bookmarkDataCreate)
console.log(bookmarkCreate)

// Update bookmark with full options
let bookmarkDataUpdateWithFullOptions = {
  "url": "https://example.com",
  "title": `Example title ${Math.random()}`,
  "description": `Example description ${Math.random()}`,
  "notes": `Example notes ${Math.random()}`,
  "is_archived": false,
  "unread": false,
  "shared": false,
  "tag_names": [
    "tag1",
    "tag2",
    "tag3"
  ]
}
let bookmarkUpdateWithFullOptions = await bookmarkInstance.updateBookmark(182, bookmarkDataUpdateWithFullOptions)
console.log(bookmarkUpdateWithFullOptions)

// Update bookmark with partial options
let bookmarkDataUpdateWithPartialOptions = {
  "url": "https://example.com",
  "title": `Example title ${Math.random()}`,
  "description": `Example description ${Math.random()}`,
  "notes": `Example notes ${Math.random()}`
}
let bookmarkUpdateWithPartialOptions = await bookmarkInstance.updateBookmark(182, bookmarkDataUpdateWithPartialOptions)
console.log(bookmarkUpdateWithPartialOptions)

// Get archived bookmarks
let bookmarksArchived = await bookmarkInstance.getArchivedBookmarks()
console.log(bookmarksArchived)

// Archive bookmark
let bookmarkArchive = await bookmarkInstance.archiveBookmark(182)
console.log(bookmarkArchive)

// Unarchive bookmark
let bookmarkUnarchive = await bookmarkInstance.unarchiveBookmark(182)
console.log(bookmarkUnarchive)

// Check bookmark
let bookmarkDataCheck = {
    url: "https://example.com"
}
let bookmarkCheck = await bookmarkInstance.checkBookmark(bookmarkDataCheck)
console.log(bookmarkCheck)

// Delete bookmark
let bookmarkDelete = await bookmarkInstance.deleteBookmark(182)
console.log(bookmarkDelete)

/////////////////////
// Bookmark Assets
/////////////////////

// Get bookmark asset instance
let bookmarkAssetInstance = linkding.getBookmarkAssetsInstance()

// Get bookmark asset
let bookmarkAsset = await bookmarkAssetInstance.getBookmarkAsset(183, 2)
console.log(bookmarkAsset)

// Get bookmark assets
let bookmarkAssets = await bookmarkAssetInstance.getBookmarkAssets(183)
console.log(bookmarkAssets)

// Upload bookmark asset 
let formData = new FormData();
const filePath = "/home/<user>/Pictures/Screenshot_2018-08-11-05-45-23.png"
const mimeType = mime.getType(filePath)
const fileName = path.parse(filePath).base;

// using readFileSync (blocking sync)
const file = new Blob([fs.readFileSync(filePath)], { type: mimeType });
formData.append("file", file, fileName);
let bookmarkAssetUploadUsingReafFileSync = await bookmarkAssetInstance.uploadBookmarkAsset(183, formData)
console.log(bookmarkAssetUploadUsingReafFileSync)

// Upload bookmark asset using fs.createReadStream
const readableStream = fs.createReadStream(filePath);
const fileChunks = [];
readableStream.on('error', function (error) {
    console.log(`error: ${error.message}`);
})
readableStream.on('data', async (chunk) => {
    fileChunks.push(chunk)
})
readableStream.on('end', async () => {
    const file = new Blob(fileChunks, { type: mimeType });
    formData.append("file", file, fileName);
    let bookmarkAssetUploadUsingCreateReadStream = await bookmarkAssetInstance.uploadBookmarkAsset(183, formData)
    console.log(bookmarkAssetUploadUsingCreateReadStream)
})

// Download bookmark asset
let bookmarkAssetDownload = await bookmarkAssetInstance.downloadBookmarkAsset(183, 11)
bookmarkAssetDownload.data.pipe(fs.createWriteStream("./Screenshot_2018-08-11-05-45-23.png"));

// Delete bookmark asset
let bookmarkAssetDelete = await bookmarkAssetInstance.deleteBookmarkAsset(183, 1)
console.log(bookmarkAssetDelete)

