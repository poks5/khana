package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.filled.Assessment
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.khanasathi.model.Language
import com.example.khanasathi.ui.components.AppHeader
import com.example.khanasathi.ui.screens.BloodReportsScreen
import com.example.khanasathi.ui.screens.FoodTrackerScreen
import com.example.khanasathi.ui.screens.HomeScreen
import com.example.khanasathi.ui.screens.ProfileSettingsScreen
import com.example.khanasathi.ui.screens.RecipesScreen
import com.example.khanasathi.ui.screens.TipsScreen
import com.example.khanasathi.ui.theme.KhanaSathiTheme
import com.example.khanasathi.ui.theme.PurplePrimary
import com.example.khanasathi.viewmodel.KhanaSathiViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            KhanaSathiTheme {
                KhanaSathiApp()
            }
        }
    }
}

@Composable
fun KhanaSathiApp(
    viewModel: KhanaSathiViewModel = viewModel()
) {
    val language by viewModel.language.collectAsState()
    val currentTab by viewModel.currentTab.collectAsState()
    val selectedCategory by viewModel.selectedCategory.collectAsState()
    val safetyFilter by viewModel.safetyFilter.collectAsState()
    val searchQuery by viewModel.searchQuery.collectAsState()
    val filteredFoods by viewModel.filteredFoods.collectAsState()
    val todayLogs by viewModel.todayFoodLogs.collectAsState()
    val todayNutrients by viewModel.todayNutrients.collectAsState()
    val currentLimits by viewModel.currentLimits.collectAsState()
    val dialysisMode by viewModel.dialysisMode.collectAsState()
    val labReports by viewModel.labReports.collectAsState()

    BackHandler(enabled = currentTab != "home") {
        viewModel.setCurrentTab("home")
    }

    Scaffold(
        topBar = {
            AppHeader(
                language = language,
                onToggleLanguage = { viewModel.toggleLanguage() }
            )
        },
        bottomBar = {
            val navItems = listOf(
                NavigationItem("home", if (language == Language.NE) "गृहपृष्ठ" else "Home", Icons.Default.Home),
                NavigationItem("food", if (language == Language.NE) "खाना" else "Food", Icons.Default.Restaurant),
                NavigationItem("tips", if (language == Language.NE) "सल्लाह" else "Tips", Icons.Default.Lightbulb),
                NavigationItem("recipes", if (language == Language.NE) "रेसिपी" else "Recipes", Icons.AutoMirrored.Filled.MenuBook),
                NavigationItem("reports", if (language == Language.NE) "ल्याब" else "Labs", Icons.Default.Assessment),
                NavigationItem("profile", if (language == Language.NE) "म" else "Me", Icons.Default.Person)
            )

            NavigationBar(
                containerColor = MaterialTheme.colorScheme.surface,
                tonalElevation = 8.dp
            ) {
                navItems.forEach { item ->
                    val selected = currentTab == item.route
                    NavigationBarItem(
                        selected = selected,
                        onClick = { viewModel.setCurrentTab(item.route) },
                        icon = {
                            Icon(
                                imageVector = item.icon,
                                contentDescription = item.label
                            )
                        },
                        label = {
                            Text(
                                text = item.label,
                                fontSize = 10.sp
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = PurplePrimary,
                            selectedTextColor = PurplePrimary,
                            indicatorColor = MaterialTheme.colorScheme.primaryContainer
                        ),
                        modifier = Modifier.testTag("nav_item_${item.route}")
                    )
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (currentTab) {
                "home" -> HomeScreen(
                    language = language,
                    todayNutrients = todayNutrients,
                    limits = currentLimits,
                    onNavigateToCategory = { catKey ->
                        viewModel.setSelectedCategory(catKey)
                        viewModel.setCurrentTab("food")
                    },
                    onNavigateToTab = { tab ->
                        viewModel.setCurrentTab(tab)
                    }
                )

                "food" -> FoodTrackerScreen(
                    language = language,
                    foods = filteredFoods,
                    searchQuery = searchQuery,
                    onSearchQueryChange = { viewModel.setSearchQuery(it) },
                    selectedCategory = selectedCategory,
                    onSelectCategory = { viewModel.setSelectedCategory(it) },
                    selectedSafety = safetyFilter,
                    onSelectSafety = { viewModel.setSafetyFilter(it) },
                    loggedFoods = todayLogs,
                    todayNutrients = todayNutrients,
                    onLogFood = { food, meal, multiplier ->
                        viewModel.logFood(food, meal, multiplier)
                    },
                    onDeleteLog = { viewModel.deleteLog(it) },
                    onClearLogs = { viewModel.clearTodayLogs() }
                )

                "tips" -> TipsScreen(
                    language = language
                )

                "recipes" -> RecipesScreen(
                    language = language
                )

                "reports" -> BloodReportsScreen(
                    language = language,
                    reports = labReports,
                    todayDateString = viewModel.todayDateString,
                    onAddReport = { date, k, p, cr, u, na, ca, hb, notes ->
                        viewModel.addLabReport(date, k, p, cr, u, na, ca, hb, notes)
                    },
                    onDeleteReport = { viewModel.deleteLabReport(it) }
                )

                "profile" -> ProfileSettingsScreen(
                    language = language,
                    dialysisMode = dialysisMode,
                    onSetDialysisMode = { viewModel.setDialysisMode(it) },
                    currentLimits = currentLimits
                )
            }
        }
    }
}

private data class NavigationItem(
    val route: String,
    val label: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector
)
