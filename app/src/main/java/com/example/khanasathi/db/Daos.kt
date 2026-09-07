package com.example.khanasathi.db

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface FoodLogDao {
    @Query("SELECT * FROM food_logs WHERE logDate = :date ORDER BY timestamp DESC")
    fun getLogsForDate(date: String): Flow<List<LoggedFoodEntity>>

    @Query("SELECT * FROM food_logs ORDER BY timestamp DESC")
    fun getAllLogs(): Flow<List<LoggedFoodEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLog(log: LoggedFoodEntity): Long

    @Delete
    suspend fun deleteLog(log: LoggedFoodEntity)

    @Query("DELETE FROM food_logs WHERE id = :id")
    suspend fun deleteLogById(id: Long)

    @Query("DELETE FROM food_logs WHERE logDate = :date")
    suspend fun clearLogsForDate(date: String)
}

@Dao
interface LabReportDao {
    @Query("SELECT * FROM lab_reports ORDER BY timestamp DESC")
    fun getAllReports(): Flow<List<LabReportEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertReport(report: LabReportEntity): Long

    @Delete
    suspend fun deleteReport(report: LabReportEntity)
}
