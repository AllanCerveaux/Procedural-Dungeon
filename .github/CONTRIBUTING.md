# Contributing To `Procedural-Dungeon`

- Reporting problems. If you found problems in the generator or its sample projects, do not hesitate and report them as soon as possible.

- Improving documentation. I kindly appreciate improvements to the documentation, especially typo and grammar corrections.

- NOTE: At the moment, proposals for localization of content in other languages are not being accepted.

- Suggesting improvements and new features. Feel free to suggest improvements or new features to the generator and its sample projects. To avoid duplicates, be sure these were not suggested before.

- Star the repository. Yes, this is the simplest contribution you can make to this project. It helps the project rank better on search engines and attract more interested users and contributors alike.

- Sending pull requests. If you have the skills for it, do not hesitate. Be bold and tackle those bugs for me! Read below to learn what you will need to accomplish this task.

### Developer Notes

`Procedural-Dungeon` is developed using Typescript and Node.js 6.12 or >, so you shouldn't run into issues testing the repository on later versions.

#### Setup

```sh
git clone https://github.com/AllanCerveaux/Procedural-Dungeon
cd Procedural-Dungeon
npm install # or yarn install
```

That's all there is to it for setup project.

#### Keep In Mind

- **Follow the coding** conventions. Run `yarn xo` to spot linting problems early.
- **Avoid making changes directly on** `master`, **use topic branches instead**. Use `git checkout [feature||fix]/[feature_name]` (of course, replacing `feature-branch` with a name you feel more appropriate), edit and commit your changes there (start your commit with `FEATURE` for new feature, `FIX` if resolve problem, `WIP` if not finish your job ...). Run `git push` when you're done.
- `Refrain from editing the repository through GitHub`. Changes made with the GitHub editor are cumbersome and harder to evaluate, especially changes made to the source code. Changes made on a local working copy are more reliable and more appropriate pull requests.

> OK, nobody is perfect. Don't feel intimidated if you don't know how to do all that stuff. I won't turn down your proposal right away just because you have failed any of these prerequisites, too. When applicable, I can do the necessary amendments and apply your changes. Just be careful and do your best!
