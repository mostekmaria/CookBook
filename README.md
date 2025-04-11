# Cookbook App

Aplikacja do zarządzania przepisami kulinarnymi. Pozwala tworzyć, edytować, przeglądać i usuwać własne przepisy, a także wyszukiwać inspiracje z zewnętrznego API kulinarnego (Spoonacular).

### Technologie użyte w projekcie:

-Backend: C# (.NET 8), Entity Framework Core, PostgreSQL

-Frontend: React (Vite)

-API zewnętrzne: Spoonacular (https://spoonacular.com/food-api)

## Jak uruchomić projekt lokalnie (bez Dockera):

### Wymagania:

.NET SDK 8.0
- Pobierz ze strony: https://dotnet.microsoft.com/en-us/download/dotnet/8.0
- Po instalacji sprawdź wersję:
dotnet --version (powinno być np. 8.0.100 lub wyżej)

Entity Framework Core CLI (jeśli nie masz)
- W terminalu wpisz:
dotnet tool install --global dotnet-ef
- albo jeśli już masz:
dotnet tool update --global dotnet-ef

PostgreSQL
- Pobierz np. z: https://www.postgresql.org/download/
Potrzebny będzie Ci login, hasło i port (domyślnie 5432)
Alternatywa: pgAdmin lub uruchomienie bazy w Dockerze (jeśli umiesz)

Biblioteki NuGet (instalowane automatycznie przez dotnet restore)
W projekcie powinny znajdować się m.in.:

- Microsoft.EntityFrameworkCore

- Microsoft.EntityFrameworkCore.Design

- Npgsql.EntityFrameworkCore.PostgreSQL

- Swashbuckle.AspNetCore

dla frontendu:
Node.js
Pobierz z: https://nodejs.org/
Po instalacji sprawdź:
node -v oraz npm -v

Zależności projektu – przez npm
W folderze frontend/frontend uruchom:
npm install
(pobierze wszystko z package.json, np. React, React Router, Vite itd.)

### Krok 1 – Backend (C#):

Otwórz terminal i przejdź do katalogu backendu:
cookbook/backend/book/book

Sprawdź plik appsettings.json – w sekcji ConnectionStrings ustaw poprawny connection string do Twojej bazy danych PostgreSQL, np.:
"Host=localhost;Port=5432;Database=CookbookDb;Username=postgres;Password=twoje_haslo"

W tym katalogu uruchom kolejno komendy:
dotnet restore
dotnet ef database update
dotnet run

Backend powinien działać pod adresem:
http://localhost:5193
(dokładny adres powinien być podany po odpaleniu projektu)
ten adres należy także wprowadzić do plików .jsx we frontendzie

### Krok 2 – Frontend (React):

W nowym terminalu przejdź do katalogu frontendowego:
cookbook/frontend/frontend

Zainstaluj zależności:
npm install

Uruchom frontend:
npm run dev

Aplikacja frontendowa powinna być dostępna pod adresem:
http://localhost:5173

Połączenie backendu z frontendem: Frontend domyślnie komunikuje się z backendem pod adresem http://localhost:5193. Upewnij się, że backend został uruchomiony przed uruchomieniem frontendu.

### Funkcjonalności aplikacji:

Dodawanie nowego przepisu

Edycja i usuwanie przepisu

Lista przepisów z wyszukiwaniem, filtrowaniem po czasie i sortowaniem

Szczegóły przepisu

Wyszukiwanie przepisów z zewnętrznego API (Spoonacular) i możliwość ich zapisania do własnej bazy

Struktura katalogów:

cookbook/ ├── backend/ │ └── book/ (projekt backendowy .NET) ├── frontend/ │ └── frontend/ (projekt frontendowy React)

Autor: Projekt został zrealizowany jako zadanie rekrutacyjne. Całość została przygotowana od podstaw z użyciem .NET i React. Jeśli pojawią się pytania lub problemy z uruchomieniem, zachęcam do kontaktu.
