Hello,

A total of 64 hours went into creating the app as you see it now. It was not
a lot of time, and the focus went mainly into creating a workable prototype
that fully completes the user onboarding journey with as pleasing styling as
possible, and hopefully no actual bugs.

That said, many things remain desired:

- The app is not necessarily using the best NextJS practices. Specifically,
  server-side rendering is not really optimized, partly because of the use of
  styled-components, partly because of the image handling. This is an onboarding
  app, where first impression matters, so I had not wanted NextJS on-demand/
  lazy-loading of images to cause flashes of unseen graphics. Instead, I opted
  for computing base64 dataURLs on the first load. There is probably a better
  solution.

- The back button behavior is simply not done properly for the lack of time.
  Part of it is that it was never fully discussed how it should behave (
  should each forward action write a new history entry?)

- You would also then not be surprised that routing logic is also minimal;
  another aspect where the app is not leveraging the full power of NextJS.
  Rudimentary section-based routing with state peristence by cookie and
  Firestore is implemented. To reset the state completely, go to
  `<server_url>/?restart`. It's not clear how the entire flow is restarted
  through the UI, but I figured it's a requirement so I built this escape
  hatch.

- The quiz progress is currently saved in the session storage. It was mostly
  for development purposes so that I woudn't have to click through each quiz,
  but it's not how the progress should be restored. The app already sends
  each response to Firebase, so it should be a matter of fetching the responses
  and restoring the progress from the server side. I just never got around to
  doing it.

- There has been no truly consistent typography, layouting or color scheme. I had
  initially attempted a "design system" abstraction, but quickly gave up on it
  as I found that there were more exceptions than there were rules,
  and instead followed Figma and made improvised corrections when something
  didn't seem right. I would strongly recommend that a consistent design system
  be created and the app be refactored to use it.

- Because of the lack of a comprehensive design system and the time
  constraint, you will see some composite components being duplicated
  owing to small variants in layouting, in HTML semantic, or in typography.

- I understand that you want to use Firebase Remote Config to manage the
  actual flow content. The way the app is written supports this with fairly
  minimal work -- there is a [TypeScript type declaration](./src/models/OnboardingFlow/model.ts) that you can use as the basis for Remote Config templating, or a `zod` schema if you're indirecting it.

  However, some caveats:
  - Not the entire flow is currently modeled. The scope to which things
    should be hard-coded vs modeled were not clear. Most of the actual
    quiz content is modeled, but the content in the result and paywall
    pages are not.
  - Graphical contents are now hard-coded to git checked-in assets.
    This may or may not be flexible enough for your needs, but adjusting
    to support URLs should be fairly straightforward.
  - Some non-textual or graphical aspects have not been encoded, like
    transition time, or background colors, or other kinds of theming
    (again, because it was not clear what is meant to be modelled versus
    system-managed.)
  - Same with Stripe product catalog. This is currently encoded using
    environment variables and UI-displayed prices are **hard coded**. You
    might want to port this to the content model and optionally fetch the
    correct price using the Stripe API.
  - With the exception of testimonials. I was not told, nor was I able to verify
    myself, that the testimonials are real and not placeholders. In order to
    minimize your legal exposure with regards to FTC guidelines, I have made
    these part of the content model. I have also added the `disclaimer` fields,
    currently set to `null` because they are not part of the design. **I strongly
    encourage you to write a disclaimer**, should these testimonials be fictitious.
    The FTC can persecute you for false advertising, and I am not a lawyer, so
    this is a better-safe-than-sorry measure.

  - I'm sorry about the relative lack of comments. The time constraint
    to get this off the ground has meant documentation/clean code/
    file organization/component organization have taken a backseat.
    That said, I am happy to hand over the app to you. I have made a
    best-effort-in-time-constraint to make the code as comprehensible as possible. Feel free to reach out to me if you have any questions.

Happy developing!

Tar (the guy who made the first version of this.)
