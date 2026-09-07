package com.example.khanasathi.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.khanasathi.data.FoodDataSource
import com.example.khanasathi.db.AppDatabase
import com.example.khanasathi.db.LabReportEntity
import com.example.khanasathi.db.LoggedFoodEntity
import com.example.khanasathi.model.DailyLimits
import com.example.khanasathi.model.DialysisMode
import com.example.khanasathi.model.FoodItem
import com.example.khanasathi.model.Language
import com.example.khanasathi.model.NutrientProfile
import com.example.khanasathi.model.SafetyStatus
import com.example.khanasathi.repository.KhanaSathiRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class KhanaSathiViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: KhanaSathiRepository

    init {
        val database = AppDatabase.getDatabase(application)
        repository = KhanaSathiRepository(database.foodLogDao(), database.labReportDao())
    }

    private val dateFormatter = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
    val todayDateString: String = dateFormatter.format(Date())

    // UI state
    private val _language = MutableStateFlow(Language.EN)
    val language: StateFlow<Language> = _language.asStateFlow()

    private val _currentTab = MutableStateFlow("home")
    val currentTab: StateFlow<String> = _currentTab.asStateFlow()

    private val _selectedCategory = MutableStateFlow("all")
    val selectedCategory: StateFlow<String> = _selectedCategory.asStateFlow()

    private val _safetyFilter = MutableStateFlow<SafetyStatus?>(null)
    val safetyFilter: StateFlow<SafetyStatus?> = _safetyFilter.asStateFlow()

    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    private val _dialysisMode = MutableStateFlow(DialysisMode.HEMODIALYSIS)
    val dialysisMode: StateFlow<DialysisMode> = _dialysisMode.asStateFlow()

    val currentLimits: StateFlow<DailyLimits> = _dialysisMode.map { mode ->
        when (mode) {
            DialysisMode.HEMODIALYSIS -> DailyLimits.HEMODIALYSIS_LIMITS
            DialysisMode.PERITONEAL_DIALYSIS -> DailyLimits.PERITONEAL_LIMITS
            DialysisMode.NON_DIALYSIS_CKD -> DailyLimits.NON_DIALYSIS_LIMITS
        }
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = DailyLimits.HEMODIALYSIS_LIMITS
    )

    // Filtered food list
    val filteredFoods: StateFlow<List<FoodItem>> = combine(
        _searchQuery,
        _selectedCategory,
        _safetyFilter
    ) { query, category, safety ->
        FoodDataSource.search(query, if (category == "all") null else category, safety)
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = FoodDataSource.foods
    )

    // Today's food logs
    val todayFoodLogs: StateFlow<List<LoggedFoodEntity>> = repository
        .getLogsForDate(todayDateString)
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    // Nutrient summary for today
    val todayNutrients: StateFlow<NutrientProfile> = todayFoodLogs.map { logs ->
        var totalCal = 0.0
        var totalProt = 0.0
        var totalK = 0.0
        var totalP = 0.0
        var totalNa = 0.0
        var totalFluid = 0.0

        for (log in logs) {
            totalCal += log.calories
            totalProt += log.protein
            totalK += log.potassium
            totalP += log.phosphorus
            totalNa += log.sodium
            totalFluid += log.fluid
        }
        NutrientProfile(
            calories = totalCal,
            protein = totalProt,
            potassium = totalK,
            phosphorus = totalP,
            sodium = totalNa,
            fluid = totalFluid
        )
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = NutrientProfile(0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
    )

    // Lab reports
    val labReports: StateFlow<List<LabReportEntity>> = repository
        .getAllLabReports()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    // Actions
    fun toggleLanguage() {
        _language.value = if (_language.value == Language.EN) Language.NE else Language.EN
    }

    fun setLanguage(lang: Language) {
        _language.value = lang
    }

    fun setCurrentTab(tab: String) {
        _currentTab.value = tab
    }

    fun setSelectedCategory(category: String) {
        _selectedCategory.value = category
    }

    fun setSafetyFilter(status: SafetyStatus?) {
        _safetyFilter.value = status
    }

    fun setSearchQuery(query: String) {
        _searchQuery.value = query
    }

    fun setDialysisMode(mode: DialysisMode) {
        _dialysisMode.value = mode
    }

    fun logFood(food: FoodItem, mealType: String, multiplier: Double) {
        viewModelScope.launch {
            val entity = LoggedFoodEntity(
                foodId = food.id,
                nameEn = food.nameEn,
                nameNe = food.nameNe,
                mealType = mealType,
                quantity = food.servingAmount * multiplier,
                unit = food.servingUnit,
                calories = food.nutrients.calories * multiplier,
                protein = food.nutrients.protein * multiplier,
                potassium = food.nutrients.potassium * multiplier,
                phosphorus = food.nutrients.phosphorus * multiplier,
                sodium = food.nutrients.sodium * multiplier,
                fluid = food.nutrients.fluid * multiplier,
                logDate = todayDateString
            )
            repository.insertFoodLog(entity)
        }
    }

    fun deleteLog(log: LoggedFoodEntity) {
        viewModelScope.launch {
            repository.deleteFoodLog(log)
        }
    }

    fun clearTodayLogs() {
        viewModelScope.launch {
            repository.clearLogsForDate(todayDateString)
        }
    }

    fun addLabReport(
        reportDate: String = todayDateString,
        potassium: Double?,
        phosphorus: Double?,
        creatinine: Double?,
        urea: Double?,
        sodium: Double?,
        calcium: Double?,
        hemoglobin: Double?,
        notes: String
    ) {
        viewModelScope.launch {
            val report = LabReportEntity(
                reportDate = reportDate.ifBlank { todayDateString },
                potassium = potassium,
                phosphorus = phosphorus,
                creatinine = creatinine,
                urea = urea,
                sodium = sodium,
                calcium = calcium,
                hemoglobin = hemoglobin,
                notes = notes
            )
            repository.insertLabReport(report)
        }
    }

    fun deleteLabReport(report: LabReportEntity) {
        viewModelScope.launch {
            repository.deleteLabReport(report)
        }
    }
}
