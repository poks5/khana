package com.example.khanasathi.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.khanasathi.model.DailyLimits
import com.example.khanasathi.model.Language
import com.example.khanasathi.model.NutrientProfile
import com.example.khanasathi.ui.components.MedicalDisclaimerBanner
import com.example.khanasathi.ui.theme.MedicalAvoid
import com.example.khanasathi.ui.theme.MedicalCaution
import com.example.khanasathi.ui.theme.MedicalSafe
import com.example.khanasathi.ui.theme.PurplePrimary
import com.example.khanasathi.ui.theme.TealSecondary
import java.util.Calendar

@Composable
fun HomeScreen(
    language: Language,
    todayNutrients: NutrientProfile,
    limits: DailyLimits,
    onNavigateToCategory: (String) -> Unit,
    onNavigateToTab: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
    val greeting = if (language == Language.NE) {
        when {
            hour < 12 -> "शुभ बिहानी"
            hour < 17 -> "शुभ दिउँसो"
            else -> "शुभ साँझ"
        }
    } else {
        when {
            hour < 12 -> "Good Morning"
            hour < 17 -> "Good Afternoon"
            else -> "Good Evening"
        }
    }
    val greetingEmoji = when {
        hour < 12 -> "🌅"
        hour < 17 -> "☀️"
        else -> "🌙"
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(4.dp))
            // Greeting Card
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.4f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = greeting,
                            style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Text(
                            text = if (language == Language.NE) "खाना-साथी सँग सुरक्षित खानुहोस्" else "Eat safely with Khana-Sathi",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    Text(text = greetingEmoji, fontSize = 36.sp)
                }
            }
        }

        item {
            MedicalDisclaimerBanner(language = language)
        }

        // Daily Snapshot Card
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.4f)),
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("daily_snapshot_card")
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = if (language == Language.NE) "📊 आजको पोषण सारांश" else "📊 Today's Intake vs Target",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
                        )
                        Text(
                            text = if (language == Language.NE) "दैनिक सीमा" else "Daily Limits",
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    Spacer(modifier = Modifier.height(14.dp))

                    NutrientProgressBar(
                        name = if (language == Language.NE) "पोटासियम (Potassium)" else "Potassium (K+)",
                        current = todayNutrients.potassium,
                        limit = limits.potassium,
                        unit = "mg",
                        accentColor = PurplePrimary
                    )
                    Spacer(modifier = Modifier.height(10.dp))

                    NutrientProgressBar(
                        name = if (language == Language.NE) "फोस्फोरस (Phosphorus)" else "Phosphorus (PO4)",
                        current = todayNutrients.phosphorus,
                        limit = limits.phosphorus,
                        unit = "mg",
                        accentColor = TealSecondary
                    )
                    Spacer(modifier = Modifier.height(10.dp))

                    NutrientProgressBar(
                        name = if (language == Language.NE) "सोडियम / नुन (Sodium)" else "Sodium (Na+)",
                        current = todayNutrients.sodium,
                        limit = limits.sodium,
                        unit = "mg",
                        accentColor = Color(0xFFF59E0B)
                    )
                    Spacer(modifier = Modifier.height(10.dp))

                    NutrientProgressBar(
                        name = if (language == Language.NE) "प्रोटिन (Protein)" else "Protein",
                        current = todayNutrients.protein,
                        limit = limits.protein,
                        unit = "g",
                        accentColor = Color(0xFF10B981)
                    )
                    Spacer(modifier = Modifier.height(10.dp))

                    NutrientProgressBar(
                        name = if (language == Language.NE) "तरल पदार्थ (Fluid Limit)" else "Fluid Intake",
                        current = todayNutrients.fluid,
                        limit = limits.fluid,
                        unit = "ml",
                        accentColor = Color(0xFF0284C7)
                    )
                }
            }
        }

        // Food Categories Hero Grid
        item {
            Column {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = if (language == Language.NE) "🍽️ खानाको प्रकार रोज्नुहोस्" else "🍽️ Explore Food Types",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
                    )
                    Text(
                        text = if (language == Language.NE) "सबै हेर्नुहोस्" else "Tap to filter",
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                Spacer(modifier = Modifier.height(12.dp))

                val categories = listOf(
                    FoodCategoryMeta("rice", "भात", "Rice", "🍚", Color(0xFFFFF7ED)),
                    FoodCategoryMeta("vegetables", "तरकारी", "Vegetables", "🥬", Color(0xFFECFDF5)),
                    FoodCategoryMeta("lentils", "दाल", "Lentils", "🍲", Color(0xFFFEF3C7)),
                    FoodCategoryMeta("meat", "मासु", "Meat", "🍗", Color(0xFFFFF1F2)),
                    FoodCategoryMeta("fruits", "फलफूल", "Fruits", "🍎", Color(0xFFFEF2F2)),
                    FoodCategoryMeta("dairy", "दूध", "Dairy", "🥛", Color(0xFFF0F9FF)),
                    FoodCategoryMeta("pickles", "अचार", "Pickles", "🥒", Color(0xFFF7FEE7)),
                    FoodCategoryMeta("drinks", "पेय", "Drinks", "🥤", Color(0xFFECFEFF))
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    for (i in 0..3) {
                        val cat = categories[i]
                        FoodCategoryTile(
                            meta = cat,
                            language = language,
                            onClick = { onNavigateToCategory(cat.key) },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
                Spacer(modifier = Modifier.height(8.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    for (i in 4..7) {
                        val cat = categories[i]
                        FoodCategoryTile(
                            meta = cat,
                            language = language,
                            onClick = { onNavigateToCategory(cat.key) },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }
        }

        // Quick Kidney Knowledge Highlight
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFF5F3FF)),
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onNavigateToTab("tips") }
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(CircleShape)
                            .background(PurplePrimary.copy(alpha = 0.15f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(text = "💡", fontSize = 22.sp)
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = if (language == Language.NE) "नेपाली तरकारीमा पोटासियम घटाउने तरिका" else "How to Leach Potassium from Tarkari",
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            color = Color(0xFF4C1D95)
                        )
                        Text(
                            text = if (language == Language.NE) "उमालेर पानी फाल्ने विधि पढ्नुहोस्" else "Learn the 5-minute boiling & water discard method",
                            fontSize = 11.sp,
                            color = Color(0xFF6D28D9)
                        )
                    }
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                        contentDescription = "Read tips",
                        tint = PurplePrimary,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        }

        // Safety Legend
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = if (language == Language.NE) "🚦 सुरक्षा संकेतहरू (Safety Legend)" else "🚦 Renal Safety Levels",
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        LegendItem(color = MedicalSafe, label = if (language == Language.NE) "सुरक्षित (Safe)" else "Safe")
                        LegendItem(color = MedicalCaution, label = if (language == Language.NE) "सावधानी (Caution)" else "Caution")
                        LegendItem(color = MedicalAvoid, label = if (language == Language.NE) "त्याग्नुहोस् (Avoid)" else "Avoid")
                    }
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}

@Composable
private fun NutrientProgressBar(
    name: String,
    current: Double,
    limit: Double,
    unit: String,
    accentColor: Color
) {
    val progress = (current / limit).coerceIn(0.0, 1.0).toFloat()
    val isOver = current > limit

    Column {
        val currentStr = if (unit == "g") {
            if (current % 1.0 == 0.0) "${current.toInt()}" else String.format(java.util.Locale.US, "%.1f", current)
        } else {
            "${current.toInt()}"
        }
        val limitStr = if (unit == "g") {
            if (limit % 1.0 == 0.0) "${limit.toInt()}" else String.format(java.util.Locale.US, "%.1f", limit)
        } else {
            "${limit.toInt()}"
        }
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = name, fontSize = 12.sp, fontWeight = FontWeight.Medium)
            Text(
                text = "$currentStr / $limitStr $unit",
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = if (isOver) MedicalAvoid else MaterialTheme.colorScheme.onSurface
            )
        }
        Spacer(modifier = Modifier.height(4.dp))
        LinearProgressIndicator(
            progress = { progress },
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .clip(RoundedCornerShape(4.dp)),
            color = if (isOver) MedicalAvoid else accentColor,
            trackColor = MaterialTheme.colorScheme.surfaceVariant
        )
    }
}

private data class FoodCategoryMeta(
    val key: String,
    val ne: String,
    val en: String,
    val emoji: String,
    val bgColor: Color
)

@Composable
private fun FoodCategoryTile(
    meta: FoodCategoryMeta,
    language: Language,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(
        onClick = onClick,
        shape = RoundedCornerShape(14.dp),
        color = meta.bgColor,
        border = BorderStroke(1.dp, Color.Black.copy(alpha = 0.05f)),
        modifier = modifier.testTag("category_${meta.key}")
    ) {
        Column(
            modifier = Modifier.padding(vertical = 10.dp, horizontal = 4.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = meta.emoji, fontSize = 24.sp)
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = if (language == Language.NE) meta.ne else meta.en,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF1F2937),
                maxLines = 1
            )
        }
    }
}

@Composable
private fun LegendItem(color: Color, label: String) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Box(
            modifier = Modifier
                .size(10.dp)
                .clip(CircleShape)
                .background(color)
        )
        Spacer(modifier = Modifier.width(6.dp))
        Text(text = label, fontSize = 11.sp, fontWeight = FontWeight.Medium)
    }
}
