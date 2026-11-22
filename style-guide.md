# Brand Style Guide

## Brand Color Palette (from Design Specification)

| Color Name | Hex Code | HSL Representation | Primary Usage |
| :--- | :--- | :--- | :--- |
| **Navy Blue** | `#1E3A5F` | `hsl(214, 52%, 25%)` | Primary brand color, headers, CTAs, active states, key accents |
| **Greige** | `#CFC8BE` | `hsl(35, 16%, 78%)` | Warm luxury neutral, secondary buttons, tags, subtle borders, highlights |
| **White** | `#FFFFFF` | `hsl(0, 0%, 100%)` | Card backgrounds, hero typography, clean surface areas |
| **Light Gray** | `#E5E7EB` | `hsl(220, 13%, 91%)` | Page canvas, soft backgrounds, separators, input borders |
| **Charcoal** | `#374151` | `hsl(217, 19%, 27%)` | High-contrast typography, body text, dark mode surfaces |

## CSS Custom Variables

```css
:root {
  --navy-blue: #1E3A5F;
  --greige: #CFC8BE;
  --white: #FFFFFF;
  --light-gray: #E5E7EB;
  --charcoal: #374151;

  --background: 220 13% 96%;
  --foreground: 217 19% 27%;
  --primary: 214 52% 25%;
  --primary-foreground: 0 0% 100%;
  --secondary: 35 16% 78%;
  --secondary-foreground: 214 52% 25%;
  --card: 0 0% 100%;
  --card-foreground: 217 19% 27%;
  --border: 220 13% 88%;
}

.dark {
  --background: 215 35% 10%;
  --foreground: 220 13% 94%;
  --primary: 35 16% 78%;
  --primary-foreground: 214 52% 20%;
  --secondary: 214 35% 22%;
  --secondary-foreground: 220 13% 94%;
  --card: 215 30% 15%;
  --card-foreground: 220 13% 96%;
  --border: 215 25% 22%;
}
```

## Typography

```css
--ff-nunito-sans: "Nunito Sans", sans-serif;
--ff-poppins: "Poppins", sans-serif;
```
