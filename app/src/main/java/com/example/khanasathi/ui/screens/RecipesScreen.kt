package com.example.khanasathi.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.khanasathi.data.RecipeDataSource
import com.example.khanasathi.model.Language
import com.example.khanasathi.model.Recipe
import com.example.khanasathi.ui.components.NutrientChip
import com.example.khanasathi.ui.components.SafetyBadge
import com.example.khanasathi.ui.theme.PurpleLight
import com.example.khanasathi.ui.theme.PurplePrimary

@Composable
fun RecipesScreen(
    language: Language,
    modifier: Modifier = Modifier
) {
    val recipes = RecipeDataSource.recipes

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(6.dp))
            Surface(
                color = PurpleLight.copy(alpha = 0.5f),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = if (language == Language.NE) "🍳 मिर्गौला-सुरक्षित नेपाली रेसिपीहरू" else "🍳 Renal Nepali Recipes",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = Color(0xFF3B0764)
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = if (language == Language.NE)
                            "नेपाली स्वाद नगुमाईकन पोटासियम र नुन नियन्त्रण गरिएका विशेष परिकारहरू।"
                        else
                            "Traditional Nepali dishes adapted specifically for dialysis patients, maintaining taste while keeping electrolytes safe.",
                        fontSize = 12.sp,
                        color = Color(0xFF581C87),
                        lineHeight = 16.sp
                    )
                }
            }
        }

        items(recipes, key = { it.id }) { recipe ->
            RecipeCard(recipe = recipe, language = language)
        }

        item {
            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}

@Composable
private fun RecipeCard(
    recipe: Recipe,
    language: Language
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
                        text = if (language == Language.NE) recipe.nameNe else recipe.nameEn,
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = "${recipe.category} • ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins • ${recipe.servings} servings",
                        fontSize = 11.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                SafetyBadge(status = recipe.safety, language = language)
            }

            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = if (language == Language.NE) recipe.descriptionNe else recipe.descriptionEn,
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                lineHeight = 16.sp
            )

            Spacer(modifier = Modifier.height(10.dp))

            // Nutrients Per Serving
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                NutrientChip(label = "K", value = recipe.nutrientsPerServing.potassium, unit = "mg")
                NutrientChip(label = "P", value = recipe.nutrientsPerServing.phosphorus, unit = "mg")
                NutrientChip(label = "Na", value = recipe.nutrientsPerServing.sodium, unit = "mg")
                NutrientChip(label = "Prot", value = recipe.nutrientsPerServing.protein, unit = "g")
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Expand/Collapse Recipe Details
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { expanded = !expanded }
                    .padding(vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = if (expanded) {
                        if (language == Language.NE) "विधि लुकाउनुहोस्" else "Hide Recipe Details"
                    } else {
                        if (language == Language.NE) "रेसिपी र विधि हेर्नुहोस्" else "View Ingredients & Instructions"
                    },
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = PurplePrimary
                )
                Icon(
                    imageVector = if (expanded) Icons.Default.KeyboardArrowUp else Icons.Default.KeyboardArrowDown,
                    contentDescription = "Expand Recipe",
                    tint = PurplePrimary,
                    modifier = Modifier.size(18.dp)
                )
            }

            AnimatedVisibility(visible = expanded) {
                Column(modifier = Modifier.padding(top = 10.dp)) {
                    Text(
                        text = if (language == Language.NE) "सामग्रीहरू (Ingredients):" else "Ingredients:",
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    recipe.ingredients.forEach { ing ->
                        Text(text = "• $ing", fontSize = 12.sp, lineHeight = 16.sp)
                    }

                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = if (language == Language.NE) "बनाउने विधि (Preparation):" else "Preparation Steps:",
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    val instructions = if (language == Language.NE) recipe.instructionsNe else recipe.instructionsEn
                    instructions.forEachIndexed { idx, step ->
                        Text(text = "${idx + 1}. $step", fontSize = 12.sp, lineHeight = 16.sp, modifier = Modifier.padding(vertical = 2.dp))
                    }

                    Spacer(modifier = Modifier.height(10.dp))
                    Surface(
                        color = Color(0xFFEFF6FF),
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(10.dp)) {
                            Text(
                                text = if (language == Language.NE) "🔬 चिकित्सकीय टिप्पणी (Clinical Note):" else "🔬 Renal Note:",
                                fontWeight = FontWeight.Bold,
                                fontSize = 11.sp,
                                color = Color(0xFF1E40AF)
                            )
                            Spacer(modifier = Modifier.height(2.dp))
                            Text(
                                text = if (language == Language.NE) recipe.clinicalNotesNe else recipe.clinicalNotesEn,
                                fontSize = 11.sp,
                                color = Color(0xFF1E3A8A),
                                lineHeight = 15.sp
                            )
                        }
                    }
                }
            }
        }
    }
}
