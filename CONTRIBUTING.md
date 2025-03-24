#### Prerequisites

To contribute to Komachi, you need to know the following:

- NodeJs/Bun
- NextJs

#### Cloning the repository

in your terminal use command

```bash
git clone https://github.com/irfanshadikrishad/komachi.git
```

to clone the repository.

Go to the directory using -

```bash
cd komachi
```

Create a new branch

```bash
git checkout -b <branch-name>
```

#### Updating the codebase

After cloning and updating the code, you are ready to push your code. Push your code to your repository that you forked.

run these from the root to commit and push. Maintain commit message guidelines.

```bash
git commit -am "<prefix>: <commit-message>"
```

```bash
git push origin <branch-name>
```

#### Commit Message

When you've made changes to one or more files, you have to commit that file. You also need a message for that commit.

You should read these guidelines, or that summarized:

- Short and detailed
- Prefix one of these commit types:
  - `feat:` A feature, possibly improving something already existing
  - `fix:` A fix, for example of a bug
  - `refactor:` Refactoring a specific section of the codebase
  - `test:` Everything related to testing
  - `docs:` Everything related to documentation
  - `chore:` Code maintenance

Examples:

- `feat: Speed up parsing with new technique`
- `fix: Fix komachi search`
- `refactor: Reformat code at komachi`
