export function buildSteps(config) {
  const steps = [];
  const highlights = config.highlights || null;

  // Phase 1: Context setup
  const sp = config.system_prompt;
  if (sp) {
    if (sp.instructions) {
      steps.push({ type: 'show-context-card', cardType: 'instructions', title: 'Instructions', content: sp.instructions, highlights });
    }
    if (sp.long_term_memory) {
      steps.push({ type: 'show-context-card', cardType: 'memory', title: 'Long-term Memory', content: sp.long_term_memory, highlights });
    }
    if (sp.skill_registry) {
      steps.push({ type: 'show-context-card', cardType: 'skills', title: 'Skill Registry', content: sp.skill_registry, highlights });
    }
  }

  if (config.tools) {
    steps.push({ type: 'show-context-card', cardType: 'tools', title: 'Tools', content: config.tools, highlights });
  }

  if (config.mcp_servers) {
    steps.push({ type: 'show-context-card', cardType: 'mcp', title: 'MCP Servers', content: config.mcp_servers, highlights });
  }

  // Separator between context and messages
  if (steps.length > 0 && config.messages?.length > 0) {
    steps.push({ type: 'pause-beat' });
  }

  // Phase 2: Messages
  if (config.messages) {
    for (const msg of config.messages) {
      switch (msg.role) {
        case 'user':
          steps.push({ type: 'user-message', content: msg.content, highlights });
          break;
        case 'assistant':
          steps.push({ type: 'assistant-message', content: msg.content, tool_call: msg.tool_call || null, highlights });
          break;
        case 'tool_result':
          steps.push({ type: 'tool-result', content: msg.content, tool_name: msg.tool_name || null, highlights });
          break;
        case 'annotation':
          steps.push({ type: 'annotation', content: msg.content, tag: msg.tag, highlights });
          break;
      }
    }
  }

  return steps;
}
