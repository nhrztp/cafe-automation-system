@echo off
title Kafe Otomasyon Sistemi
echo ================================================
echo     KAFE OTOMASYON SISTEMI BASLATILIYOR...
echo ================================================
echo.
echo Program baslatiliyor, lutfen bekleyin...
echo.
echo Tarayicinizda otomatik olarak acilacak:
echo http://localhost:5112
echo.
echo Program durdurmak icin bu pencereyi kapatin.
echo ================================================
echo.

start http://localhost:5112

KafeOtomasyon.exe --urls "http://localhost:5112"

pause

