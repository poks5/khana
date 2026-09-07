package com.example.khanasathi.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableDoubleStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.khanasathi.db.LoggedFoodEntity
import com.example.khanasathi.model.FoodItem
import com.example.khanasathi.model.Language
import com.example.khanasathi.model.NutrientProfile
import com.example.khanasathi.model.SafetyStatus
import com.example.khanasathi.ui.components.NutrientChip
import com.example.khanasathi.ui.components.SafetyBadge
import com.example.khanasathi.ui.theme.MedicalAvoid
import com.example.khanasathi.ui.theme.MedicalCaution
import com.example.khanasathi.ui.theme.MedicalSafe
import com.example.khanasathi.ui.theme.PurpleLight
import com.example.khanasathi.ui.theme.PurplePrimary

@Composable
fun FoodTrackerScreen(
    language: Language,
    foods: List<FoodItem>,
    searchQuery: String,
    onSearchQueryChange: (String) -> Unit,
    selectedCategory: String,
    onSelectCategory: (String) -> Unit,
    selectedSafety: SafetyStatus?,
    onSelectSafety: (SafetyStatus?) -> Unit,
    loggedFoods: List<LoggedFoodEntity>,
    todayNutrients: NutrientProfile,
    onLogFood: (food: FoodItem, meal: String, multiplier: Double) -> Unit,
    onDeleteLog: (LoggedFoodEntity) -> Unit,
    onClearLogs: () -> Unit,
    modifier: Modifier = Modifier
) {
    var activeSubTab by remember { mutableIntStateOf(0) } // 0 = Database, 1 = Daily Log
    var foodToLog by remember { mutableStateOf<FoodItem?>(null) }

    Column(modifier = modifier.fillMaxSize()) {
        TabRow(
            selectedTabIndex = activeSubTab,
            containerColor = MaterialTheme.colorScheme.surface,
            contentColor = PurplePrimary
        ) {
            Tab(
                selected = activeSubTab == 0,
                onClick = { activeSubTab = 0 },
                text = {
                    Text(
                        text = if (language == Language.NE) "🔍 खाना खोज्नुहोस्" else "🔍 Food Database",
                        fontWeight = if (activeSubTab == 0) FontWeight.Bold else FontWeight.Normal
                    )
                },
                modifier = Modifier.testTag("tab_food_database")
            )
            Tab(
                selected = activeSubTab == 1,
                onClick = { activeSubTab = 1 },
                text = {
                    Text(
                        text = if (language == Language.NE) "📝 आजको डायरी (${loggedFoods.size})" else "📝 Today's Log (${loggedFoods.size})",
                        fontWeight = if (activeSubTab == 1) FontWeight.Bold else FontWeight.Normal
                    )
                },
                modifier = Modifier.testTag("tab_today_log")
            )
        }

        if (activeSubTab == 0) {
            // Food Database Tab
            FoodDatabaseView(
                language = language,
                foods = foods,
                searchQuery = searchQuery,
                onSearchQueryChange = onSearchQueryChange,
                selectedCategory = selectedCategory,
                onSelectCategory = onSelectCategory,
                selectedSafety = selectedSafety,
                onSelectSafety = onSelectSafety,
                onInitiateLog = { foodToLog = it }
            )
        } else {
            // Today's Log Tab
            TodayLogView(
                language = language,
                loggedFoods = loggedFoods,
                todayNutrients = todayNutrients,
                onDeleteLog = onDeleteLog,
                onClearLogs = onClearLogs
            )
        }
    }

    // Log Food Dialog
    foodToLog?.let { food ->
        LogFoodDialog(
            food = food,
            language = language,
            onDismiss = { foodToLog = null },
            onConfirm = { meal, multiplier ->
                onLogFood(food, meal, multiplier)
                foodToLog = null
            }
        )
    }
}

