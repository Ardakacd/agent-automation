# mostly taken from: https://smith.langchain.com/hub/hwchase17/react?tab=
REACT_AGENT_PROMPT = '''Answer the following questions as best you can. You have access to the following tools:

{tools}

If no tools are provided just answer the question. If tools are provided, just follow the format below:

<format>
Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question
</format>

Begin!

Question: {input}
Thought:{agent_scratchpad}'''