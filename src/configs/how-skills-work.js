export default {
  title: 'How Skills Work',
  system_prompt: {
    instructions: "You are a coding assistant.\nWhen a user request matches a registered skill, use it.",
    long_term_memory: null,
    skill_registry: '/commit - Stage and commit changes with a message\n/review - Review PR and suggest improvements\n/test - Run test suite and report results'
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
      content: "I'll commit your changes. Let me check what's been modified.",
      tool_call: {
        name: "run_shell",
        arguments: { command: "git diff --stat" }
      }
    },
    {
      role: "tool_result",
      content: " src/auth.js  | 12 ++++++---\n src/login.js |  8 +++++\n 2 files changed, 15 insertions(+), 5 deletions(-)",
      tool_name: "run_shell"
    },
    {
      role: "assistant",
      content: "I see changes in auth and login. Let me stage and commit these.",
      tool_call: {
        name: "run_shell",
        arguments: { command: "git add -A && git commit -m 'Fix auth token refresh and add login retry logic'" }
      }
    },
    {
      role: "tool_result",
      content: "[main a3f7c2d] Fix auth token refresh and add login retry logic\n 2 files changed, 15 insertions(+), 5 deletions(-)",
      tool_name: "run_shell"
    },
    {
      role: "assistant",
      content: "Done! Committed 2 files with message: \"Fix auth token refresh and add login retry logic\"."
    }
  ]
};
