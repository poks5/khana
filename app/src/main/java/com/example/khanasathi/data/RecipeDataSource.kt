package com.example.khanasathi.data

import com.example.khanasathi.model.NutrientProfile
import com.example.khanasathi.model.Recipe
import com.example.khanasathi.model.SafetyStatus

object RecipeDataSource {
    val recipes: List<Recipe> = listOf(
        Recipe(
            id = "safe-lauka-curry",
            nameEn = "Kidney-Safe Bottle Gourd Curry (Lauka Tarkari)",
            nameNe = "मिर्गौला सुरक्षित लौकाको तरकारी",
            descriptionEn = "Gentle, low-potassium bottle gourd curry flavored with cumin and turmeric. Perfect staple for dialysis.",
            descriptionNe = "पोटासियम निकै कम भएको र पचाउन सजिलो लौकाको तरकारी। डायलाइसिसका लागि अत्यन्त उपयुक्त।",
            category = "Tarkari",
            prepTimeMinutes = 10,
            cookTimeMinutes = 15,
            servings = 3,
            safety = SafetyStatus.SAFE,
            ingredients = listOf(
                "500g Fresh Bottle Gourd (Lauka), peeled and cubed",
                "1 tsp Mustard or Sunflower oil",
                "1/2 tsp Cumin seeds (Jeera)",
                "1/4 tsp Turmeric powder (Besar)",
                "1/4 tsp Cumin-Coriander powder",
                "Minimal pinch of salt (less than 1/4 tsp)",
                "1 tbsp Fresh chopped coriander leaves"
            ),
            instructionsEn = listOf(
                "Peel the bottle gourd completely and cut into bite-sized cubes.",
                "Heat 1 teaspoon oil in a non-stick pan, add cumin seeds and let them sizzle.",
                "Add turmeric powder and the cubed bottle gourd.",
                "Cover and steam-cook on low heat for 10-12 minutes in its own natural moisture.",
                "Stir occasionally. Season with very minimal salt and finish with fresh coriander."
            ),
            instructionsNe = listOf(
                "लौकाको बोक्रा पुरै ताछेर साना-साना टुक्रा पार्नुहोस्।",
                "कराहीमा १ चम्चा तेल तताएर जीरा फुराउनुहोस्।",
                "बेसार र काटेको लौका राख्नुहोस्।",
                "भाँडो छोपेर मन्द आगोमा १०-१२ मिनेट आफ्नै रसमा पाक्न दिनुहोस्।",
                "अन्त्यमा नाम मात्रको नुन र हरियो धनियाँ छर्केर निकाल्नुहोस्।"
            ),
            clinicalNotesEn = "Bottle gourd has naturally low potassium (<150mg per cup) and high water content. Do not add excess water.",
            clinicalNotesNe = "लौकामा प्राकृतिक रूपमै पोटासियम निकै कम हुन्छ। बाहिरबाट धेरै पानी नथप्नुहोस्।",
            nutrientsPerServing = NutrientProfile(calories = 45.0, protein = 1.0, potassium = 130.0, phosphorus = 20.0, sodium = 35.0, fluid = 80.0)
        ),
        Recipe(
            id = "cumin-moong-dal",
            nameEn = "Safe Light Moong Dal with Cumin",
            nameNe = "पचाउन सजिलो जीरा मूँग दाल",
            descriptionEn = "Specially prepared yellow moong lentils with double soaking and froth removal.",
            descriptionNe = "भिजाएर फिँज फाली बनाइएको पातलो र सुरक्षित मूँग दाल।",
            category = "Dal",
            prepTimeMinutes = 30,
            cookTimeMinutes = 20,
            servings = 4,
            safety = SafetyStatus.SAFE,
            ingredients = listOf(
                "1/2 cup Split Yellow Moong Dal",
                "4 cups Water for boiling",
                "1/2 tsp Cumin seeds (Jeera)",
                "1 tsp Ghee or Sunflower oil",
                "1/4 tsp Turmeric powder",
                "1 clove Garlic, crushed",
                "Tiny pinch of salt"
            ),
            instructionsEn = listOf(
                "Soak moong dal in warm water for at least 30 minutes, then thoroughly discard soaking water.",
                "Bring fresh water to a boil in a deep pot and add the washed dal with turmeric.",
                "As it boils, skim off and discard all the thick white froth that rises to the top.",
                "Simmer until dal is completely soft and dissolved.",
                "In a small pan, heat oil, splutter cumin seeds and crushed garlic, and pour into the dal (jhaneko)."
            ),
            instructionsNe = listOf(
                "मूँग दाललाई ३० मिनेट मनतातो पानीमा भिजाएर त्यो पानी पुरै फाल्नुहोस्।",
                "सफा पानीमा बेसार हालेर दाल उमाल्नुहोस्।",
                "उम्लँदा माथि आउने सेतो फिँजलाई चम्चाले झिकेर पूरै फाल्नुहोस्।",
                "दाल राम्ररी गल्न दिनुहोस् र पातलो बनाउनुहोस्।",
                "थोरै तेलमा जीरा र लसुन फुराएर दाल झान्नुहोस्।"
            ),
            clinicalNotesEn = "Skimming froth removes purines and saponins. Keep consistency light and thin.",
            clinicalNotesNe = "फिँज हटाउनाले युरिक एसिड र फोस्फोरस घट्छ। दाल पातलो बनाएर खानुहोस्।",
            nutrientsPerServing = NutrientProfile(calories = 90.0, protein = 6.0, potassium = 150.0, phosphorus = 85.0, sodium = 20.0, fluid = 90.0)
        ),
        Recipe(
            id = "chiura-upma",
            nameEn = "Steamed Chiura Upma with Leached Vegetables",
            nameNe = "उमालेको तरकारी सहितको चिउरा उपमा",
            descriptionEn = "Filling Nepali breakfast with beaten rice and pre-leached cauliflower and carrots.",
            descriptionNe = "पोटासियम घटाइएको काउली र गाजर मिसाएर बनाइएको स्वादिलो चिउरा खाजा।",
            category = "Khaja",
            prepTimeMinutes = 15,
            cookTimeMinutes = 10,
            servings = 2,
            safety = SafetyStatus.SAFE,
            ingredients = listOf(
                "1 cup Medium Chiura (Beaten Rice)",
                "1/2 cup Pre-boiled & leached cauliflower florets",
                "1/4 cup Pre-boiled grated carrot",
                "1 tsp Sunflower oil",
                "1/2 tsp Mustard seeds or Cumin",
                "1 Green chili, deseeded and finely chopped",
                "Few drops of lemon juice"
            ),
            instructionsEn = listOf(
                "Rinse chiura in cold water for 10 seconds, drain water immediately through a strainer.",
                "Pre-boil cauliflower and carrots in water for 5 minutes and drain water completely.",
                "Heat 1 teaspoon oil, temper mustard seeds and green chili.",
                "Add the leached vegetables and saute for 2 minutes.",
                "Add the drained softened chiura, toss gently on medium-low heat for 3 minutes.",
                "Turn off heat, squeeze fresh lemon juice and serve warm."
            ),
            instructionsNe = listOf(
                "चिउरालाई १० सेकेन्ड पानीमा पखालेर तुरुन्तै छान्नुहोस्।",
                "काउली र गाजरलाई ५ मिनेट उमाली पानी पूरै फाल्नुहोस्।",
                "कराहीमा तेल तताएर तोरी वा जीरा र हरियो खुर्सानी फुराउनुहोस्।",
                "उसिनेको तरकारी राखेर २ मिनेट भुट्नुहोस्।",
                "भिजाएको चिउरा मिसाएर हल्का हातले ३ मिनेट चलाउनुहोस् र कागतीको रस हाल्नुहोस्।"
            ),
            clinicalNotesEn = "Pre-leaching vegetables reduces potassium by over 50%. Chiura provides sustained kidney-friendly energy.",
            clinicalNotesNe = "पहिले नै तरकारी उमालेर पानी फाल्दा पोटासियम ५०% घट्छ।",
            nutrientsPerServing = NutrientProfile(calories = 140.0, protein = 3.5, potassium = 110.0, phosphorus = 55.0, sodium = 15.0, fluid = 30.0)
        ),
        Recipe(
            id = "low-sodium-cucumber-achar",
            nameEn = "Fresh Low-Sodium Cucumber Lemon Achar",
            nameNe = "काँक्रोको ताजा कागती-जीरा अचार (कम नुन)",
            descriptionEn = "Nepali dining is incomplete without achar! This recipe provides traditional flavor with zero dangerous fermented salt.",
            descriptionNe = "नेपाली खानामा अचारको तिर्सना मेटाउने नुन बिनाको ताजा र सुरक्षित अचार।",
            category = "Achar",
            prepTimeMinutes = 10,
            cookTimeMinutes = 0,
            servings = 3,
            safety = SafetyStatus.SAFE,
            ingredients = listOf(
                "1 large Fresh Cucumber, peeled, seeded, and finely sliced",
                "1 tbsp Fresh Lemon or Lime juice",
                "1/2 tsp Roasted Cumin seed powder (Bhutt-eko Jeera)",
                "2 tbsp Fresh mint leaves (Pudina), chopped",
                "1/8 tsp Black pepper powder",
                "No added table salt"
            ),
            instructionsEn = listOf(
                "Peel cucumber, cut in half lengthwise, and scoop out center seeds.",
                "Slice cucumber into thin half-moons.",
                "In a bowl, toss cucumber slices with fresh lemon juice.",
                "Add roasted cumin powder, freshly chopped mint, and black pepper.",
                "Mix well and let sit for 5 minutes before serving alongside your meal."
            ),
            instructionsNe = listOf(
                "काँक्रोको बोक्रा ताछी भित्री दाना चम्चाले झिकेर फाल्नुहोस्।",
                "काँक्रोलाई पातलो टुक्रामा काट्नुहोस्।",
                "कचौरामा काँक्रो र ताजा कागतीको रस मिसाउनुहोस्।",
                "भुटेको जीराको धुलो, मरिचको धुलो र ताजा पुदिना मिसाउनुहोस्।",
                "राम्ररी चलाएर ५ मिनेटपछि खानासँग पस्कनुहोस्।"
            ),
            clinicalNotesEn = "Replaces pickled achars that contain 1000+ mg sodium. Cucumber and lemon give high flavor without fluid retention.",
            clinicalNotesNe = "बजारिया अचारको १००० मिग्रा नुनको सट्टा यसले शून्य नुनमा परम्परागत स्वाद दिन्छ।",
            nutrientsPerServing = NutrientProfile(calories = 15.0, protein = 0.5, potassium = 70.0, phosphorus = 12.0, sodium = 4.0, fluid = 45.0)
        )
    )
}
