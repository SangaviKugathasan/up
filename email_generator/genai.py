# genai.py
import gemini

# Initialize Gemini AI model with your key
# Replace "your_api_key" with your actual API key
gemini.api_key = "AIzaSyAkJVCKCggM83aZGAC6jd0Gyr6ysUQdpRk"

# Select a model
model = gemini.GenerativeModel("gemini-1.5-flash")  # Adjust the model name as needed

def generate_email(subject, recipient, message_body):
    # Construct the prompt for Gemini AI
    prompt = f"Subject: {subject}\nRecipient: {recipient}\n\nMessage: {message_body}\n\nPlease create a professional email based on the above details."

    # Call the Gemini API to generate the email
    response = model.generate(prompt=prompt)

    return response['text']  # Adjust based on how the response is structured
