package com.example.khanasathi.db

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "food_logs")
data class LoggedFoodEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val foodId: String,
    val nameEn: String,
    val nameNe: String,
    val mealType: String, // "Breakfast", "Lunch", "Dinner", "Snack"
    val quantity: Double,
    val unit: String,
    val calories: Double,
    val protein: Double,
    val potassium: Double,
    val phosphorus: Double,
    val sodium: Double,
    val fluid: Double,
    val timestamp: Long = System.currentTimeMillis(),
    val logDate: String // YYYY-MM-DD
)

@Entity(tableName = "lab_reports")
data class LabReportEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val reportDate: String,
    val potassium: Double?, // Normal: 3.5 - 5.0 mEq/L
    val phosphorus: Double?, // Normal: 3.0 - 4.5 mg/dL
    val creatinine: Double?, // Normal: 0.6 - 1.2 mg/dL
    val urea: Double?, // BUN / Urea
    val sodium: Double?, // Normal: 135 - 145 mEq/L
    val calcium: Double?, // Normal: 8.5 - 10.2 mg/dL
    val hemoglobin: Double?, // Normal: 11 - 15 g/dL
    val notes: String = "",
    val timestamp: Long = System.currentTimeMillis()
)
