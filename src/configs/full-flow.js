export default {
  title: 'Full Flow',
  system_prompt: {
    instructions: "You are a project management assistant.\nUse tools and MCP servers to manage tasks.\nBe concise.",
    long_term_memory: "User: Alex Chen, Tech Lead\nTimezone: CET",
    skill_registry: '/standup - Daily standup summary\n/deploy - Trigger deployment'
  },
  tools: [
    {
      name: "query_db",
      description: "Query the project database",
      parameters: { sql: "string" }
    },
    {
      name: "send_notification",
      description: "Send a Slack notification",
      parameters: { channel: "string", message: "string" }
    }
  ],
  mcp_servers: [
    {
      name: "jira-server",
      description: "Jira ticket management",
      tools: ["get_sprint", "update_ticket", "create_ticket"]
    },
    {
      name: "github-server",
      description: "GitHub PR and repo info",
      tools: ["list_prs", "get_pr_status", "merge_pr"]
    }
  ],
  messages: [
    {
      role: "user",
      content: "/standup"
    },
    {
      role: "tool_result",
      content: "Skill loaded: /standup\n\nGather yesterday's activity, open PRs, sprint status.",
      tool_name: "skill_registry"
    },
    {
      role: "assistant",
      content: "Pulling standup data.",
      tool_call: {
        name: "query_db",
        arguments: { sql: "SELECT * FROM commits WHERE author='alex' AND date=CURRENT_DATE-1" }
      }
    },
    {
      role: "tool_result",
      content: '3 commits:\n- "Refactor auth middleware" (09:14)\n- "Add rate limit tests" (14:22)\n- "Fix CI timeout" (16:45)',
      tool_name: "query_db"
    },
    {
      role: "assistant",
      content: "Yesterday: Auth refactor, rate limit tests, CI fix.\nToday: 2 PRs awaiting review, sprint 73%.\nBlockers: None."
    },
    {
      role: "user",
      content: "Notify #engineering"
    },
    {
      role: "assistant",
      content: "Sending to Slack.",
      tool_call: {
        name: "send_notification",
        arguments: { channel: "#engineering", message: "Standup - Alex: Auth refactor, rate limit tests, CI fix. 2 PRs open, sprint 73%." }
      }
    },
    {
      role: "tool_result",
      content: "Sent to #engineering.",
      tool_name: "send_notification"
    },
    {
      role: "assistant",
      content: "Posted to #engineering."
    }
  ]
};
