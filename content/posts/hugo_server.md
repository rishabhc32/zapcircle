---
title: "Hugo Server"
author: "RC"
date: 2018-05-29T12:04:59+05:30
draft: true
---

### Generating hugo man pages
`hugo`, when installed via `snap` does not provide manpages. So, we have to generate them ourselves.

1. `cd ~`
2. `hugo gen man`
    1. This will create `./man` directory, having hugo's manpages.
3. `cd man`
4. `gzip ./*`
5. `sudo cp ./* /usr/share/man/man1/`
6. `man hugo`, `man hugo-server`, `man hugo-gen`, ...
