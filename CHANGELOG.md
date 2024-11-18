

# [0.4.0](https://github.com/vinchaudinc/r.care/compare/0.3.0...0.4.0) (2024-11-18)


### Bug Fixes

* 🐛 allow changing subscription type when canceling checkout ([83d36eb](https://github.com/vinchaudinc/r.care/commit/83d36ebe32046014bc1e59d2c0ce001018b81278))
* 🐛 correctly nullish-chain to prevent crash ([4beef92](https://github.com/vinchaudinc/r.care/commit/4beef92b77caf54ec231ab11e69e16ac24cf6864))
* 🐛 switch off production env check for dev env ([96cca44](https://github.com/vinchaudinc/r.care/commit/96cca4450976d5057496810350f8fa207c9cd8da))


### Features

* 🎸 adjust data keys ([4c2e9c9](https://github.com/vinchaudinc/r.care/commit/4c2e9c99f7e2485267d8bf174493032539fdef3b))
* 🎸 implement Meta Pixel and Google Tag analytics ([05eb8c4](https://github.com/vinchaudinc/r.care/commit/05eb8c4c06340aeec39ff8a6589a8c4123046372))


### BREAKING CHANGES

* 🧨 This causes mismatch in the firestore data keys and so ongoing sessions
using the old keys may not resume correctly. No fallback mechanism has
been included in this fix.

✅ Closes: Notion Ticket Number 4

## [0.3.0](https://github.com/vinchaudinc/r.care/compare/0.3.0...0.2.0)

### Features

* 🎸 add subscription/customer ID to checkout data ([d61ee32])(https://github.com/vinchaudinc/r.care/commit/d61ee32105c5dd1a2f3f92381f0eb18595e43078)

## [0.2.0](https://github.com/vinchaudinc/r.care/compare/0.2.0...0.1.0)

### Bug Fixes

* Several content adjustments

## [0.1.0](https://github.com/vinchaudinc/r.care/tree/0.1.0)

* Initial handover version
