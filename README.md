# Cryptanalysis App

Web application supporting the cryptanalysis process.
The application allows you to:

1. Create a hash from a string of characters provided by the user.
   Firstly user enter a password, then choose cryptographic method: md4, md5, sha1, sha2.
   The user receives the result in the form of a hash created from the given password using the previously selected hashing method.

2. Break the password by entering a hash by the user
   Password cracking is based on the operation of the publicly available password recovery utility - hashcat.
   The user has a choice of 3 attack methods (Straight, Brute-force, Combination), then enters the hash mode id (the list is available on the hashcat website).
   The result of password cracking has a 5 minute time limit.

## Features

- Password hashing
- Password cracking

## Setup

open project in the windows `cmd` console, or in any code editor ex `VS Code`.
You need to install node.js v16.18.0 [see how to install node with specific version on windows](https://www.freecodecamp.org/news/nvm-for-windows-how-to-download-and-install-node-version-manager-in-windows-10/)

In the root folder of project run `npm i` to install all necessary dependencies.
You also need to install [hashcat](https://hashcat.net/hashcat/) with version `2.6.2` in the root folder of project or unzip hashcat zip file there.
Later run `npm run dev` in `cmd` console to run project locally (For proper working it needs to be the `cmd`). Application will run on [http://localhost:3333
](http://localhost:3333)