@Composable
private fun FoodDatabaseView(
    language: Language,
    foods: List<FoodItem>,
    searchQuery: String,
    onSearchQueryChange: (String) -> Unit,
    selectedCategory: String,
    onSelectCategory: (String) -> Unit,
    selectedSafety: SafetyStatus?,
    onSelectSafety: (SafetyStatus?) -> Unit,
    onInitiateLog: (FoodItem) -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(10.dp))
            OutlinedTextField(
                value = searchQuery,
                onValueChange = onSearchQueryChange,
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("food_search_bar"),
                placeholder = {
                    Text(
                        text = if (language == Language.NE) "खाना, तरकारी वा दाल खोज्नुहोस्..." else "Search Nepali food, tarkari, dal...",
                        fontSize = 14.sp
                    )
                },
                leadingIcon = {
                    Icon(Icons.Default.Search, contentDescription = "Search", tint = PurplePrimary)
                },
                trailingIcon = {
                    if (searchQuery.isNotBlank()) {
                        IconButton(onClick = { onSearchQueryChange("") }) {
                            Icon(Icons.Default.Clear, contentDescription = "Clear")
                        }
                    }
                },
                shape = RoundedCornerShape(16.dp),
                singleLine = true
            )
        }

        // Category Filter Row
        item {
            val categories = listOf(
                "all" to if (language == Language.NE) "सबै (All)" else "All",
                "rice" to if (language == Language.NE) "भात (Rice)" else "Rice",
                "vegetables" to if (language == Language.NE) "तरकारी (Veg)" else "Vegetables",
                "lentils" to if (language == Language.NE) "दाल (Dal)" else "Lentils",
                "meat" to if (language == Language.NE) "मासु (Meat)" else "Meat",
                "fruits" to if (language == Language.NE) "फलफूल (Fruit)" else "Fruits",
                "dairy" to if (language == Language.NE) "दूध (Dairy)" else "Dairy",
                "pickles" to if (language == Language.NE) "अचार (Pickle)" else "Pickles",
                "drinks" to if (language == Language.NE) "पेय (Drinks)" else "Drinks"
            )

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                categories.forEach { (catKey, catLabel) ->
                    FilterChip(
                        selected = selectedCategory == catKey,
                        onClick = { onSelectCategory(catKey) },
                        label = { Text(catLabel, fontSize = 12.sp) },
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = PurplePrimary,
                            selectedLabelColor = Color.White
                        )
                    )
                }
            }
        }

        // Safety Status Filter Row
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                FilterChip(
                    selected = selectedSafety == null,
                    onClick = { onSelectSafety(null) },
                    label = { Text(if (language == Language.NE) "सबै" else "All Status", fontSize = 11.sp) }
                )
                FilterChip(
                    selected = selectedSafety == SafetyStatus.SAFE,
                    onClick = { onSelectSafety(if (selectedSafety == SafetyStatus.SAFE) null else SafetyStatus.SAFE) },
                    label = { Text(if (language == Language.NE) "सुरक्षित" else "Safe", fontSize = 11.sp) },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = MedicalSafe,
                        selectedLabelColor = Color.White
                    )
                )
                FilterChip(
                    selected = selectedSafety == SafetyStatus.CAUTION,
                    onClick = { onSelectSafety(if (selectedSafety == SafetyStatus.CAUTION) null else SafetyStatus.CAUTION) },
                    label = { Text(if (language == Language.NE) "सावधानी" else "Caution", fontSize = 11.sp) },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = MedicalCaution,
                        selectedLabelColor = Color.White
                    )
                )
                FilterChip(
                    selected = selectedSafety == SafetyStatus.AVOID,
                    onClick = { onSelectSafety(if (selectedSafety == SafetyStatus.AVOID) null else SafetyStatus.AVOID) },
                    label = { Text(if (language == Language.NE) "त्याग्नुहोस्" else "Avoid", fontSize = 11.sp) },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = MedicalAvoid,
                        selectedLabelColor = Color.White
                    )
                )
            }
        }

        if (foods.isEmpty()) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 40.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = if (language == Language.NE) "कुनै खाना भेटिएन" else "No matching foods found",
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        } else {
            items(foods, key = { it.id }) { food ->
                FoodCard(
                    food = food,
                    language = language,
                    onLogClick = { onInitiateLog(food) }
                )
            }
        }

        item {
            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}

