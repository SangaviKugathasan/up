import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up the Gemini API Key from environment variables
gemini_api_key = os.getenv("GEMINI_API_KEY")

# Initialize the Gemini model
genai.configure(api_key=gemini_api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

# Function to generate email
def generate_email(subject, purpose, recipient):
    # Prepare the prompt for the Gemini AI
    prompt = f"Generate a professional email about {subject}. The purpose is {purpose}. "

    # Call the Gemini API model to generate content
    try:
        response = model.generate_content(prompt)
        email_content = response.text
        return email_content
    except Exception as e:
        print(f"Error occurred: {e}")
        return None

# Example usage
subject = "Meeting Request"
purpose = "I would like to schedule a meeting for discussing project updates."
email = generate_email(subject, purpose, recipient)

if email:
    print("Generated Email: \n")
    print(email)
else:
    print("Failed to generate email.")