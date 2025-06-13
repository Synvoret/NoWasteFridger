from django.urls import path, include
from accounts import views as UserViews
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from nowastefridger.views import IngredientViewSet, RecipeViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'ingredients', IngredientViewSet, basename='ingredients')
router.register(r'recipes', RecipeViewSet, basename='recipes')

urlpatterns = [
    path("register/", UserViews.RegisterView.as_view()),
    # AUTHENTICATION
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("protected-view/", UserViews.ProtectedView.as_view(), name="protected_view"),
    path("", include(router.urls)),
]