@Composable
private fun FoodCard(
    food: FoodItem,
    language: Language,
    onLogClick: () -> Unit
) {
    var expanded by remember { mutableStateOf(false) }

    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = if (language == Language.NE) food.nameNe else food.nameEn,
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = if (language == Language.NE) food.nameEn else food.nameNe,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = "1 serving = ${food.servingAmount} ${food.servingUnit}",
                        fontSize = 11.sp,
                        color = Color(0xFF6B7280)
                    )
                }
                SafetyBadge(status = food.safety, language = language)
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Nutrient Chips
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                NutrientChip(label = "K", value = food.nutrients.potassium, unit = "mg", isWarning = food.nutrients.potassium > 250)
                NutrientChip(label = "P", value = food.nutrients.phosphorus, unit = "mg", isWarning = food.nutrients.phosphorus > 150)
                NutrientChip(label = "Na", value = food.nutrients.sodium, unit = "mg", isWarning = food.nutrients.sodium > 300)
                NutrientChip(label = "Prot", value = food.nutrients.protein, unit = "g")
            }

            // Expandable Prep & Clinical Notes
            if (food.preparationNotesEn.isNotBlank() || food.preparationNotesNe.isNotBlank()) {
                Spacer(modifier = Modifier.height(8.dp))
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { expanded = !expanded }
                        .padding(vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = if (language == Language.NE) "💡 मिर्गौला तयारी सल्लाह (Clinical Tips)" else "💡 Renal Preparation Advice",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = PurplePrimary
                    )
                    Icon(
                        imageVector = if (expanded) Icons.Default.KeyboardArrowUp else Icons.Default.KeyboardArrowDown,
                        contentDescription = "Expand",
                        tint = PurplePrimary,
                        modifier = Modifier.size(16.dp)
                    )
                }

                if (expanded) {
                    Surface(
                        color = PurpleLight.copy(alpha = 0.5f),
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = if (language == Language.NE) food.preparationNotesNe else food.preparationNotesEn,
                            fontSize = 12.sp,
                            lineHeight = 16.sp,
                            color = Color(0xFF3B0764),
                            modifier = Modifier.padding(10.dp)
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            Button(
                onClick = onLogClick,
                colors = ButtonDefaults.buttonColors(containerColor = PurplePrimary),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("log_food_button_${food.id}")
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add to log", modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = if (language == Language.NE) "खाना डायरीमा थप्नुहोस् (Log)" else "Add to Daily Log",
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 13.sp
                )
            }
        }
    }
}

