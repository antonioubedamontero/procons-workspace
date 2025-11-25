# Changelog

All notable changes to this project will be documented in this file.  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [0.2.1] - 2025-11-25

### Fixed

- Fixed error "Error: NG0908: In this configuration Angular requires Zone.js", installing zone.js and adding zone.js and
  zone.js/testing to polyfills in angular.json.
- Basic procons-list-item test to prove fix works.

### Changed

- Changed README.md to add scripts and more details.

### Added

- Added new scrip for testing.

## [0.2.0] - 2025-11-20

### Added

- Created Procons list item component and interface.
- Expose component and interface in public-api.
- Added uuid library.

### Changed

- README.md information.

### Removed

- Library procons example application.

## [0.1.0] - 2025-11-20

### Added

- Created workspace and library.
- Created demo application to test library components.
- Install Angular Material and add to library peer dependencies.
- Added scripts to build library and with watch.
- Added component example from demo app library.
