package com.example.khanasathi.ui.screens

import androidx.compose.foundation.BorderStroke
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.khanasathi.db.LabReportEntity
import com.example.khanasathi.model.Language
import com.example.khanasathi.ui.theme.MedicalAvoid
import com.example.khanasathi.ui.theme.MedicalAvoidBg
import com.example.khanasathi.ui.theme.MedicalAvoidText
import com.example.khanasathi.ui.theme.MedicalCaution
import com.example.khanasathi.ui.theme.MedicalCautionBg
import com.example.khanasathi.ui.theme.MedicalCautionText
import com.example.khanasathi.ui.theme.PurpleLight
import com.example.khanasathi.ui.theme.PurplePrimary

@Composable
fun BloodReportsScreen(
    language: Language,
    reports: List<LabReportEntity>,
    todayDateString: String = "",
    onAddReport: (
        reportDate: String,
        potassium: Double?,
        phosphorus: Double?,
        creatinine: Double?,
        urea: Double?,
        sodium: Double?,
        calcium: Double?,
        hemoglobin: Double?,
        notes: String
    ) -> Unit,
    onDeleteReport: (LabReportEntity) -> Unit,
    modifier: Modifier = Modifier
) {
    var showAddDialog by remember { mutableStateOf(false) }

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
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = if (language == Language.NE) "📊 रगत जाँच रिपोर्ट (Lab Reports)" else "📊 Renal Lab Tracker",
                                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                                color = Color(0xFF3B0764)
                            )
                            Text(
                                text = if (language == Language.NE) "पोटासियम र फोस्फोरस जाँच रेकर्ड" else "Track K+, Phosphorus, Creatinine & BUN",
                                fontSize = 12.sp,
                                color = Color(0xFF581C87)
                            )
                        }
                        Button(
                            onClick = { showAddDialog = true },
                            colors = ButtonDefaults.buttonColors(containerColor = PurplePrimary),
                            shape = RoundedCornerShape(10.dp),
                            modifier = Modifier.testTag("add_lab_report_button")
                        ) {
                            Icon(Icons.Default.Add, contentDescription = "Add", modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(if (language == Language.NE) "नयाँ रिपोर्ट" else "Add Lab", fontSize = 12.sp)
                        }
                    }
                }
            }
        }

        // Reference Ranges Card
        item {
            Card(
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text(
                        text = if (language == Language.NE) "📌 मिर्गौला बिरामीका लागि सामान्य दायरा (Target Ranges)" else "📌 Target Lab Ranges for CKD / Dialysis",
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(text = "Potassium (K+): 3.5 - 5.0 mEq/L", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text(text = "Phosphorus (PO4): 3.0 - 4.5 mg/dL", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    Spacer(modifier = Modifier.height(2.dp))
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(text = "Hemoglobin (Hb): 10.0 - 12.0 g/dL", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text(text = "Sodium (Na+): 135 - 145 mEq/L", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }
        }

        if (reports.isEmpty()) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 40.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(text = "📋", fontSize = 40.sp)
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = if (language == Language.NE) "कुनै रगत रिपोर्ट दर्ता गरिएको छैन।" else "No lab reports recorded yet.",
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Text(
                            text = if (language == Language.NE) "'नयाँ रिपोर्ट' थिचेर ल्याब भ्यालु राख्नुहोस्।" else "Tap 'Add Lab' to record your recent blood tests.",
                            fontSize = 12.sp,
                            color = Color.Gray
                        )
                    }
                }
            }
        } else {
            items(reports, key = { it.id }) { report ->
                LabReportCard(
                    report = report,
                    language = language,
                    onDelete = { onDeleteReport(report) }
                )
            }
        }

        item {
            Spacer(modifier = Modifier.height(16.dp))
        }
    }

    if (showAddDialog) {
        AddLabReportDialog(
            language = language,
            defaultDate = todayDateString,
            onDismiss = { showAddDialog = false },
            onSave = { date, k, p, cr, u, na, ca, hb, notes ->
                onAddReport(date, k, p, cr, u, na, ca, hb, notes)
                showAddDialog = false
            }
        )
    }
}

