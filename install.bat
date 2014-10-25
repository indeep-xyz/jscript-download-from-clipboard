cd /d %~dp0

set key_root=HKEY_CLASSES_ROOT\Directory\Background\shell\download-from-clipboard
set bin_main=%cd%\bin\main.wsf

reg add "%key_root%" /v "MUIVerb" /t "REG_SZ" /d "download from clipboard"
reg add "%key_root%\Command" /ve /t "REG_SZ" /d "wscript ""%bin_main%"""
