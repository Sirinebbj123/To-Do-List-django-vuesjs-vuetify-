from django.urls import path
from .views import TaskListCreateAPI, TaskUpdateDeleteAPI

urlpatterns = [
    path('tasks/', TaskListCreateAPI.as_view(), name='task-list-create-api'),
    path('tasks/<int:pk>/', TaskUpdateDeleteAPI.as_view(), name='task-update-delete-api'),
]
