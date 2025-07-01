from openai import OpenAI

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework import viewsets
from nowastefridger.models import Ingredient, Recipe
from nowastefridger.serializers import IngredientSerializer, RecipeSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class AIGenerateRecipeView(APIView):
    def get(self, request):
        return Response({"message": "Use POST to generate a recipe."})

    def post(self, request):
        ingredients = request.body.decode('utf-8').split()
        print(f"Received ingredients: {ingredients}")

        if not ingredients:
            return Response({"error": "No ingredients provided."}, status=status.HTTP_400_BAD_REQUEST)

        prompt = f"Podaj przepis na danie, które zawiera (staraj się nie używać dodatkowych składników): {', '.join(ingredients)}."

        try:
            client = OpenAI(api_key=settings.OPENAI_API_KEY)

            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Jesteś pomocnym kucharzem."},
                    {"role": "user", "content": prompt}
                ]
            )

            recipe = response.choices[0].message.content
            print(recipe)
            return Response({"recipe": recipe}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
