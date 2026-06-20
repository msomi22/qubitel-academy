---

paths:

* "**/*"

---

# Always-on Cline operating rules

These rules apply to every task.

## No terminal by default

Cline must not run terminal commands by default.

For inspection, Cline should use workspace file reading, file search, and editor context before terminal commands.

Do not run commands such as:

```bash
ls
find
grep
git status
git diff
git log
npm run test
npm run build
```

unless the user explicitly says terminal commands are allowed.

## Non-interactive terminal commands only

When terminal commands are explicitly allowed, Cline must run only non-interactive commands.

Cline must not run commands that may:

* open a pager
* open an editor
* start a watcher
* start a long-running process
* wait for keyboard input
* ask for confirmation
* require pressing Enter
* require pressing `q`
* require answering `y/n`

If a command opens a pager, waits for input, hangs, or does not return control cleanly, Cline must stop immediately and report the blocked command.

## Safe Linux command rule

When terminal commands are explicitly allowed, general Linux commands must be safe, bounded, and non-interactive.

Cline must prefer commands that:

* finish on their own
* produce limited output
* read information without changing files
* target specific files or directories
* do not wait for keyboard input
* do not open pagers, editors, prompts, watchers, or long-running processes

## Linux commands to avoid unless explicitly requested

Do not run interactive or long-running commands such as:

```bash
less
more
man
top
htop
vi
vim
nano
watch
tail -f
npm run dev
npm start
vite --host
python -m http.server
```

Do not run broad or risky commands such as:

```bash
find /
grep -R . /
cat <large-file>
rm -rf
mv
cp -r
chmod -R
chown -R
sudo
kill
pkill
systemctl restart
service restart
docker system prune
```

unless the user explicitly approves that exact command and purpose.

## Safer Linux command patterns

Use bounded commands instead of commands that may produce huge output.

Bad:

```bash
cat package.json
```

Good:

```bash
sed -n '1,160p' package.json
```

Bad:

```bash
find .
```

Good:

```bash
find src -maxdepth 3 -type f
```

Bad:

```bash
grep -R "defineMcqProblem" .
```

Good:

```bash
grep -R --line-number --include="*.js" "defineMcqProblem" src
```

Bad:

```bash
tail -f app.log
```

Good:

```bash
tail -n 120 app.log
```

Bad:

```bash
journalctl
```

Good:

```bash
journalctl --no-pager -n 120
```

Bad:

```bash
systemctl status nginx
```

Good:

```bash
systemctl --no-pager status nginx
```

## Prefer read-only inspection commands

For inspection, prefer read-only commands such as:

```bash
pwd
sed -n '1,160p' <file>
head -n 80 <file>
tail -n 120 <file>
wc -l <file>
grep --line-number "text" <specific-file>
find <specific-directory> -maxdepth 3 -type f
```

Avoid write operations unless the user explicitly requested file changes.

Write operations include:

```bash
rm
mv
cp
mkdir
touch
chmod
chown
truncate
tee
>
>>
npm install
npm update
```

## Use time limits for commands that might hang

If a command could hang, wrap it with `timeout`.

Good:

```bash
timeout 10s npm run test
```

Good:

```bash
timeout 10s grep -R --line-number "wordPattern" src
```

If the command times out, Cline must stop and report the timeout instead of trying another command.

## Git commands must disable the pager

When Git commands are explicitly allowed, Cline must disable the Git pager.

Do not run raw Git inspection commands like:

```bash
git status
git diff
git diff --stat
git log
git show
```

Use `git --no-pager` instead:

```bash
git --no-pager status --short
git --no-pager diff --stat
git --no-pager diff --name-only
git --no-pager diff --no-ext-diff
git --no-pager diff --no-ext-diff -- <specific-file>
git --no-pager log --oneline -5
git --no-pager show --stat --no-ext-diff --no-renames
```

Prefer narrow Git commands that produce limited output.

Good:

```bash
git --no-pager diff --name-only
git --no-pager diff --stat
git --no-pager diff --no-ext-diff -- <specific-file>
```

Bad:

```bash
git diff
git diff --stat
git log
git show
```

## One command at a time

When terminal commands are explicitly allowed, Cline must run one command at a time.

Do not chain commands with:

```bash
&&
;
|
||
```

Bad:

```bash
git status --short && git diff --stat
```

Good:

```bash
git --no-pager status --short
```

Bad:

```bash
npm run test && npm run build
```

Good:

```bash
npm run test
```

Wait for the command to finish and return control before running another command.

## Stop after skipped or blocked commands

If any command is skipped, cancelled, blocked, not approved, hangs, opens a pager, waits for input, or does not return control cleanly, Cline must stop immediately.

Cline must not continue thinking.
Cline must not try another command.
Cline must not edit files.
Cline must not continue validation, commit, push, or PR creation.

Cline must report:

```text
Command blocked:
- <command>

Reason:
- <skipped/cancelled/blocked/not approved/hung/opened pager/waiting for input/did not return cleanly>

Current status:
- <what is already known>
- <what could not be confirmed>

Manual next steps:
- <next action>

Ready for next instruction.
```

Then stop.

## No background thinking after completion

When a task is complete, Cline must produce the final report and stop.

Final report format:

```text
Task complete.

Files changed:
- <file>
- <file>

What changed:
- <summary>

Validation:
- <command>: passed/failed/skipped

Notes:
- <important note>

Ready for next instruction.
```

## PR generation mode

If the user asks only for a PR title and description, Cline must not run commands unless explicitly allowed.

If diff inspection is unavailable, generate the PR title and description from known task context and mark validation as unconfirmed.

## Issue reference rule

Every PR description must include an Issue section.

If an issue number is provided, use:

```text
Closes #<issue-number>
```

only when the PR fully completes the issue.

Use:

```text
Refs #<issue-number>
```

for related work that does not close the issue.

If no issue number is available, include:

```text
Issue:
- TODO: Add issue reference, for example `Closes #<issue-number>`.
```
