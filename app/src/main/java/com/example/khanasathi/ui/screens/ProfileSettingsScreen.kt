package com.example.khanasathi.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Call
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Security
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.khanasathi.model.DailyLimits
import com.example.khanasathi.model.DialysisMode
import com.example.khanasathi.model.Language
import com.example.khanasathi.ui.theme.MedicalAvoid
import com.example.khanasathi.ui.theme.MedicalAvoidBg
import com.example.khanasathi.ui.theme.MedicalAvoidText
import com.example.khanasathi.ui.theme.PurpleLight
import com.example.khanasathi.ui.theme.PurplePrimary

@Composable
fun ProfileSettingsScreen(
    language: Language,
    dialysisMode: DialysisMode,
    onSetDialysisMode: (DialysisMode) -> Unit,
    currentLimits: DailyLimits,
    modifier: Modifier = Modifier
) {
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
                        text = if (language == Language.NE) "⚙️ प्रोफाइल र उपचार सेटिङ" else "⚙️ Patient Profile & Regimen",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = Color(0xFF3B0764)
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = if (language == Language.NE)
                            "तपाईंको उपचार प्रकार अनुसार दैनिक पोटासियम र प्रोटिनको सीमा परिवर्तन हुन्छ।"
                        else
                            "Select your kidney therapy mode to customize your daily electrolyte and fluid targets.",
                        fontSize = 12.sp,
                        color = Color(0xFF581C87)
                    )
                }
            }
        }

        // Mode Selector Card
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)),
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("dialysis_mode_card")
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = if (language == Language.NE) "तपाईंको उपचार प्रकार (Therapy Mode):" else "Select Therapy Mode:",
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp
                    )
                    Spacer(modifier = Modifier.height(10.dp))

                    ModeOption(
                        title = if (language == Language.NE) "हेमोडायलाइसिस (Hemodialysis - HD)" else "Hemodialysis (HD)",
                        subtitle = if (language == Language.NE) "हप्तामा २-३ पटक मेसिन डायलाइसिस" else "In-center hemodialysis 2-3x / week",
                        selected = dialysisMode == DialysisMode.HEMODIALYSIS,
                        onClick = { onSetDialysisMode(DialysisMode.HEMODIALYSIS) }
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    ModeOption(
                        title = if (language == Language.NE) "पेरिटोनियल डायलाइसिस (PD / CAPD)" else "Peritoneal Dialysis (PD)",
                        subtitle = if (language == Language.NE) "घरमै पेटबाट गरिने दैनिक डायलाइसिस" else "Home daily peritoneal dialysis",
                        selected = dialysisMode == DialysisMode.PERITONEAL_DIALYSIS,
                        onClick = { onSetDialysisMode(DialysisMode.PERITONEAL_DIALYSIS) }
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    ModeOption(
                        title = if (language == Language.NE) "नन्-डायलाइसिस सीकेडी (CKD Stage 3-5)" else "Non-Dialysis CKD (Pre-dialysis)",
                        subtitle = if (language == Language.NE) "डायलाइसिस सुरु नभएका बिरामी" else "Conservative management with low-protein diet",
                        selected = dialysisMode == DialysisMode.NON_DIALYSIS_CKD,
                        onClick = { onSetDialysisMode(DialysisMode.NON_DIALYSIS_CKD) }
                    )
                }
            }
        }

        // Active Targets Summary Card
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = if (language == Language.NE) "📋 हालको दैनिक लक्ष्यहरू" else "📋 Active Daily Target Limits",
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    LimitRow(name = "Potassium (K+)", limit = "${currentLimits.potassium.toInt()} mg / day")
                    LimitRow(name = "Phosphorus (PO4)", limit = "${currentLimits.phosphorus.toInt()} mg / day")
                    LimitRow(name = "Sodium (Na+)", limit = "${currentLimits.sodium.toInt()} mg / day (< 1 tsp salt)")
                    LimitRow(name = "Target Protein", limit = "${currentLimits.protein.toInt()} g / day")
                    LimitRow(name = "Fluid Allowance", limit = "${currentLimits.fluid.toInt()} ml / day (~1 Liter)")
                }
            }
        }

        // Emergency & Clinical Warning
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MedicalAvoidBg),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Call, contentDescription = "Emergency", tint = MedicalAvoid, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = if (language == Language.NE) "🚨 आपतकालीन लक्षण र सम्पर्क" else "🚨 Emergency Symptoms",
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            color = MedicalAvoidText
                        )
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = if (language == Language.NE)
                            "यदि छाती भारी हुने, सास फेर्न गाह्रो हुने वा हातखुट्टामा अत्यधिक कमजोरी भएमा तुरुन्त नजिकैको डायलाइसिस सेन्टर वा अस्पताल जानुहोस् (नेपाल आपतकालीन: १०२)।"
                        else
                            "If you experience sudden shortness of breath, chest tightness, or severe muscle weakness, seek emergency care immediately (Nepal Ambulance: 102).",
                        fontSize = 11.sp,
                        color = MedicalAvoidText,
                        lineHeight = 15.sp
                    )
                }
            }
        }

        // About Khana-Sathi Card
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Info, contentDescription = "About", tint = PurplePrimary, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "Khana-Sathi | खाना-साथी v1.0",
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp
                        )
                    }
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = if (language == Language.NE)
                            "नेपाली मिर्गौला बिरामीहरूका लागि समर्पित पोषण गाइड र दैनिक खाना ट्र्याकर। १००% अफलाइन सुरक्षित।"
                        else
                            "Dedicated nephro nutrition compass and food log for Nepali kidney disease and dialysis patients. 100% offline-first with local Room persistence.",
                        fontSize = 11.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        lineHeight = 15.sp
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "Contact: poksfamily5@gmail.com",
                        fontSize = 11.sp,
                        color = PurplePrimary
                    )
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}

@Composable
private fun ModeOption(
    title: String,
    subtitle: String,
    selected: Boolean,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        shape = RoundedCornerShape(12.dp),
        color = if (selected) PurpleLight else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
        border = BorderStroke(1.dp, if (selected) PurplePrimary else Color.Transparent),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp,
                    color = if (selected) Color(0xFF3B0764) else MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = subtitle,
                    fontSize = 11.sp,
                    color = if (selected) Color(0xFF581C87) else MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            if (selected) {
                Icon(Icons.Default.Check, contentDescription = "Selected", tint = PurplePrimary, modifier = Modifier.size(18.dp))
            }
        }
    }
}

@Composable
private fun LimitRow(name: String, limit: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 3.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = name, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Text(text = limit, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurface)
    }
}
