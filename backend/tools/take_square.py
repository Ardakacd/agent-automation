from langchain_core.tools import tool

    

@tool("take_square")
def take_square(temperature: str) -> int:
    """Take square of the temperature value.

    Args:
        temperature: The temperature value to take the square of.
    """
    try:
        return int(temperature) * int(temperature)
    except ValueError:
        return "Invalid temperature value"
        
    
    