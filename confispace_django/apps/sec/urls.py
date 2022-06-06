from django.urls import path
from apps.sec.views import ChangePasswordView, LoginAPI, RegisterAPI, UpdateProfileView, UserProfile, GroupsViewSet
from knox import views as knox_views

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('profile/', UserProfile.as_view(), name='profile'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('update_profile/', UpdateProfileView.as_view(), name='update_profile'),
    path('groups/', GroupsViewSet.as_view(), name='groups_list'),
]