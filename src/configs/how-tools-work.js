export default {
  title: 'How Tools Work',
  system_prompt: {
    instructions: "You are a helpful assistant.\nYou can use tools to get real-time information.\nAlways be concise and cite your sources.",
    long_term_memory: "User prefers Celsius for temperature.\nUser is located in Amsterdam.",
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
      content: "What's the weather like in Amsterdam right now?"
    },
    {
      role: "assistant",
      content: "Let me check the current weather for you.",
      tool_call: {
        name: "get_weather",
        arguments: { location: "Amsterdam", unit: "celsius" }
      }
    },
    {
      role: "tool_result",
      content: '{\n  "temperature": 14,\n  "condition": "Partly cloudy",\n  "humidity": 72,\n  "wind": "18 km/h NW"\n}',
      tool_name: "get_weather"
    },
    {
      role: "assistant",
      content: "It's currently 14\u00B0C and partly cloudy in Amsterdam, with 72% humidity and northwest winds at 18 km/h."
    }
  ]
};
