package com.example.khanasathi.data

import com.example.khanasathi.model.ClinicalTip

object KnowledgeDataSource {
    val tips: List<ClinicalTip> = listOf(
        ClinicalTip(
            id = "tarkari-leaching",
            titleEn = "How to Leach Vegetables (Reduce Potassium by 60%)",
            titleNe = "तरकारीबाट पोटासियम घटाउने विधि (लीचिङ)",
            summaryEn = "Crucial technique for potatoes, cauliflower, cabbage, and spinach to prevent dangerous potassium buildup.",
            summaryNe = "आलु, काउली, बन्दा र सागपातबाट अत्यधिक पोटासियम हटाउन यो विधि अनिवार्य छ।",
            stepsEn = listOf(
                "Step 1: Peel and cut vegetables into small, thin slices or cubes to expose more surface area.",
                "Step 2: Place in a large pot with at least 5 times the volume of water.",
                "Step 3: Boil vigorously for 5 to 8 minutes, then completely discard the water.",
                "Step 4: Repeat boiling in fresh water if preparing high-potassium vegetables like potatoes.",
                "Step 5: Cook with minimal oil, cumin, turmeric, and strict low salt."
            ),
            stepsNe = listOf(
                "चरण १: तरकारीको बोक्रा ताछेर साना-साना पातलो टुक्रा बनाउनुहोस्।",
                "चरण २: ठूलो भाँडोमा तरकारी भन्दा ५ गुणा धेरै पानी राख्नुहोस्।",
                "चरण ३: ५ देखि ८ मिनेट मज्जाले उमाल्नुहोस् र त्यो पानी पूरै फाल्नुहोस्।",
                "चरण ४: आलु जस्ता बढी पोटासियम भएका तरकारीलाई दोस्रो पटक पनि नयाँ पानीमा उमाल्नुहोस्।",
                "चरण ५: थोरै तेल, जीरा, बेसार र एकदमै कम नुनमा पकाउनुहोस्।"
            ),
            iconEmoji = "🥬",
            tag = "Tarkari"
        ),
        ClinicalTip(
            id = "dal-preparation",
            titleEn = "Safe Dal Preparation for Dialysis Patients",
            titleNe = "मिर्गौला बिरामीका लागि दाल पकाउने सही तरिका",
            summaryEn = "Lentils are rich in protein but contain potassium and phosphorus. Follow this protocol.",
            summaryNe = "दालमा प्रोटिनका साथै पोटासियम र फोस्फोरस पनि हुने हुँदा विशेष तरिकाले पकाउनु पर्छ।",
            stepsEn = listOf(
                "Choice: Choose yellow Moong or pink Masoor dal over heavy Black (Urad) or Kwati.",
                "Soaking: Soak lentils in warm water for at least 4 to 6 hours before cooking.",
                "Discard Water: Discard the soaking water and rinse thoroughly twice.",
                "Cooking: Boil with plenty of water and skim off the thick white froth from the top.",
                "Consistency: Prepare thin (patalo dal) rather than thick gravy, and avoid drinking large bowls of dal broth."
            ),
            stepsNe = listOf(
                "छनोट: कालो दाल वा क्वाँटीको सट्टा पहेँलो मूँग वा मुसुरो दाल रोज्नुहोस्।",
                "भिजाउने: पकाउनु भन्दा ४-६ घण्टा पहिले मनतातो पानीमा भिजाउनुहोस्।",
                "पानी फाल्ने: भिजाएको पानी फालेर दुई पटक सफा पानीले पखाल्नुहोस्।",
                "पकाउने: प्रशस्त पानीमा उमाल्दा माथि आउने सेतो फिँजलाई चम्चाले झिकेर फाल्नुहोस्।",
                "बाक्लोपन: दाललाई बाक्लो नबनाई पातलो सुप बनाउनुहोस् र सीमित मात्रामा मात्र पिउनुहोस्।"
            ),
            iconEmoji = "🍲",
            tag = "Dal"
        ),
        ClinicalTip(
            id = "achar-warning",
            titleEn = "Achar (Pickle) & Sodium Safety",
            titleNe = "अचार र नुनको खतरा तथा सुरक्षित विकल्प",
            summaryEn = "Traditional fermented pickles are the #1 hidden cause of fluid overload and heart failure in Nepali dialysis patients.",
            summaryNe = "परम्परागत अचार र सिन्की नेपाली बिरामीमा पानी जम्ने र मुटु फेल हुने मुख्य कारण हुन्।",
            stepsEn = listOf(
                "Avoid Fermented Pickles: Mula ko achar, gundruk, and bottled pickles have lethal salt loads.",
                "Avoid Til Achar: Sesame seeds (til) have massive amounts of phosphorus.",
                "Safe Nepali Alternative: Fresh cucumber slices tossed with fresh lemon juice and roasted cumin powder (Zero added salt).",
                "Flavor without Salt: Use fresh mint (pudina), coriander (dhaniya), and lemon to add tanginess without sodium."
            ),
            stepsNe = listOf(
                "पुराना अचार नखानुहोस्: मूलाको अचार, गुन्द्रुक र बजारका अचारमा अत्यधिक नुन हुन्छ।",
                "तिलको अचार त्याग्नुहोस्: तिलमा फोस्फोरस निकै बढी हुने भएकाले मिर्गौलालाई हानि गर्छ।",
                "सुरक्षित विकल्प: ताजा काँक्रोको टुक्रामा कागतीको रस र भुटेको जीराको धुलो छर्केर खानुहोस्।",
                "स्वाद बढाउने तरिका: नुनको सट्टा पुदिना, हरियो धनियाँ र कागती प्रयोग गर्नुहोस्।"
            ),
            iconEmoji = "🥒",
            tag = "Achar"
        ),
        ClinicalTip(
            id = "rice-grains",
            titleEn = "Rice & Grains: White Rice vs Brown Rice",
            titleNe = "भात र अन्न: सेतो चामल नै किन सुरक्षित?",
            summaryEn = "Contrary to general diabetes advice, dialysis patients should prefer boiled white rice over brown rice.",
            summaryNe = "सामान्य मानिसका लागि खैरो चामल राम्रो भए तापनि डायलाइसिसमा सेतो चामल नै उत्तम हुन्छ।",
            stepsEn = listOf(
                "Why White Rice: Brown rice and whole grains retain the outer husk which is packed with potassium and phosphorus.",
                "White Rice Advantage: Steamed polished white rice is low in potassium and gentle on the kidneys.",
                "Chiura (Flattened Rice): Excellent low-electrolyte traditional Nepali breakfast option.",
                "Dhindo: Cornmeal dhindo is safe if cooked plain without salt or added butter/ghee."
            ),
            stepsNe = listOf(
                "सेतो चामल किन उत्तम: खैरो चामलको बाहिरी बोक्रामा धेरै पोटासियम र फोस्फोरस हुन्छ।",
                "फाइदा: उसिनेको सेतो भातमा पोटासियम कम हुन्छ र मिर्गौलालाई भार पर्दैन।",
                "चिउरा: बिहानको खाजाको लागि चिउरा निकै सुरक्षित र कम सोडियम भएको खाना हो।",
                "ढिँडो: मकैको ढिँडो नुन र घिउ नराखी खाँदा मिर्गौलाका लागि सुरक्षित हुन्छ।"
            ),
            iconEmoji = "🍚",
            tag = "Rice"
        ),
        ClinicalTip(
            id = "fluid-management",
            titleEn = "Strict Fluid Management Protocol (1000 ml/day)",
            titleNe = "दैनिक तरल पदार्थ व्यवस्थापन (१ लिटर सीमा)",
            summaryEn = "Excess fluid causes severe shortness of breath, swollen legs, pulmonary edema, and dialysis cramps.",
            summaryNe = "बढी पानी पिउनाले खुट्टा सुन्निने, फोक्सोमा पानी भरिने र सास फेर्न गाह्रो हुने गर्दछ।",
            stepsEn = listOf(
                "One Bottle Rule: Fill a clean 1-liter water bottle every morning. All drinks (tea, dal soup, water) must come from this bottle.",
                "Count Hidden Liquids: Dal broth, milk, tea, and juicy curries all count towards your daily fluid quota!",
                "Thirst Quenching Tip: Suck on small ice cubes or lemon wedges rather than gulping full glasses of water.",
                "Dry Mouth Relief: Rinse mouth with cold water and spit it out without swallowing."
            ),
            stepsNe = listOf(
                "एउटा बोतलको नियम: बिहान १ लिटरको बोतलमा पानी भर्नुहोस्। दिनभर चिया, पानी सबै यहीँबाट नाप्नुहोस्।",
                "झोल खाना गन्ने: दालको झोल, दूध, चिया सबै तरल सीमाभित्रै पर्छन्।",
                "तिर्खा मेट्ने तरिका: एकैपटक धेरै पानी पिउनुको सट्टा बरफको सानो टुक्रा वा कागती मुखमा राख्नुहोस्।",
                "मुख ओभानो भएमा: चिसो पानीले मुख कुल्ला गरेर थुक्नुहोस्, पानी ननिल्नुहोस्।"
            ),
            iconEmoji = "💧",
            tag = "Fluid"
        )
    )
}
