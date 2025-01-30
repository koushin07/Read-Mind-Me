#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ReadMindMe.API/ReadMindMe.API.csproj", "ReadMindMe.API/"]
COPY ["ReadMindMe.Application/ReadMindMe.Application.csproj", "ReadMindMe.Application/"]
COPY ["ReadMindMe.Domain/ReadMindMe.Domain.csproj", "ReadMindMe.Domain/"]
COPY ["ReadMindMe.Infrastructure/ReadMindMe.Infrastructure.csproj", "ReadMindMe.Infrastructure/"]
RUN dotnet restore "./ReadMindMe.API/ReadMindMe.API.csproj"
COPY . .
WORKDIR "/src/ReadMindMe.API"
RUN dotnet build "./ReadMindMe.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ReadMindMe.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false




FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ReadMindMe.API.dll"]
