## 2.2.0
* Add Turkish suppressions (#17, @ozdemirburak)

## 2.1.3
* Fix issue causing `window.UtfString` to be assigned to `utfstring`  even if `utfstring` wasn't `null`.

## 2.1.2
* Fix browser functionality.
  - Needed to pull `UtfString` off `window` since `require('utfstring')` is lowercased and therefore doesn't work in the browser.

## 2.1.1
* Write state tables out as JSON strings instead of raw arrays.
  - Fixes a bug that causes Node to crash with "FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory."
* Add documentation around importing (`require` vs `import`).

## 2.1.0
* Add ability to copy and merge suppression objects.
  - Enables adding custom suppression strings.
* Add custom English suppression for "Dr.".

## 2.0.3
* Somehow the require of 'utfstring' was changed to 'UtfString', which worked on Mac OS's case-insensitive filesystem but errored in Linux environments.

## 2.0.2
* Ensure suppressions are preceded by a space, i.e. are whole words.
  - Fixes bug where "Phillip. Is my name." would contain no breaks because 'pp.' is an English suppression.

## 2.0.1
* Fix dependency issue causing problems installing via npm.

## 2.0.0
* Massive performance improvements.
  - Switched from regex-based approach to state machine engine borrowed from ICU4J.
  - 190 i/s -> \~97,000 i/s for a simple 10-word sentence.
* Added ability to swap in custom suppressions.

## 1.0.0
* Birthday!
