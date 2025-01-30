#!/bin/bash

# Run migrations
dotnet ef database update

# Run the application
dotnet ReadMindMe.API.dll
