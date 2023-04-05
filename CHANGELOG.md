# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [pre-release] - 2023-04-26

### Added

- None.

### Changed

- Enhanced code quality by implementing modularity and refactoring existing code.
- Optimized code structure for better maintainability.
- Transitioned the software license from GPLv3 to AGPLv3.

### Removed

- None.

## [pre-release] - 2023-04-04

### Added

- Added `simple-git-hooks`, `lint-staged`, and updated Github workflows configuration to enhance the development process.

### Changed

- Updated package information to provide more details and improve project documentation.

### Removed

- None.

## [pre-release] - 2023-03-14

### Added

- Implemented automatic dependency splitting to reduce the size of the production build and improve the application's load speed.

### Changed

- Improved the UI to enhance the visual appearance of the application.
- Replaced the `react-material-symbols` library with `material-symbols` to significantly reduce the bundle size.

### Removed

- Removed an unnecessary font bundle to further reduce the size of the production build.

## [pre-release] - 2023-03-11

### Added

- Partial support for Progressive Web Apps (PWA) to enable device-level integrations.

### Changed

- Improved the font style of some elements to enhance visual appearance.
- Improved UI/UX for mobile devices and touch screens to provide a more user-friendly experience.
- Improved CI/CD workflows to ensure a better user experience.
- Rearranged playlist interaction logic to enhance overall performance.
- Updated project dependencies to the latest versions.

### Removed

- None.

## [pre-release] - 2023-03-08

### Added

- Implemented data fetching when a user joins a room, allowing them to get the current room status upon joining.
- Added automatic media title fetching for items in the playlist, when possible, to provide a more informative playlist.
- Enabled drag-and-drop functionality for rearranging items in the playlist, making it easier to customize the playlist order.
- Added additional test cases for the program to improve code quality and reduce errors.
- Added CI/CD workflows using GitHub Actions to streamline the development process and ensure consistent releases.
- Added a `CONTRIBUTING.md` file to provide guidelines for potential contributors.

### Changed

- Fixed a bug that caused state changes to occur before the media player was ready, improving overall stability.
- Improved font sizes for better visibility and ease of use.
- Enhanced the playlist UI for a more organized look and improved user experience.
- Improved YouTube link matching to accommodate more types of YouTube links.
- Enhanced the accessibility of buttons and other UI elements, improving usability for all users.
- Improved UI and accessibility on mobile devices, making the app more accessible on the go.
- Updated `README.md` for better descriptions and overall clarity.

### Removed

- Console output has been removed for production to improve performance and user experience.

## [pre-release] - 2023-03-01

### Added

- Added new functions to enhance the app's capabilities.
- Media player controls can now sync across all peers for a better user experience.
- Added an app icon for better brand recognition.
- Added new icons to improve the overall appearance of the app.
- Added loading animation when connecting to remote peers.
- Remote peer number counter added to provide better visibility.
- Added file upload via drag and drop or click to upload.
- Users can now add media to the playlist via a valid link.
- Users can now remove unwanted media link from the playlist.

### Changed

- Significantly revised the code structure and layout to improve readability and maintainability.
- Changed the peer connect logic to a full mesh network for better connection reliability and speed.
- Clear the share link information after connection setup to improve user privacy.
- Updated the media player to `Plyr` for improved functionality.
- Updated the user interface with new design elements and improved usability features.
- Improve keyboard navigation for better accessibility.
- Fixed a bug with the playlist's responsive layout.

### Removed

- Multi-tab selection feature removed for a more minimalist design and simplified code.

## [pre-release] - 2023-01-25

### Added

- Added `Vitest` with `Testing Library` to provide automated testing capabilities for the project.
- Configured the project to use `Vite` and `TypeScript` for development.

### Changed

- Rewrote the configuration for `Prettier` and `ESLint`.
- Most of the code has been converted to use `TypeScript` instead of `JavaScript`.

### Removed

- Removed the `webpack` and `Babel` configuration, as they are no longer needed with the new development setup.

## [pre-release] - 2023-01-17

### Added

- Added a new function that enables users to share the connection link with others using a URL or QR code.
- Peer-to-peer connections can now be established using the shared link, and all shared information can only be retrieved locally, ensuring maximum user privacy.
- Basic HTML video support has been added, providing users with an improved video playback experience.

### Changed

- The UI has been revamped, resulting in a cleaner, more intuitive user interface that is more visually appealing.
- Several minor changes and UI improvements have been made, further enhancing the user experience.

### Removed

- None.

## [pre-release] - 2023-01-01

### Added

- Project introduction in `README.md`.
- `.gitignore` file to ignore unnecessary files and directories from version control.
- `CHANGELOG.md` file to track changes to the project.
- License information and release under the GPLv3.
- Configuration for `Prettier` and `ESLint` to enforce code style and formatting.
- Configuration for `React`, `webpack`, and `Babel` to build the program.
- Minimalist UI/UX design with a Media and Menu layout.
- Multi-tab selections in the Menu for easy navigation.
- Media casting functionality to allow friends to watch videos together.

### Changed

- None.

### Removed

- None.
