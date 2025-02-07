from rest_framework.decorators import api_view
from rest_framework.response import Response
import google.generativeai as genai
from django.conf import settings

api_key = settings.GEMINI_API_KEY

# Configure Gemini AI
genai.configure(api_key=api_key)  # Replace with your Gemini API key

@api_view(['POST'])
def generate_email(request):
    if request.method == 'POST':
        data = request.data
        content = data.get('content', '')
        format = data.get('format', 'official')

        # Generate email based on format
        if format == "official":
            prompt = f"Generate a professional email with the following content: {content}"
        else:
            prompt = f"Generate a casual email with the following content: {content}"

        model = genai.GenerativeModel('gemini-1.5-flash')  # Use the Gemini Pro model
        response = model.generate_content(prompt)
        generated_email = response.text

        return Response({'email': generated_email})
    return Response({'error': 'Invalid request method'}, status=405)