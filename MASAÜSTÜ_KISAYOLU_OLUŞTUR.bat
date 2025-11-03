@echo off
echo ================================================
echo   MASAÜSTÜ KISAYOLU OLUŞTURULUYOR...
echo ================================================
echo.

set SCRIPT="%TEMP%\CreateShortcut.vbs"
set DESKTOP=%USERPROFILE%\Desktop
set TARGET=%~dp0BAŞLAT.bat
set SHORTCUT=%DESKTOP%\Kafe Otomasyon.lnk

echo Set oWS = WScript.CreateObject("WScript.Shell") > %SCRIPT%
echo sLinkFile = "%SHORTCUT%" >> %SCRIPT%
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
echo oLink.TargetPath = "%TARGET%" >> %SCRIPT%
echo oLink.WorkingDirectory = "%~dp0" >> %SCRIPT%
echo oLink.Description = "Kafe Otomasyon Sistemi" >> %SCRIPT%
echo oLink.Save >> %SCRIPT%

cscript /nologo %SCRIPT%
del %SCRIPT%

echo.
echo ================================================
echo   KISAYOL BAŞARIYLA OLUŞTURULDU!
echo   Masaüstünüzü kontrol edin.
echo ================================================
echo.
pause

