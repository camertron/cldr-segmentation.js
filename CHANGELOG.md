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
