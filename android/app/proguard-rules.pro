# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
-keep,includedescriptorclasses class com.facebook.react.bridge.CatalystInstanceImpl { *; }
-keep,includedescriptorclasses class com.facebook.react.bridge.JavaScriptExecutor { *; }

-keep class com.facebook.react.cxxbridge.ModuleRegistryHolder { *; }
-keep class com.facebook.react.cxxbridge.CatalystInstanceImpl { *; }
-keep class com.facebook.react.cxxbridge.JavaScriptExecutor { *; }
-keep class com.facebook.react.bridge.queue.NativeRunnable { *; }
-keep class com.facebook.react.bridge.ExecutorToken { *; }
-keep class com.facebook.react.bridge.ReadableType { *; }
-keep class com.facebook.react.uimanager.** { *; }

# Firebase
-dontwarn com.google.firebase.**
-dontwarn com.google.android.gms.**
-keep class com.google.android.gms.** { *; }

# Huawei
-ignorewarnings
-keepattributes *Annotation*
-keepattributes Exceptions
-keepattributes InnerClasses
-keepattributes Signature
-keepattributes SourceFile,LineNumberTable
-keep class com.hianalytics.android.**{*;}
-keep class com.huawei.updatesdk.**{*;}
-keep class com.huawei.hms.**{*;}
-repackageclasses