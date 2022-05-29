from django.contrib import admin
from django.urls import path, include
from apps.conf import views

urlpatterns = [
    #Spaces
    path('spaces/general/', views.SpaceGeneralViewSet.as_view(), name='space_public_list'),
    path("spaces/detailed/", views.SpaceDetailedViewSet.as_view(), name="space_detailed_list"),
    path("space/detail/<int:pk>/", views.SpaceDetailsViewSet.as_view(), name="space_detail"),
    path("space/create/", views.CreateSpaceoAPIView.as_view(), name="space_create"),
    path("space/update/<int:pk>/", views.UpdateSpaceAPIView.as_view(), name="update_space"),
    path("space/delete/<int:pk>/", views.DeleteSpaceAPIView.as_view(), name="delete_space"),
    #Holidays
    path("holidays/list/", views.HolidaysListView.as_view(), name="list_holidays"),
    path("holidays/listcreate/", views.HolidaysListCreateView.as_view(), name="listcreate_holidays"),
    path("holidays/retrieveupdate/<int:pk>/", views.HolidayRetrieveUpdateView.as_view(), name="retrieveupdate_holidays"),
    path("holidays/destroy/<int:pk>/", views.HolidayDestroyView.as_view(), name="destroy_holidays"),

]
