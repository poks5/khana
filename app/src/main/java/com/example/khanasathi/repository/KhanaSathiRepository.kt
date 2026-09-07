package com.example.khanasathi.repository

import com.example.khanasathi.db.FoodLogDao
import com.example.khanasathi.db.LabReportDao
import com.example.khanasathi.db.LabReportEntity
import com.example.khanasathi.db.LoggedFoodEntity
import kotlinx.coroutines.flow.Flow

class KhanaSathiRepository(
    private val foodLogDao: FoodLogDao,
    private val labReportDao: LabReportDao
) {
    fun getLogsForDate(date: String): Flow<List<LoggedFoodEntity>> {
        return foodLogDao.getLogsForDate(date)
    }

    suspend fun insertFoodLog(log: LoggedFoodEntity): Long {
        return foodLogDao.insertLog(log)
    }

    suspend fun deleteFoodLog(log: LoggedFoodEntity) {
        foodLogDao.deleteLog(log)
    }

    suspend fun deleteFoodLogById(id: Long) {
        foodLogDao.deleteLogById(id)
    }

    suspend fun clearLogsForDate(date: String) {
        foodLogDao.clearLogsForDate(date)
    }

    fun getAllLabReports(): Flow<List<LabReportEntity>> {
        return labReportDao.getAllReports()
    }

    suspend fun insertLabReport(report: LabReportEntity): Long {
        return labReportDao.insertReport(report)
    }

    suspend fun deleteLabReport(report: LabReportEntity) {
        labReportDao.deleteReport(report)
    }
}
