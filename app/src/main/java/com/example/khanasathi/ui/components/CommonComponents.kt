package com.example.khanasathi.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Translate
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
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
import com.example.khanasathi.model.Language
import com.example.khanasathi.model.SafetyStatus
import com.example.khanasathi.ui.theme.MedicalAvoid
import com.example.khanasathi.ui.theme.MedicalAvoidBg
import com.example.khanasathi.ui.theme.MedicalAvoidText
import com.example.khanasathi.ui.theme.MedicalCaution
import com.example.khanasathi.ui.theme.MedicalCautionBg
import com.example.khanasathi.ui.theme.MedicalCautionText
import com.example.khanasathi.ui.theme.MedicalSafe
import com.example.khanasathi.ui.theme.MedicalSafeBg
import com.example.khanasathi.ui.theme.MedicalSafeText
import com.example.khanasathi.ui.theme.PurpleLight
import com.example.khanasathi.ui.theme.PurplePrimary

@Composable
fun AppHeader(
    language: Language,
    onToggleLanguage: () -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(
        color = MaterialTheme.colorScheme.surface,
        tonalElevation = 2.dp,
        modifier = modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .background(PurplePrimary),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "ने",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp
                    )
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text(
                        text = if (language == Language.NE) "खाना-साथी" else "Khana-Sathi",
                        style = MaterialTheme.typography.titleMedium.copy(
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp
                        ),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = if (language == Language.NE) "नेपाली मिर्गौला पोषण साथी" else "Nephro Nutrition Compass",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            Surface(
                shape = RoundedCornerShape(20.dp),
                color = PurpleLight,
                onClick = onToggleLanguage,
                modifier = Modifier.testTag("language_toggle_button")
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Translate,
                        contentDescription = "Switch Language",
                        tint = PurplePrimary,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = if (language == Language.NE) "English" else "नेपाली",
                        color = PurplePrimary,
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 13.sp
                    )
                }
            }
        }
    }
}

@Composable
fun MedicalDisclaimerBanner(
    language: Language,
    modifier: Modifier = Modifier
) {
    Card(
        colors = CardDefaults.cardColors(
            containerColor = Color(0xFFEFF6FF)
        ),
        shape = RoundedCornerShape(12.dp),
        modifier = modifier
            .fillMaxWidth()
            .testTag("medical_disclaimer_card")
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.Top
        ) {
            Icon(
                imageVector = Icons.Default.Info,
                contentDescription = "Medical Alert",
                tint = Color(0xFF2563EB),
                modifier = Modifier.size(20.dp)
            )
            Spacer(modifier = Modifier.width(10.dp))
            Column {
                Text(
                    text = if (language == Language.NE) "चिकित्सीय सल्लाह" else "Clinical Disclaimer",
                    fontWeight = FontWeight.Bold,
                    fontSize = 12.sp,
                    color = Color(0xFF1E40AF)
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = if (language == Language.NE)
                        "यो एप केवल शैक्षिक उद्देश्यको लागि हो। कुनै पनि खाना परिवर्तन गर्नुअघि आफ्नो नेफ्रोलोजिस्ट वा डाइटिसियनसँग सल्लाह लिनुहोस्।"
                    else
                        "Khana-Sathi is an educational renal compass. Always consult your nephrologist and renal dietitian for personalized targets.",
                    fontSize = 11.sp,
                    color = Color(0xFF1E3A8A),
                    lineHeight = 15.sp
                )
            }
        }
    }
}

@Composable
fun SafetyBadge(
    status: SafetyStatus,
    language: Language,
    modifier: Modifier = Modifier
) {
    val (bgColor, textColor, label, icon) = when (status) {
        SafetyStatus.SAFE -> Quad(
            MedicalSafeBg,
            MedicalSafeText,
            if (language == Language.NE) "सुरक्षित" else "Safe",
            Icons.Default.CheckCircle
        )
        SafetyStatus.CAUTION -> Quad(
            MedicalCautionBg,
            MedicalCautionText,
            if (language == Language.NE) "सावधानी" else "Caution",
            Icons.Default.Warning
        )
        SafetyStatus.AVOID -> Quad(
            MedicalAvoidBg,
            MedicalAvoidText,
            if (language == Language.NE) "नखानुहोस्" else "Avoid",
            Icons.Default.Warning
        )
    }

    Surface(
        color = bgColor,
        shape = RoundedCornerShape(12.dp),
        modifier = modifier
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = icon,
                contentDescription = label,
                tint = textColor,
                modifier = Modifier.size(12.dp)
            )
            Spacer(modifier = Modifier.width(4.dp))
            Text(
                text = label,
                color = textColor,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
fun NutrientChip(
    label: String,
    value: Double,
    unit: String,
    modifier: Modifier = Modifier,
    isWarning: Boolean = false
) {
    Surface(
        color = if (isWarning) MedicalAvoidBg else MaterialTheme.colorScheme.surfaceVariant,
        shape = RoundedCornerShape(8.dp),
        modifier = modifier
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "$label: ",
                fontSize = 10.sp,
                fontWeight = FontWeight.Medium,
                color = if (isWarning) MedicalAvoidText else MaterialTheme.colorScheme.onSurfaceVariant
            )
            val formattedValue = if (unit == "g") {
                if (value % 1.0 == 0.0) "${value.toInt()}" else String.format(java.util.Locale.US, "%.1f", value)
            } else {
                "${value.toInt()}"
            }
            Text(
                text = "$formattedValue $unit",
                fontSize = 10.sp,
                fontWeight = FontWeight.Bold,
                color = if (isWarning) MedicalAvoidText else MaterialTheme.colorScheme.onSurface
            )
        }
    }
}

private data class Quad<A, B, C, D>(val first: A, val second: B, val third: C, val fourth: D)
