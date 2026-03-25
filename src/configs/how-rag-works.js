export default {
  title: 'How RAG Works',
  system_prompt: {
    instructions: "You are an HR assistant for Acme Corp.\nAnswer using retrieved company documents.\nCite sources.",
    long_term_memory: "Employee: Jane Smith, Engineering dept.",
    skill_registry: null
  },
  tools: [
    {
      name: "vector_search",
      description: "Search company knowledge base",
      parameters: { query: "string", top_k: "number" }
    }
  ],
  mcp_servers: null,
  messages: [
    {
      role: "user",
      content: "How many vacation days do I get?"
    },
    {
      role: "assistant",
      content: "Let me search our policy documents.",
      tool_call: {
        name: "vector_search",
        arguments: { query: "vacation days allowance", top_k: 2 }
      }
    },
    {
      role: "tool_result",
      content: '[PTO-Policy-2024.pdf, p.3]\n"Full-time employees receive 25 vacation days/year. Unused days carry over up to 5."\n\n[Eng-Handbook.pdf, p.12]\n"Engineering may take up to 3 conference days/year with manager approval."',
      tool_name: "vector_search"
    },
    {
      role: "assistant",
      content: "25 days/year, up to 5 carry over. As engineering, you also get 3 conference days with manager approval.\n\nSources: PTO-Policy-2024.pdf, Eng-Handbook.pdf"
    }
  ]
};
