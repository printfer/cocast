<img src="./public/cocast.svg"/>

# CoCast - Media Casting Application

> :wave: Try CoCast now: [https://printfer.github.io/cocast/](https://printfer.github.io/cocast/)

CoCast is a free and open-source media casting application that allows you to watch your favorite videos with friends from anywhere in the world! With CoCast, you can invite your friends and watch videos together in real-time. It's the perfect way to catch up on the latest viral videos, enjoy a movie night with your long-distance friends, or simply share some laughs.

## Features

CoCast is built using React, TypeScript, WebRTC, and Vite, among other technologies. It offers the following features:

- :busts_in_silhouette: Watch your favorite videos together in real-time
- :musical_note: Customizable playlist with detailed information
- :outbox_tray: Share via link or QR code without signups or account creation
- :handshake: Peer-to-peer technology for fast and secure data sync
- :globe_with_meridians: Cross-platform support across different networks and devices
- :star2: User-friendly interface with no app installation required
- :last_quarter_moon: Supports both light and dark themes for a personalized experience
- :computer: Modern UI design for a sleek and intuitive user experience
- :rainbow: Accessibility features to ensure all users can enjoy the app.

:construction: The following features are currently under development and will be added to the app in the near future:

- :file_folder: Sharing local media file through WebTorrent.
- :iphone: PWA support for device-level integrations.

## Try it out!

You can try CoCast directly at [https://printfer.github.io/cocast/](https://printfer.github.io/cocast/), or you can build the project yourself. To build the project, you'll need to have `npm` installed on your machine. Once you have that, simply clone [this repository](https://github.com/printfer/cocast) and run the following command:

```
npm install
npm run build
npm run preview
```

This will launch the CoCast application in your default web browser. From there, you can invite your friends and start watching videos together. You can also find a production-ready build in the `dist` directory.

## Q&A

### Why doesn't the media pause when another peer is still loading the video?

This behavior is intentional. Although it may be inconvenient for the media to continue playing while other peers are still loading the video, pausing the other party's media progress when loading, especially when the loading process happens frequently, might negatively impact the user experience. Currently, there are no good solutions to solve this, so CoCast remains to provide basic functions. Suggestions for improving this feature are welcome as further improvements are necessary.

### Why doesn't CoCast have a built-in chat system?

CoCast is designed exclusively for media casting and does not include additional features such as chat. In addition, CoCast is a serverless application that relies on WebRTC for peer-to-peer communication. While WebRTC is more secure than other alternatives, it still presents certain [security and privacy concerns](https://webrtc-security.github.io/) that must be addressed. Creating a chat system within WebRTC would require additional work to ensure privacy and security are adequately addressed. Therefore, it is recommended that users utilize their favorite messaging tools instead.

## Contributing

Bug reports, feature suggestions, and code contributions are most welcome. Feel free to open an issue or pull request, and please check out the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details.

## Changlog

See the [CHANGELOG.md](CHANGELOG.md) file for more information.

## License

[![](https://www.gnu.org/graphics/agplv3-with-text-162x68.png)](https://www.gnu.org/licenses/agpl-3.0.html)

This project is licensed under the AGPLv3 License. See the [LICENSE](LICENSE) file for more information.

## Credits

CoCast and its logo have been designed and created by [Printfer](https://printfer.github.io/) with :heart:

Copyright © 2023 [Printfer](https://github.com/printfer)
