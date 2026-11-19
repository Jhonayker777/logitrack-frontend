@echo off
cd /d "%~dp0"
echo Iniciando LogiTrack para la red Wi-Fi en http://192.168.38.36:5500/
echo Mantén esta ventana abierta mientras se use la versión local.
python -m http.server 5500 --bind 0.0.0.0
pause