@Composable
private fun LabReportCard(
    report: LabReportEntity,
    language: Language,
    onDelete: () -> Unit
) {
    val kHighAlert = report.potassium != null && report.potassium > 5.5
    val kLowAlert = report.potassium != null && report.potassium < 3.5
    val pAlert = report.phosphorus != null && report.phosphorus > 5.5
    val hbLow = report.hemoglobin != null && report.hemoglobin < 10.0
    val hasAlert = kHighAlert || kLowAlert || pAlert

    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (hasAlert) MedicalAvoidBg.copy(alpha = 0.4f) else MaterialTheme.colorScheme.surface
        ),
        border = BorderStroke(
            1.dp,
            if (hasAlert) MedicalAvoid.copy(alpha = 0.5f) else MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
        ),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "📅 ${report.reportDate}",
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )
                IconButton(onClick = onDelete) {
                    Icon(
                        Icons.Default.Delete,
                        contentDescription = "Delete Report",
                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }

            if (kHighAlert) {
                Surface(
                    color = MedicalAvoidBg,
                    shape = RoundedCornerShape(6.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp)
                ) {
                    Row(
                        modifier = Modifier.padding(6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Default.Warning, contentDescription = "Alert", tint = MedicalAvoid, modifier = Modifier.size(14.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = if (language == Language.NE)
                                "⚠️ उच्च पोटासियम अलर्ट (${report.potassium} mEq/L)! तुरुन्त अस्पताल सम्पर्क गर्नुहोस्।"
                            else
                                "⚠️ High Potassium Alert (${report.potassium} mEq/L)! Contact nephrologist immediately.",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = MedicalAvoidText
                        )
                    }
                }
            }

            if (kLowAlert) {
                Surface(
                    color = MedicalCautionBg,
                    shape = RoundedCornerShape(6.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp)
                ) {
                    Row(
                        modifier = Modifier.padding(6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Default.Warning, contentDescription = "Alert", tint = MedicalCautionText, modifier = Modifier.size(14.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = if (language == Language.NE)
                                "⚠️ न्यून पोटासियम अलर्ट (${report.potassium} mEq/L)! डाक्टरसँग सल्लाह लिनुहोस्।"
                            else
                                "⚠️ Low Potassium Alert (${report.potassium} mEq/L)! Consult physician.",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = MedicalCautionText
                        )
                    }
                }
            }

            if (pAlert) {
                Surface(
                    color = MedicalAvoidBg,
                    shape = RoundedCornerShape(6.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp)
                ) {
                    Row(
                        modifier = Modifier.padding(6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Default.Warning, contentDescription = "Alert", tint = MedicalAvoid, modifier = Modifier.size(14.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = if (language == Language.NE)
                                "⚠️ उच्च फोस्फोरस (${report.phosphorus} mg/dL)! फोस्फेट बाइन्डर लिनुहोस्।"
                            else
                                "⚠️ High Phosphorus (${report.phosphorus} mg/dL)! Take prescribed binders.",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = MedicalAvoidText
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(6.dp))

            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                report.potassium?.let { LabValChip(label = "K+", value = "$it", isWarning = it > 5.5 || it < 3.5) }
                report.phosphorus?.let { LabValChip(label = "PO4", value = "$it", isWarning = it > 5.5) }
                report.creatinine?.let { LabValChip(label = "Creat", value = "$it", isWarning = false) }
                report.urea?.let { LabValChip(label = "BUN", value = "$it", isWarning = false) }
                report.hemoglobin?.let { LabValChip(label = "Hb", value = "$it", isWarning = hbLow) }
            }

            if (report.notes.isNotBlank()) {
                Spacer(modifier = Modifier.height(6.dp))
                Text(text = "Note: ${report.notes}", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}

@Composable
private fun LabValChip(label: String, value: String, isWarning: Boolean) {
    Surface(
        color = if (isWarning) MedicalAvoidBg else MaterialTheme.colorScheme.surfaceVariant,
        shape = RoundedCornerShape(8.dp)
    ) {
        Column(
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = label, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = if (isWarning) MedicalAvoidText else Color.Gray)
            Text(text = value, fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = if (isWarning) MedicalAvoidText else Color.Unspecified)
        }
    }
}

@Composable
private fun AddLabReportDialog(
    language: Language,
    defaultDate: String = "",
    onDismiss: () -> Unit,
    onSave: (
        reportDate: String,
        potassium: Double?,
        phosphorus: Double?,
        creatinine: Double?,
        urea: Double?,
        sodium: Double?,
        calcium: Double?,
        hemoglobin: Double?,
        notes: String
    ) -> Unit
) {
    var dateText by remember { mutableStateOf(defaultDate) }
    var kText by remember { mutableStateOf("") }
    var pText by remember { mutableStateOf("") }
    var crText by remember { mutableStateOf("") }
    var ureaText by remember { mutableStateOf("") }
    var hbText by remember { mutableStateOf("") }
    var notesText by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = if (language == Language.NE) "रगत परीक्षण विवरण राख्नुहोस्" else "Enter Lab Results",
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp
            )
        },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(
                    value = dateText,
                    onValueChange = { dateText = it },
                    label = { Text("Date (YYYY-MM-DD)") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth().testTag("input_report_date")
                )
                OutlinedTextField(
                    value = kText,
                    onValueChange = { kText = it },
                    label = { Text("Potassium / K+ (mEq/L)") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth().testTag("input_potassium")
                )
                OutlinedTextField(
                    value = pText,
                    onValueChange = { pText = it },
                    label = { Text("Phosphorus / PO4 (mg/dL)") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth().testTag("input_phosphorus")
                )
                OutlinedTextField(
                    value = crText,
                    onValueChange = { crText = it },
                    label = { Text("Creatinine (mg/dL)") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth().testTag("input_creatinine")
                )
                OutlinedTextField(
                    value = ureaText,
                    onValueChange = { ureaText = it },
                    label = { Text("Blood Urea / BUN (mg/dL)") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth().testTag("input_urea")
                )
                OutlinedTextField(
                    value = hbText,
                    onValueChange = { hbText = it },
                    label = { Text("Hemoglobin / Hb (g/dL)") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth().testTag("input_hemoglobin")
                )
                OutlinedTextField(
                    value = notesText,
                    onValueChange = { notesText = it },
                    label = { Text("Notes / डाक्टरको सल्लाह") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    onSave(
                        dateText,
                        kText.toDoubleOrNull(),
                        pText.toDoubleOrNull(),
                        crText.toDoubleOrNull(),
                        ureaText.toDoubleOrNull(),
                        null,
                        null,
                        hbText.toDoubleOrNull(),
                        notesText
                    )
                },
                colors = ButtonDefaults.buttonColors(containerColor = PurplePrimary),
                modifier = Modifier.testTag("save_lab_report_button")
            ) {
                Text(if (language == Language.NE) "सुरक्षित गर्नुहोस्" else "Save Report")
            }
        },
        dismissButton = {
            TextButton(
                onClick = onDismiss,
                modifier = Modifier.testTag("cancel_lab_report_button")
            ) {
                Text(if (language == Language.NE) "रद्द गर्नुहोस्" else "Cancel")
            }
        }
    )
}
