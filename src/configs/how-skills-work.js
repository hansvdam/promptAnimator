export default {
  title: 'How Skills Work',
  system_prompt: {
    instructions: "You are a coding assistant.\nWhen users invoke a slash command, consult the skill registry and execute the matching skill.",
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
      content: "/commit"
    },
    {
      role: "tool_result",
      content: "Skill loaded: /commit\n\nSteps:\n1. Run git diff to see changes\n2. Generate a commit message\n3. Stage and commit",
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
      content: "Committed: \"Fix auth token refresh and add login retry logic\"",
      tool_call: {
        name: "run_shell",
        arguments: { command: "git add -A && git commit -m 'Fix auth token refresh and add login retry logic'" }
      }
    }
  ]
};
