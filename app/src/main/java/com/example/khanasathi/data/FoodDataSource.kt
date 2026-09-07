package com.example.khanasathi.data

import com.example.khanasathi.model.FoodItem
import com.example.khanasathi.model.NutrientProfile
import com.example.khanasathi.model.SafetyStatus

object FoodDataSource {
    val foods: List<FoodItem> = listOf(
        // === MAIN FOODS & GRAINS (भात र अन्न) ===
        FoodItem(
            id = "rice-steamed-white",
            nameEn = "Steamed White Rice",
            nameNe = "उसिनेको सेतो चामल (भात)",
            category = "rice",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 130.0, protein = 2.7, potassium = 35.0, phosphorus = 43.0, sodium = 1.0, fluid = 68.0),
            servingAmount = 1.0,
            servingUnit = "cup cooked",
            preparationNotesEn = "Cook without salt. Preferred over brown rice for low potassium and phosphorus.",
            preparationNotesNe = "नुन नराखी पकाउनुहोस्। पोटासियम र फोस्फोरस कम हुने भएकाले सेतो चामल उत्तम मानिन्छ।"
        ),
        FoodItem(
            id = "chiura-beaten-rice",
            nameEn = "Chiura (Flattened Rice)",
            nameNe = "चिउरा",
            category = "rice",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 180.0, protein = 3.2, potassium = 45.0, phosphorus = 50.0, sodium = 2.0, fluid = 15.0),
            servingAmount = 0.5,
            servingUnit = "cup dry",
            preparationNotesEn = "Excellent light snack. Can be eaten dry or soaked. Very low sodium and potassium.",
            preparationNotesNe = "हल्का खाजाका लागि उपयुक्त। पोटासियम र सोडियम निकै कम हुन्छ।"
        ),
        FoodItem(
            id = "dhindo-cornmeal",
            nameEn = "Dhindo (Cornmeal)",
            nameNe = "मकैको ढिँडो",
            category = "rice",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 140.0, protein = 3.8, potassium = 75.0, phosphorus = 55.0, sodium = 3.0, fluid = 80.0),
            servingAmount = 1.0,
            servingUnit = "cup",
            preparationNotesEn = "Cook traditional dhindo without added salt or ghee.",
            preparationNotesNe = "परम्परागत ढिँडो बनाउँदा नुन वा घिउ नराखी पकाउनुहोस्।"
        ),
        FoodItem(
            id = "wheat-roti",
            nameEn = "Wheat Roti",
            nameNe = "गहुँको सादा रोटी",
            category = "rice",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 120.0, protein = 3.5, potassium = 90.0, phosphorus = 80.0, sodium = 2.0, fluid = 25.0),
            servingAmount = 1.0,
            servingUnit = "medium roti",
            preparationNotesEn = "Knead dough with plain water without salt. Limit to 2 rotis per meal.",
            preparationNotesNe = "नुन नहाली पिठो मुछेर बनाउनुहोस्। एक पटकमा १-२ वटा मात्र खानुहोस्।"
        ),
        FoodItem(
            id = "brown-rice",
            nameEn = "Brown Rice",
            nameNe = "खैरो चामल",
            category = "rice",
            safety = SafetyStatus.CAUTION,
            nutrients = NutrientProfile(calories = 150.0, protein = 3.5, potassium = 150.0, phosphorus = 160.0, sodium = 5.0, fluid = 60.0),
            servingAmount = 1.0,
            servingUnit = "cup cooked",
            preparationNotesEn = "High in phosphorus and potassium. White rice is preferred for dialysis patients.",
            preparationNotesNe = "यसमा पोटासियम र फोस्फोरस बढी हुन्छ। डायलाइसिसमा सेतो चामल नै रोज्नुहोस्।"
        ),
        FoodItem(
            id = "sel-roti",
            nameEn = "Sel Roti",
            nameNe = "सेल रोटी",
            category = "rice",
            safety = SafetyStatus.CAUTION,
            nutrients = NutrientProfile(calories = 220.0, protein = 2.5, potassium = 60.0, phosphorus = 65.0, sodium = 10.0, fluid = 10.0),
            servingAmount = 1.0,
            servingUnit = "medium piece",
            preparationNotesEn = "Deep fried and calorie dense. Eat occasionally in small amounts.",
            preparationNotesNe = "तेलमा तारेको हुनाले कहिलेकाहीँ थोरै मात्रामा मात्र चाख्नुहोस्।"
        ),

        // === VEGETABLES & TARKARI (तरकारी) ===
        FoodItem(
            id = "lauka-bottle-gourd",
            nameEn = "Bottle Gourd (Lauka)",
            nameNe = "लौकाको तरकारी",
            category = "vegetables",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 25.0, protein = 0.9, potassium = 120.0, phosphorus = 18.0, sodium = 4.0, fluid = 92.0),
            servingAmount = 1.0,
            servingUnit = "cup cooked",
            preparationNotesEn = "Gold standard kidney vegetable! Low potassium and gentle on digestive system.",
            preparationNotesNe = "मिर्गौला बिरामीका लागि सर्वोत्तम तरकारी! पोटासियम निकै कम हुन्छ।"
        ),
        FoodItem(
            id = "ghirola-sponge-gourd",
            nameEn = "Sponge Gourd (Ghirola)",
            nameNe = "घिरौंला",
            category = "vegetables",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 20.0, protein = 0.8, potassium = 110.0, phosphorus = 16.0, sodium = 3.0, fluid = 94.0),
            servingAmount = 1.0,
            servingUnit = "cup cooked",
            preparationNotesEn = "Very safe and low in potassium. Steam or lightly saute with cumin and turmeric.",
            preparationNotesNe = "पोटासियम निकै कम हुने सुरक्षित तरकारी। जीरा र बेसारमा हल्का पकाउनुहोस्।"
        ),
        FoodItem(
            id = "parwal-pointed-gourd",
            nameEn = "Pointed Gourd (Parwal)",
            nameNe = "परवर",
            category = "vegetables",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 30.0, protein = 1.2, potassium = 135.0, phosphorus = 22.0, sodium = 4.0, fluid = 88.0),
            servingAmount = 1.0,
            servingUnit = "cup cooked",
            preparationNotesEn = "Remove hard seeds if desired. Great low-potassium staple.",
            preparationNotesNe = "कम पोटासियम भएको राम्रो तरकारी।"
        ),
        FoodItem(
            id = "cauliflower-leached",
            nameEn = "Cauliflower (Kauli - Leached)",
            nameNe = "काउली (पानीमा उमालेर फालिएको)",
            category = "vegetables",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 35.0, protein = 2.0, potassium = 140.0, phosphorus = 35.0, sodium = 15.0, fluid = 85.0),
            servingAmount = 1.0,
            servingUnit = "cup cooked",
            preparationNotesEn = "Cut into small florets, boil in abundant water for 5 min, drain completely before cooking.",
            preparationNotesNe = "टुक्रा पारेर प्रशस्त पानीमा ५ मिनेट उमाली पानी पूरै फालेर मात्र तरकारी बनाउनुहोस्।"
        ),
        FoodItem(
            id = "cabbage-banda",
            nameEn = "Cabbage (Banda)",
            nameNe = "बन्दागोभी (उमालेको)",
            category = "vegetables",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 28.0, protein = 1.4, potassium = 125.0, phosphorus = 24.0, sodium = 12.0, fluid = 90.0),
            servingAmount = 1.0,
            servingUnit = "cup cooked",
            preparationNotesEn = "Shred and boil in water, discard water to reduce potassium by 50%.",
            preparationNotesNe = "मसिनो काटेर उमाली पानी फ्याँक्दा पोटासियम ५०% घट्छ।"
        ),
        FoodItem(
            id = "potato-leached",
            nameEn = "Potato (Alu - Leached)",
            nameNe = "आलु (उमालेर पानी फालिएको)",
            category = "vegetables",
            safety = SafetyStatus.CAUTION,
            nutrients = NutrientProfile(calories = 95.0, protein = 2.1, potassium = 220.0, phosphorus = 45.0, sodium = 6.0, fluid = 70.0),
            servingAmount = 0.5,
            servingUnit = "cup cubed",
            preparationNotesEn = "MANDATORY: Peel, dice into small cubes, boil in lots of water for 10 min, drain water twice!",
            preparationNotesNe = "अनिवार्य: बोक्रा ताछेर साना टुक्रा पारी प्रशस्त पानीमा उमाल्नुहोस् र पानी दुई पटक फाल्नुहोस्!"
        ),
        FoodItem(
            id = "rayo-saag",
            nameEn = "Mustard Greens (Rayo Saag)",
            nameNe = "रायोको साग",
            category = "vegetables",
            safety = SafetyStatus.CAUTION,
            nutrients = NutrientProfile(calories = 30.0, protein = 2.5, potassium = 280.0, phosphorus = 48.0, sodium = 18.0, fluid = 88.0),
            servingAmount = 0.5,
            servingUnit = "cup cooked",
            preparationNotesEn = "High potassium. Do not eat raw. Blanch in boiling water and drain water before seasoning.",
            preparationNotesNe = "पोटासियम धेरै हुन्छ। उमालेर पानी फालेर मात्र थोरै मात्रामा खानुहोस्।"
        ),
        FoodItem(
            id = "raw-tomato",
            nameEn = "Raw Tomato (Golbheda)",
            nameNe = "काँचो गोलभेँडा",
            category = "vegetables",
            safety = SafetyStatus.AVOID,
            nutrients = NutrientProfile(calories = 22.0, protein = 1.0, potassium = 390.0, phosphorus = 30.0, sodium = 10.0, fluid = 94.0),
            servingAmount = 1.0,
            servingUnit = "medium tomato",
            preparationNotesEn = "Extremely high potassium! Do not eat raw or use in thick gravies/soups.",
            preparationNotesNe = "पोटासियम निकै उच्च हुन्छ! काँचो गोलभेँडा वा बाक्लो सुप बिल्कुल नखानुहोस्।"
        ),

        // === LENTILS & DALS (दाल) ===
        FoodItem(
            id = "moong-dal-soaked",
            nameEn = "Yellow Moong Dal (Soaked & Diluted)",
            nameNe = "मूँगको दाल (पातलो र भिजाएको)",
            category = "lentils",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 110.0, protein = 7.0, potassium = 160.0, phosphorus = 95.0, sodium = 5.0, fluid = 80.0),
            servingAmount = 0.5,
            servingUnit = "cup cooked",
            preparationNotesEn = "Best dal for kidney patients. Soak 4 hours, discard soak water, boil thin and skim white froth.",
            preparationNotesNe = "मिर्गौलाका लागि सबैभन्दा उत्तम दाल। ४ घण्टा भिजाएर पानी फाली पातलो बनाएर खानुहोस्।"
        ),
        FoodItem(
            id = "masoor-dal",
            nameEn = "Red Masoor Dal",
            nameNe = "रातो मुसुरो दाल",
            category = "lentils",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 115.0, protein = 7.5, potassium = 180.0, phosphorus = 110.0, sodium = 4.0, fluid = 78.0),
            servingAmount = 0.5,
            servingUnit = "cup cooked",
            preparationNotesEn = "Wash thoroughly, cook thin with cumin and turmeric. Do not add salt during boiling.",
            preparationNotesNe = "राम्ररी धोएर पातलो दाल बनाउनुहोस्। पोटासियम घटाउन पातलो सुप मात्र पिउनुहोस्।"
        ),
        FoodItem(
            id = "chana-dal",
            nameEn = "Chana Dal (Bengal Gram)",
            nameNe = "चनाको दाल",
            category = "lentils",
            safety = SafetyStatus.CAUTION,
            nutrients = NutrientProfile(calories = 140.0, protein = 8.5, potassium = 240.0, phosphorus = 140.0, sodium = 8.0, fluid = 70.0),
            servingAmount = 0.5,
            servingUnit = "cup cooked",
            preparationNotesEn = "Higher in potassium and phosphorus. Soak overnight and limit portion size.",
            preparationNotesNe = "पोटासियम र फोस्फोरस केही बढी हुन्छ। रातभर भिजाएर थोरै मात्रामा मात्र लिनुहोस्।"
        ),
        FoodItem(
            id = "kalo-dal-urad",
            nameEn = "Black Lentils (Kalo Dal / Urad)",
            nameNe = "कालो दाल (मासको दाल)",
            category = "lentils",
            safety = SafetyStatus.AVOID,
            nutrients = NutrientProfile(calories = 160.0, protein = 11.0, potassium = 380.0, phosphorus = 210.0, sodium = 10.0, fluid = 65.0),
            servingAmount = 0.5,
            servingUnit = "cup cooked",
            preparationNotesEn = "Very high in phosphorus and uric acid precursors. Avoid on dialysis.",
            preparationNotesNe = "फोस्फोरस र युरिक एसिड निकै बढी हुने भएकाले डायलाइसिसमा नखानुहोस्।"
        ),
        FoodItem(
            id = "kwati-mixed-beans",
            nameEn = "Kwati (Mixed Sprouted Beans)",
            nameNe = "क्वाँटी (गेडागुडीको झोल)",
            category = "lentils",
            safety = SafetyStatus.AVOID,
            nutrients = NutrientProfile(calories = 210.0, protein = 13.0, potassium = 490.0, phosphorus = 280.0, sodium = 25.0, fluid = 75.0),
            servingAmount = 0.5,
            servingUnit = "cup",
            preparationNotesEn = "Extremely high potassium and phosphorus density. High risk for dialysis patients!",
            preparationNotesNe = "पोटासियम र फोस्फोरस एकदमै उच्च हुने हुँदा बिरामीका लागि जोखिमपूर्ण हुन्छ!"
        ),

        // === MEAT & PROTEINS (मासु र प्रोटिन) ===
        FoodItem(
            id = "egg-white-boiled",
            nameEn = "Boiled Egg White (2 whites)",
            nameNe = "उसिनेको अण्डाको सेतो भाग (२ वटा)",
            category = "meat",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 34.0, protein = 7.2, potassium = 105.0, phosphorus = 10.0, sodium = 110.0, fluid = 55.0),
            servingAmount = 2.0,
            servingUnit = "egg whites",
            preparationNotesEn = "Gold standard protein for dialysis! High biological value with near-zero phosphorus.",
            preparationNotesNe = "डायलाइसिस बिरामीका लागि अमृत समान प्रोटिन! फोस्फोरस शून्य बराबर हुन्छ।"
        ),
        FoodItem(
            id = "chicken-breast-steamed",
            nameEn = "Steamed Chicken Breast",
            nameNe = "उसिनेको कुखुराको छाती (मासु)",
            category = "meat",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 140.0, protein = 26.0, potassium = 220.0, phosphorus = 180.0, sodium = 65.0, fluid = 65.0),
            servingAmount = 85.0,
            servingUnit = "g cooked",
            preparationNotesEn = "Skinless white meat. Boil and discard cooking water to reduce phosphorus.",
            preparationNotesNe = "छाला नभएको मासु। पानीमा उमालेर झोल फाल्दा फोस्फोरस उल्लेख्य रूपमा घट्छ।"
        ),
        FoodItem(
            id = "freshwater-fish",
            nameEn = "Freshwater Fish (Rahu/Naini)",
            nameNe = "ताजा माछा (उसिनेको/हल्का पकाएको)",
            category = "meat",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 120.0, protein = 20.0, potassium = 240.0, phosphorus = 175.0, sodium = 60.0, fluid = 70.0),
            servingAmount = 85.0,
            servingUnit = "g cooked",
            preparationNotesEn = "Prefer freshwater over sea fish. Do not fry in heavy batter. Steam with ginger and garlic.",
            preparationNotesNe = "नदी वा पोखरीको ताजा माछा। नतारीकन अदुवा र लसुनमा उसिनेर खानुहोस्।"
        ),
        FoodItem(
            id = "whole-egg",
            nameEn = "Whole Boiled Egg",
            nameNe = "सिङ्गो अण्डा (पहेँलो भाग सहित)",
            category = "meat",
            safety = SafetyStatus.CAUTION,
            nutrients = NutrientProfile(calories = 78.0, protein = 6.3, potassium = 65.0, phosphorus = 95.0, sodium = 62.0, fluid = 38.0),
            servingAmount = 1.0,
            servingUnit = "egg",
            preparationNotesEn = "Egg yolk contains high phosphorus. Limit whole eggs to 2 per week.",
            preparationNotesNe = "पहेँलो भागमा फोस्फोरस धेरै हुन्छ। हप्तामा १-२ पटक भन्दा बढी नलिनुहोस्।"
        ),
        FoodItem(
            id = "mutton-khasi",
            nameEn = "Mutton (Khasi ko Masu)",
            nameNe = "खसीको मासु",
            category = "meat",
            safety = SafetyStatus.CAUTION,
            nutrients = NutrientProfile(calories = 210.0, protein = 22.0, potassium = 280.0, phosphorus = 210.0, sodium = 75.0, fluid = 60.0),
            servingAmount = 75.0,
            servingUnit = "g",
            preparationNotesEn = "High in purines and phosphorus. Eat lean cuts without bone broth and take phosphate binder.",
            preparationNotesNe = "बोसो र हड्डीको सुप नपिउनुहोस्। थोरै मात्र खानुहोस् र फोस्फेट बाइन्डर लिनुहोस्।"
        ),

        // === FRUITS (फलफूल) ===
        FoodItem(
            id = "apple-syau",
            nameEn = "Apple (Peeled)",
            nameNe = "स्याउ (बोक्रा ताछेको)",
            category = "fruits",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 65.0, protein = 0.3, potassium = 120.0, phosphorus = 12.0, sodium = 1.0, fluid = 85.0),
            servingAmount = 1.0,
            servingUnit = "medium apple",
            preparationNotesEn = "Kidney patient's best fruit! Low potassium and refreshing. Peel to reduce potassium further.",
            preparationNotesNe = "मिर्गौलाका लागि सबैभन्दा उत्तम फल। बोक्रा ताछेर खानुहोस्।"
        ),
        FoodItem(
            id = "papaya-mewa",
            nameEn = "Papaya (Mewa)",
            nameNe = "पाकेको मेवा",
            category = "fruits",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 55.0, protein = 0.6, potassium = 140.0, phosphorus = 14.0, sodium = 3.0, fluid = 88.0),
            servingAmount = 1.0,
            servingUnit = "cup cubed",
            preparationNotesEn = "Low potassium and supports healthy bowel movements.",
            preparationNotesNe = "पोटासियम कम भएको सुरक्षित फल। पेट सफा राख्न पनि मद्दत गर्छ।"
        ),
        FoodItem(
            id = "guava-amba",
            nameEn = "Guava (Amba)",
            nameNe = "अम्बा",
            category = "fruits",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 45.0, protein = 1.0, potassium = 150.0, phosphorus = 18.0, sodium = 2.0, fluid = 82.0),
            servingAmount = 1.0,
            servingUnit = "small guava",
            preparationNotesEn = "Eat in moderation. Remove hard central seeds.",
            preparationNotesNe = "मध्यम मात्रामा खानुहोस्। बीचको कडा दाना हटाउनु राम्रो हुन्छ।"
        ),
        FoodItem(
            id = "banana-kera",
            nameEn = "Banana (Kera)",
            nameNe = "केरा",
            category = "fruits",
            safety = SafetyStatus.AVOID,
            nutrients = NutrientProfile(calories = 105.0, protein = 1.3, potassium = 422.0, phosphorus = 26.0, sodium = 1.0, fluid = 74.0),
            servingAmount = 1.0,
            servingUnit = "medium banana",
            preparationNotesEn = "DANGER: Extremely high potassium! One banana can trigger dangerous hyperkalemia.",
            preparationNotesNe = "खतरा: पोटासियम अत्यधिक हुन्छ! एउटै केराले पनि मुटुको धड्कनमा गडबडी ल्याउन सक्छ।"
        ),
        FoodItem(
            id = "orange-suntala",
            nameEn = "Orange (Suntala)",
            nameNe = "सुन्तला / मौसम",
            category = "fruits",
            safety = SafetyStatus.AVOID,
            nutrients = NutrientProfile(calories = 65.0, protein = 1.2, potassium = 240.0, phosphorus = 18.0, sodium = 1.0, fluid = 87.0),
            servingAmount = 1.0,
            servingUnit = "medium orange",
            preparationNotesEn = "High potassium and counted as fluid. Avoid fruit juices entirely.",
            preparationNotesNe = "पोटासियम धेरै हुने भएकाले सुन्तला र यसको जुस नपिउनुहोस्।"
        ),

        // === PICKLES & ACHARS (अचार) ===
        FoodItem(
            id = "cucumber-lemon-achar",
            nameEn = "Cucumber Lemon Achar (Low Sodium)",
            nameNe = "काँक्रोको ताजा अचार (कम नुन)",
            category = "pickles",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 25.0, protein = 0.8, potassium = 95.0, phosphorus = 15.0, sodium = 30.0, fluid = 90.0),
            servingAmount = 2.0,
            servingUnit = "tablespoons",
            preparationNotesEn = "Safe Nepali achar substitute: cucumber, lemon juice, roasted cumin powder, pinch of salt.",
            preparationNotesNe = "सुरक्षित अचार: काँक्रो, कागतीको रस, भुटेको जीराको धुलो र एकदमै थोरै नुन।"
        ),
        FoodItem(
            id = "mula-fermented-achar",
            nameEn = "Fermented Radish Pickle (Mula ko Achar)",
            nameNe = "मूलाको सिन्की / परम्परागत अचार",
            category = "pickles",
            safety = SafetyStatus.AVOID,
            nutrients = NutrientProfile(calories = 40.0, protein = 1.0, potassium = 320.0, phosphorus = 35.0, sodium = 850.0, fluid = 40.0),
            servingAmount = 1.0,
            servingUnit = "tablespoon",
            preparationNotesEn = "Extreme sodium load! Causes severe fluid retention, thirst, and blood pressure spikes.",
            preparationNotesNe = "अत्यधिक नुन र पोटासियम हुन्छ! यसले तिर्खा बढाउने र रक्तचाप बढाउने गर्छ।"
        ),
        FoodItem(
            id = "til-ko-achar",
            nameEn = "Sesame Pickle (Til ko Achar)",
            nameNe = "तिलको अचार",
            category = "pickles",
            safety = SafetyStatus.AVOID,
            nutrients = NutrientProfile(calories = 90.0, protein = 3.0, potassium = 180.0, phosphorus = 260.0, sodium = 350.0, fluid = 20.0),
            servingAmount = 1.0,
            servingUnit = "tablespoon",
            preparationNotesEn = "Sesame seeds have dangerous concentrations of phosphorus. Avoid completely.",
            preparationNotesNe = "तिलमा फोस्फोरस अत्यधिक मात्रामा पाइने भएकाले बिल्कुल नखानुहोस्।"
        ),

        // === DAIRY (दूध र दुग्ध पदार्थ) ===
        FoodItem(
            id = "skim-milk",
            nameEn = "Diluted Low-Fat Milk",
            nameNe = "पातलो गाईको दूध",
            category = "dairy",
            safety = SafetyStatus.CAUTION,
            nutrients = NutrientProfile(calories = 45.0, protein = 3.8, potassium = 160.0, phosphorus = 110.0, sodium = 50.0, fluid = 110.0),
            servingAmount = 0.5,
            servingUnit = "cup (120 ml)",
            preparationNotesEn = "Limit dairy to half cup daily due to high phosphorus. Remember to count toward fluid!",
            preparationNotesNe = "फोस्फोरस धेरै हुने हुँदा आधा कप भन्दा बढी नपिउनुहोस्। तरल पदार्थमा गणना गर्नुहोस्।"
        ),
        FoodItem(
            id = "paneer-fresh",
            nameEn = "Fresh Paneer",
            nameNe = "ताजा पनीर",
            category = "dairy",
            safety = SafetyStatus.CAUTION,
            nutrients = NutrientProfile(calories = 95.0, protein = 6.5, potassium = 40.0, phosphorus = 140.0, sodium = 20.0, fluid = 25.0),
            servingAmount = 30.0,
            servingUnit = "g (2 small cubes)",
            preparationNotesEn = "High in phosphorus. Boil in water before adding to curries and take phosphate binders.",
            preparationNotesNe = "फोस्फोरस उच्च हुन्छ। उमालेर पानी फाली थोरै मात्रामा मात्र खानुहोस्।"
        ),

        // === DRINKS & BEVERAGES (पेय पदार्थ) ===
        FoodItem(
            id = "plain-boiled-water",
            nameEn = "Boiled & Cooled Water",
            nameNe = "उमालेर चिसो पारेको पानी",
            category = "drinks",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 0.0, protein = 0.0, potassium = 0.0, phosphorus = 0.0, sodium = 0.0, fluid = 200.0),
            servingAmount = 1.0,
            servingUnit = "cup (200 ml)",
            preparationNotesEn = "Keep a dedicated 1-liter marked water bottle to strictly monitor your daily fluid limit.",
            preparationNotesNe = "दैनिक तरल सीमा (१ लिटर) ट्र्याक गर्न छुट्टै १ लिटरको बोतल राख्नुहोस्।"
        ),
        FoodItem(
            id = "black-tea-lemon",
            nameEn = "Black Tea with Lemon",
            nameNe = "कालो चिया (कागती सहित)",
            category = "drinks",
            safety = SafetyStatus.SAFE,
            nutrients = NutrientProfile(calories = 5.0, protein = 0.1, potassium = 25.0, phosphorus = 5.0, sodium = 2.0, fluid = 150.0),
            servingAmount = 1.0,
            servingUnit = "cup (150 ml)",
            preparationNotesEn = "Much safer than milk tea. Count entire cup toward your daily fluid allowance.",
            preparationNotesNe = "दूध चिया भन्दा निकै सुरक्षित। दैनिक तरल सीमामा गणना गर्नुहोस्।"
        ),
        FoodItem(
            id = "coconut-water",
            nameEn = "Coconut Water (Nariwal Paani)",
            nameNe = "नारिवलको पानी",
            category = "drinks",
            safety = SafetyStatus.AVOID,
            nutrients = NutrientProfile(calories = 45.0, protein = 1.7, potassium = 600.0, phosphorus = 20.0, sodium = 105.0, fluid = 240.0),
            servingAmount = 1.0,
            servingUnit = "glass (240 ml)",
            preparationNotesEn = "LETHAL RISK: Coconut water contains fatal concentrations of potassium for kidney patients!",
            preparationNotesNe = "अत्यन्त घातक: यसमा पोटासियम धेरै उच्च हुन्छ, मिर्गौला बिरामीले झुक्किएर पनि नपिउनुहोस्!"
        )
    )

    fun getByCategory(categoryKey: String): List<FoodItem> {
        return foods.filter { it.category.equals(categoryKey, ignoreCase = true) }
    }

    fun search(query: String, category: String? = null, safety: SafetyStatus? = null): List<FoodItem> {
        return foods.filter { item ->
            val matchesQuery = query.isBlank() ||
                    item.nameEn.contains(query, ignoreCase = true) ||
                    item.nameNe.contains(query, ignoreCase = true) ||
                    item.preparationNotesEn.contains(query, ignoreCase = true) ||
                    item.preparationNotesNe.contains(query, ignoreCase = true)

            val matchesCategory = category == null || category == "all" || item.category.equals(category, ignoreCase = true)
            val matchesSafety = safety == null || item.safety == safety

            matchesQuery && matchesCategory && matchesSafety
        }
    }
}
