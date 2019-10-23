git clone https://github.com/electron/electron-quick-start
del /f electron-quick-start\index.html
move electron-quick-start\* .
call npm install
call npm install -g electron-packager
electron-packager . Stix2Viz --overwrite --asar=true --platform=win32 --arch=ia32 --icon=logo.ico --prune=true --out=release-builds --version-string.CompanyName=UomInfoSec --version-string.FileDescription=1.0 --version-string.ProductName="Stix2Visualization"
