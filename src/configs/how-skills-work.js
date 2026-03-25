export default {
  title: 'How Skills Work',
  highlights: [
    { text: "run_shell", color: 1 },
    { text: "/commit", color: 2 },
    { text: "git diff --stat", color: 3 },
    { text: "git add -A", color: 4 },
    { text: "git commit -m", color: 5 },
  ],
  system_prompt: {
    instructions: "You are a coding assistant.\nUse registered skills when they match the request.",
    long_term_memory: null,
    skill_registry: '/commit - Stage and commit changes\n/review - Review PR\n/test - Run test suite'
  },
  tools: [
    {
      name: "run_shell",
      description: "Execute a shell command",
      parameters: { command: "string" }
    }
  ],
  mcp_servers: null,
  messages: [
    {
      role: "user",
      content: "save to repo"
    },
    {
      role: "tool_result",
      content: "Skill loaded: /commit\n\nSteps:\n1. Run `git diff --stat` to see changed files\n2. Generate a descriptive commit message from the diff\n3. Stage all changes with `git add -A`\n4. Commit with `git commit -m '<message>'`",
      tool_name: "skill_registry"
    },
    {
      role: "assistant",
      content: "Checking what's changed.",
      tool_call: {
        name: "run_shell",
        arguments: { command: "git diff --stat" }
      }
    },
    {
      role: "tool_result",
      content: " src/auth.js  | 12 ++++++---\n src/login.js |  8 +++++\n 2 files changed, 15(+), 5(-)",
      tool_name: "run_shell"
    },
    {
      role: "assistant",
      content: "2 files changed. Committing now.",
      tool_call: {
        name: "run_shell",
        arguments: { command: "git add -A && git commit -m 'Fix auth refresh and login retry'" }
      }
    },
    {
      role: "tool_result",
      content: "[main a3f7c2d] Fix auth refresh and login retry\n 2 files changed, 15(+), 5(-)",
      tool_name: "run_shell"
    },
    {
      role: "assistant",
      content: "Committed: \"Fix auth refresh and login retry\" (2 files)."
    }
  ]
};
