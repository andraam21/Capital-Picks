# Capital3 — Tourist Application Specification

## 1. Overview

### Purpose

Capital3 is a tourist application that recommends the top three tourist attractions in the capital city of a selected country.

The application helps users quickly discover the most relevant places to visit when travelling to a country's capital.

---

## 2. Core Requirements

### 2.1 Country Selection

- The user must be able to provide or select a country.
- The application must identify the capital city associated with the selected country.
- The application must only accept valid and recognizable countries.

### 2.2 Capital City

- Every recommendation must be associated with the capital city of the selected country.
- The application must not return attractions from other cities in the country.
- The capital city must be included in the successful response.

### 2.3 Tourist Attractions

- The application must return exactly three tourist attractions for a valid country.
- All three attractions must be located in the country's capital city.
- Attractions must be ordered from the highest recommendation to the lowest recommendation.
- Each attraction should have a name.
- Each attraction may also contain additional information such as a description, location, image, or rating.

---

## 3. Business Rules

The following rules must always be true:

1. A valid country is required to obtain recommendations.
2. The selected country's capital city is the destination for the recommendations.
3. A successful request returns exactly three attractions.
4. All returned attractions belong to the selected capital city.
5. Attractions are presented in ranked order.
6. The application must not invent attractions or return attractions belonging to another city.
7. If a country cannot be recognized, the application must return an appropriate error.
8. If the country is missing, the application must return a validation error.

---

## 4. API

### Get Tourist Attractions

**Endpoint:**

```http
GET /attractions/{country}