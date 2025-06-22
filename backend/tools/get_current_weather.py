from langchain_core.tools import tool

    

@tool("get_current_weather_tool")
def get_current_weather(city: str) -> str:
    """Get the current weather in a given city.

    Args:
        city: The city to get the weather for.
    """
    return f"The current weather in {city} is sunny with a temperature of 70 degrees and humidity of 50%."
        
    
    