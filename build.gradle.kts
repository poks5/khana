plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.ksp) apply false
}

val keystoreFile = file("${rootDir}/debug.keystore")
if (!keystoreFile.exists()) {
    val base64File = file("${rootDir}/debug.keystore.base64")
    if (base64File.exists()) {
        val decoded = java.util.Base64.getDecoder().decode(base64File.readText().trim())
        keystoreFile.writeBytes(decoded)
    }
}
