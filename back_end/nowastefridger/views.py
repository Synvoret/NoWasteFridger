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
        data = request.data
        ingredients = data.get('ingredients')

        if isinstance(ingredients, str):
            ingredients = [i.strip() for i in ingredients.split(',') if i.strip()]

        if not isinstance(ingredients, list) or len(ingredients) == 0:
            return Response(
                {"error": "No ingredients provided. Please send a non-empty 'ingredients' list."},
                status=status.HTTP_400_BAD_REQUEST
            )

        prompt = (
            f"Provide a recipe for a dish that includes "
            f"(do not use any additional ingredients): {', '.join(ingredients)}."
            f"(you may suggest spices)"
            f"(always give in two languages, first in Polish, second in Enlish.)"
        )

        try:
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful cook."},
                    {"role": "user", "content": prompt}
                ]
            )
            recipe = response.choices[0].message.content
            return Response({"recipe": recipe}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
