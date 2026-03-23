export default {
  title: 'How RAG Works',
  system_prompt: {
    instructions: "You are an HR assistant for Acme Corp.\nAnswer questions using retrieved company documents.\nAlways cite the source document.",
    long_term_memory: "Employee: Jane Smith, Engineering dept.\nAccess level: Standard",
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
      content: "How many vacation days do I get per year?"
    },
    {
      role: "assistant",
      content: "Let me look that up in our policy documents.",
      tool_call: {
        name: "vector_search",
        arguments: { query: "vacation days annual allowance", top_k: 2 }
      }
    },
    {
      role: "tool_result",
      content: '[Doc: PTO-Policy-2024.pdf, p.3]\n"All full-time employees receive 25 vacation days per calendar year. Days accrue monthly at 2.08 days/month. Unused days carry over up to 5 days."\n\n[Doc: Eng-Handbook.pdf, p.12]\n"Engineering team members may also take up to 3 additional conference days per year with manager approval."',
      tool_name: "vector_search"
    },
    {
      role: "assistant",
      content: "You get 25 vacation days per year, accruing at ~2 days/month. Up to 5 unused days carry over. As an engineering employee, you can also take up to 3 extra conference days with manager approval.\n\nSources: PTO-Policy-2024.pdf, Eng-Handbook.pdf"
    }
  ]
};