@Composable
private fun LogFoodDialog(
    food: FoodItem,
    language: Language,
    onDismiss: () -> Unit,
    onConfirm: (meal: String, multiplier: Double) -> Unit
) {
    var selectedMeal by remember { mutableStateOf("Lunch") }
    var selectedMultiplier by remember { mutableDoubleStateOf(1.0) }

    val meals = listOf(
        "Breakfast" to if (language == Language.NE) "बिहानको खाजा" else "Breakfast",
        "Lunch" to if (language == Language.NE) "दिउँसोको खाना" else "Lunch",
        "Snack" to if (language == Language.NE) "खाजा" else "Snack",
        "Dinner" to if (language == Language.NE) "रातिको खाना" else "Dinner"
    )

    val portions = listOf(
        0.5 to "0.5x",
        1.0 to "1.0x",
        1.5 to "1.5x",
        2.0 to "2.0x"
    )

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Column {
                Text(
                    text = if (language == Language.NE) food.nameNe else food.nameEn,
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
                Text(
                    text = "1 serving = ${food.servingAmount} ${food.servingUnit}",
                    fontSize = 12.sp,
                    color = Color.Gray
                )
            }
        },
        text = {
            Column {
                Text(
                    text = if (language == Language.NE) "खानाको समय (Meal Type):" else "Select Meal:",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.height(6.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    meals.forEach { (mKey, mLabel) ->
                        FilterChip(
                            selected = selectedMeal == mKey,
                            onClick = { selectedMeal = mKey },
                            label = { Text(mLabel, fontSize = 11.sp) },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))

                Text(
                    text = if (language == Language.NE) "भाग / परिमाण (Portion):" else "Select Portion:",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.height(6.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    portions.forEach { (mul, label) ->
                        FilterChip(
                            selected = selectedMultiplier == mul,
                            onClick = { selectedMultiplier = mul },
                            label = { Text(label, fontSize = 12.sp) },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Calculated nutrition for this portion
                Surface(
                    color = MaterialTheme.colorScheme.surfaceVariant,
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(10.dp)) {
                        Text(
                            text = if (language == Language.NE) "यो परिमाणमा पोषक तत्व:" else "Nutrients in this portion:",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(text = "K: ${(food.nutrients.potassium * selectedMultiplier).toInt()} mg", fontSize = 11.sp)
                            Text(text = "P: ${(food.nutrients.phosphorus * selectedMultiplier).toInt()} mg", fontSize = 11.sp)
                            Text(text = "Na: ${(food.nutrients.sodium * selectedMultiplier).toInt()} mg", fontSize = 11.sp)
                            val protVal = food.nutrients.protein * selectedMultiplier
                            val protStr = if (protVal % 1.0 == 0.0) "${protVal.toInt()}" else String.format(java.util.Locale.US, "%.1f", protVal)
                            Text(text = "Prot: $protStr g", fontSize = 11.sp)
                        }
                    }
                }
            }
        },
        confirmButton = {
            Button(
                onClick = { onConfirm(selectedMeal, selectedMultiplier) },
                colors = ButtonDefaults.buttonColors(containerColor = PurplePrimary),
                modifier = Modifier.testTag("confirm_log_food_button")
            ) {
                Text(if (language == Language.NE) "दर्ता गर्नुहोस्" else "Save Entry")
            }
        },
        dismissButton = {
            TextButton(
                onClick = onDismiss,
                modifier = Modifier.testTag("cancel_log_food_button")
            ) {
                Text(if (language == Language.NE) "रद्द गर्नुहोस्" else "Cancel")
            }
        }
    )
}

@Composable
private fun TodayLogView(
    language: Language,
    loggedFoods: List<LoggedFoodEntity>,
    todayNutrients: NutrientProfile,
    onDeleteLog: (LoggedFoodEntity) -> Unit,
    onClearLogs: () -> Unit
) {
    var showClearConfirm by remember { mutableStateOf(false) }

    if (showClearConfirm) {
        AlertDialog(
            onDismissRequest = { showClearConfirm = false },
            title = {
                Text(
                    text = if (language == Language.NE) "सबै लग मेटाउने?" else "Clear All Logs?",
                    fontWeight = FontWeight.Bold
                )
            },
            text = {
                Text(
                    text = if (language == Language.NE)
                        "के तपाईं आजको सबै खाना दर्ता मेटाउन निश्चित हुनुहुन्छ?"
                    else
                        "Are you sure you want to clear all logged foods for today?"
                )
            },
            confirmButton = {
                Button(
                    onClick = {
                        showClearConfirm = false
                        onClearLogs()
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = MedicalAvoid)
                ) {
                    Text(if (language == Language.NE) "मेटाउनुहोस्" else "Clear")
                }
            },
            dismissButton = {
                TextButton(onClick = { showClearConfirm = false }) {
                    Text(if (language == Language.NE) "रद्द" else "Cancel")
                }
            }
        )
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(10.dp))
            // Totals Card
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = if (language == Language.NE) "आज खाइएको जम्मा पोषक तत्व" else "Total Nutrients Logged Today",
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                        if (loggedFoods.isNotEmpty()) {
                            OutlinedButton(
                                onClick = { showClearConfirm = true },
                                colors = ButtonDefaults.outlinedButtonColors(contentColor = MedicalAvoid)
                            ) {
                                Text(if (language == Language.NE) "सबै मेटाउनुहोस्" else "Clear All", fontSize = 11.sp)
                            }
                        }
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        NutrientStat(name = "K+", value = "${todayNutrients.potassium.toInt()} mg")
                        NutrientStat(name = "PO4", value = "${todayNutrients.phosphorus.toInt()} mg")
                        NutrientStat(name = "Sodium", value = "${todayNutrients.sodium.toInt()} mg")
                        val protStr = if (todayNutrients.protein % 1.0 == 0.0) "${todayNutrients.protein.toInt()}" else String.format(java.util.Locale.US, "%.1f", todayNutrients.protein)
                        NutrientStat(name = "Protein", value = "$protStr g")
                        NutrientStat(name = "Fluid", value = "${todayNutrients.fluid.toInt()} ml")
                    }
                }
            }
        }

        if (loggedFoods.isEmpty()) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 40.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(text = "🍽️", fontSize = 40.sp)
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = if (language == Language.NE) "आज अहिलेसम्म कुनै खाना दर्ता गरिएको छैन।" else "No food entries logged today yet.",
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Text(
                            text = if (language == Language.NE) "खाना खोजेर 'थप्नुहोस्' मा थिच्नुहोस्।" else "Search the database to log your meals.",
                            fontSize = 12.sp,
                            color = Color.Gray
                        )
                    }
                }
            }
        } else {
            items(loggedFoods, key = { it.id }) { log ->
                Card(
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.2f)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Surface(
                                    color = PurplePrimary.copy(alpha = 0.1f),
                                    shape = RoundedCornerShape(6.dp)
                                ) {
                                    Text(
                                        text = log.mealType,
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = PurplePrimary,
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                    )
                                }
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = if (language == Language.NE) log.nameNe else log.nameEn,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 14.sp
                                )
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            val protStr = if (log.protein % 1.0 == 0.0) "${log.protein.toInt()}" else String.format(java.util.Locale.US, "%.1f", log.protein)
                            Text(
                                text = "K: ${log.potassium.toInt()}mg  |  P: ${log.phosphorus.toInt()}mg  |  Na: ${log.sodium.toInt()}mg  |  Prot: ${protStr}g",
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }

                        IconButton(onClick = { onDeleteLog(log) }) {
                            Icon(
                                Icons.Default.Delete,
                                contentDescription = "Delete entry",
                                tint = MedicalAvoid.copy(alpha = 0.7f),
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}

@Composable
private fun NutrientStat(name: String, value: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = name, fontSize = 10.sp, color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.8f))
        Text(text = value, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onPrimaryContainer)
    }
}
