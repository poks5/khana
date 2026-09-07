package com.example.khanasathi.model

enum class Language {
    EN, NE
}

enum class SafetyStatus {
    SAFE, CAUTION, AVOID
}

enum class DialysisMode {
    HEMODIALYSIS,
    PERITONEAL_DIALYSIS,
    NON_DIALYSIS_CKD
}

data class NutrientProfile(
    val calories: Double,
    val protein: Double,
    val potassium: Double,
    val phosphorus: Double,
    val sodium: Double,
    val fluid: Double
)

data class FoodItem(
    val id: String,
    val nameEn: String,
    val nameNe: String,
    val category: String,
    val safety: SafetyStatus,
    val nutrients: NutrientProfile,
    val servingAmount: Double,
    val servingUnit: String,
    val preparationNotesEn: String = "",
    val preparationNotesNe: String = "",
    val culturalNotesEn: String = ""
)

data class DailyLimits(
    val calories: Double,
    val protein: Double,
    val potassium: Double,
    val phosphorus: Double,
    val sodium: Double,
    val fluid: Double
) {
    companion object {
        val HEMODIALYSIS_LIMITS = DailyLimits(
            calories = 2000.0,
            protein = 80.0,
            potassium = 2000.0,
            phosphorus = 800.0,
            sodium = 2000.0,
            fluid = 1000.0
        )
        val PERITONEAL_LIMITS = DailyLimits(
            calories = 2000.0,
            protein = 90.0,
            potassium = 2500.0,
            phosphorus = 900.0,
            sodium = 2000.0,
            fluid = 1200.0
        )
        val NON_DIALYSIS_LIMITS = DailyLimits(
            calories = 2100.0,
            protein = 60.0, // Protein restricted in non-dialysis CKD
            potassium = 2200.0,
            phosphorus = 900.0,
            sodium = 2000.0,
            fluid = 1500.0
        )
    }
}

data class Recipe(
    val id: String,
    val nameEn: String,
    val nameNe: String,
    val descriptionEn: String,
    val descriptionNe: String,
    val category: String,
    val prepTimeMinutes: Int,
    val cookTimeMinutes: Int,
    val servings: Int,
    val safety: SafetyStatus,
    val ingredients: List<String>,
    val instructionsEn: List<String>,
    val instructionsNe: List<String>,
    val clinicalNotesEn: String,
    val clinicalNotesNe: String,
    val nutrientsPerServing: NutrientProfile
)

data class ClinicalTip(
    val id: String,
    val titleEn: String,
    val titleNe: String,
    val summaryEn: String,
    val summaryNe: String,
    val stepsEn: List<String>,
    val stepsNe: List<String>,
    val iconEmoji: String,
    val tag: String
)
