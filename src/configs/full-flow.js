export default {
  title: 'Full Flow',
  system_prompt: {
    instructions: "You are a project management assistant.\nUse tools and MCP servers to help manage tasks.\nBe proactive and concise.",
    long_term_memory: "User: Alex Chen, Tech Lead\nPrefers brief updates\nTimezone: CET",
    skill_registry: '/standup - Generate daily standup summary\n/deploy - Trigger deployment pipeline'
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
      description: "Connect to Jira for ticket management",
      tools: ["get_sprint", "update_ticket", "create_ticket"]
    },
    {
      name: "github-server",
      description: "Connect to GitHub for PR and repo info",
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
      content: "Skill loaded: /standup\n\nGather yesterday's activity, open PRs, and sprint status, then summarize.",
      tool_name: "skill_registry"
    },
    {
      role: "assistant",
      content: "Pulling your standup data from multiple sources.",
      tool_call: {
        name: "query_db",
        arguments: { sql: "SELECT * FROM commits WHERE author='alex' AND date=CURRENT_DATE-1" }
      }
    },
    {
      role: "tool_result",
      content: '3 commits yesterday:\n- "Refactor auth middleware" (09:14)\n- "Add rate limiting tests" (14:22)\n- "Fix CI pipeline timeout" (16:45)',
      tool_name: "query_db"
    },
    {
      role: "assistant",
      content: "Here's your standup summary:\n\nYesterday: Refactored auth middleware, added rate limiting tests, fixed CI timeout.\nToday: 2 open PRs awaiting review, sprint at 73% completion.\nBlockers: None identified."
    },
    {
      role: "user",
      content: "Notify the team on #engineering"
    },
    {
      role: "assistant",
      content: "Sending the summary to Slack.",
      tool_call: {
        name: "send_notification",
        arguments: { channel: "#engineering", message: "Standup - Alex: Refactored auth, added rate limit tests, fixed CI. 2 PRs open, sprint at 73%." }
      }
    },
    {
      role: "tool_result",
      content: "Message sent to #engineering successfully.",
      tool_name: "send_notification"
    },
    {
      role: "assistant",
      content: "Done! Standup summary posted to #engineering."
    }
  ]
};
