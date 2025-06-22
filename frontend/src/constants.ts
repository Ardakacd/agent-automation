export const availableNodes = [
    {
      label: 'Agents',
      type: 'agent',
      description: 'Use agents to automate your workflow',
      icon: '/images/ai-agent-icon.png',
      items: [
        { name: "React agent", icon: '/images/react-agent-icon.png' },
      ]
    },
    {
      label: 'Tools',
      type: 'tool',
      description: 'Tools you can use for your workflow',
      icon: '/images/tool-icon.png',
      items: [
        { name: "Current Weather", icon: '/images/web-search-icon.png' },
        { name: "Take Square", icon: '/images/web-search-icon.png' },
      ],
    },
    {
      label: 'Functions',
      type: 'function',
      description: 'Functions you can use for your workflow',
      icon: '/images/functions-icon.jpeg',
      items: [
        { 
          name: "Dummy Function", 
          icon: '/images/functions-icon.jpeg',
          parameters: [
            { name: "number", label: "Number", type: "number", placeholder: "Enter a number" },
            { name: "text", label: "Text", type: "text", placeholder: "Enter some text" }
          ]
        }
      ]
    },
]

export const availableLLMs = [
    { 
      name: "OpenAI", 
      icon: '/images/open-ai-icon.png',
      models: [
        { name: "gpt-4", label: "GPT-4" },
        { name: "gpt-4-turbo", label: "GPT-4 Turbo" },
        { name: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
        { name: "gpt-3.5-turbo-16k", label: "GPT-3.5 Turbo 16K" }
      ]
    },
    { 
      name: "Groq", 
      icon: '/images/groq-icon.png',
      models: [
        { name: "llama3-8b-8192", label: "Llama3 8B" },
        { name: "llama3-70b-8192", label: "Llama3 70B" },
        { name: "mixtral-8x7b-32768", label: "Mixtral 8x7B" },
        { name: "gemma2-9b-it", label: "Gemma2 9B" }
      ]
    },
    { 
      name: "Gemini", 
      icon: '/images/gemini-icon.png',
      models: [
        { name: "gemini-pro", label: "Gemini Pro" },
        { name: "gemini-pro-vision", label: "Gemini Pro Vision" },
        { name: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
        { name: "gemini-1.5-flash", label: "Gemini 1.5 Flash" }
      ]
    },
    { 
      name: "Claude", 
      icon: '/images/claude-icon.png',
      models: [
        { name: "claude-3-opus-20240229", label: "Claude 3 Opus" },
        { name: "claude-3-sonnet-20240229", label: "Claude 3 Sonnet" },
        { name: "claude-3-haiku-20240307", label: "Claude 3 Haiku" },
        { name: "claude-2.1", label: "Claude 2.1" }
      ]
    },
]