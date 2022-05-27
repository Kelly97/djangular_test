from django.contrib import admin
from django.urls import path, include
from apps.conf import views

urlpatterns = [
    path('spaces/general/', views.SpaceGeneralViewSet.as_view(), name='publicInfo'),
    path("spaces/detailed/", views.SpaceDetailedViewSet.as_view(), name="todo_list"),
    path("space/create/", views.CreateSpaceoAPIView.as_view(), name="todo_create"),
    path("space/update/<int:pk>/", views.UpdateSpaceAPIView.as_view(), name="update_todo"),
    path("space/delete/<int:pk>/", views.DeleteSpaceAPIView.as_view(), name="delete_todo")
]
