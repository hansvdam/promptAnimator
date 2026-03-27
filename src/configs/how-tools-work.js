export default {
  title: 'How Tools Work',
  highlights: [
    { text: "get_weather", color: 1 },
    { text: "search_web", color: 2 },
    { text: "New York", color: 3 },
    { text: "celsius", color: 4 },
  ],
  system_prompt: {
    instructions: "You are a helpful assistant.\nUse tools for real-time information.\nBe concise.",
    long_term_memory: "Prefers Celsius. Located in Amsterdam.",
    skill_registry: null
  },
  tools: [
    {
      name: "get_weather",
      description: "Get current weather for a location",
      parameters: { location: "string", unit: "celsius | fahrenheit" }
    },
    {
      name: "search_web",
      description: "Search the web for real-time info",
      parameters: { query: "string" }
    }
  ],
  mcp_servers: null,
  messages: [
    {
      role: "user",
      content: "What's the weather in New York?"
    },
    {
      role: "assistant",
      // content: "Let me check that.",
      tool_call: {
        name: "get_weather",
        arguments: { location: "New York", unit: "celsius" }
      }
    },
    {
      role: "annotation",
      tag: "what happens",
      content: "Agent calls weather API with 'New York' and 'celcius', wraps response as tool_result for the LLM."
    },
    {
      role: "tool_result",
      content: '{\n  "temperature": 14,\n  "condition": "Partly cloudy",\n  "humidity": 72,\n  "wind": "18 km/h NW"\n}',
      tool_name: "get_weather"
    },
    {
      role: "assistant",
      content: "14\u00B0C, partly cloudy. Humidity 72%, wind 18 km/h NW."
    }
  ]
};
